import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  auth,
  getData,
  sendData,
  uploadBlogImage,
} from "../config/firebasemethods";
import { onAuthStateChanged } from "firebase/auth";
import { userData } from "./Register";
import { userLogin } from "./Login";

const Dashboard = () => {
  const blogImage = useRef();
  
  const [profileData, setProfileData] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid);
        const blogsData = await getData("blogs", user.uid);
        console.log(blogsData);
        setBlogs([...blogsData]);

        const fetchProfileData = async () => {
          try {
            const response = await (userLogin || userData);
            setProfileData(response);
          } catch (error) {
            console.log(error);
          }
        };

        fetchProfileData();
      }
    });
  }, []);

  const sendDatatoFirestore = async (data) => {
    setLoading(true); // Set loading to true when starting upload

    // Upload the image and get its URL
    const blogImageUrl = await uploadBlogImage(blogImage.current.files[0]);

    console.log(data);
    
    try {
      // Send the blog data along with the image URL to Firestore
      const response = await sendData(
        {
          title: data.title,
          description: data.description,
          uid: auth.currentUser.uid,
          name: profileData.fullName,
          blogImage: blogImageUrl, // Image URL is being sent here
        },
        "blogs" // Assuming 'blogs' is the Firestore collection name
      );

      // Append the new blog to the local state
      blogs.push({
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid,
        name: profileData.fullName,
        blogImage: blogImageUrl, // Include the image URL in the local state as well
      });
      setBlogs([...blogs]); // Update state

      // Clear form inputs after successful submission
      reset(); // Reset form fields
      blogImage.current.value = null; // Clear the image input

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state once done
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Dashboard</h1>

        {/* Blog Form */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form
              onSubmit={handleSubmit(sendDatatoFirestore)}
              className="card p-4 shadow-sm mb-5"
            >
              <div>
                <input type="file" className="form-control" ref={blogImage} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter blog title"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  cols="30"
                  rows="5"
                  className="form-control"
                  placeholder="Enter description"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Uploading..." : "Add Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* User Blogs Section */}
        <h1 className="text-center mb-4">User Blogs</h1>
        <div className="row">
          {blogs.length > 0 ? (
            blogs.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img src={item.blogImage} alt="" className="card-img-top img-fluid" />
                  <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-text">{item.description}</p>
                    <h6 className="card-subtitle text-muted">
                      Upload : {profileData ? profileData.fullName : "Anonymous"}
                    </h6>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100">
              <h2>No blogs found</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
