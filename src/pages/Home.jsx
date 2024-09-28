import React, { useEffect, useState } from 'react';
import { getAllData } from '../config/firebasemethods';
import { Spinner } from 'react-bootstrap';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await getAllData("blogs");
        console.log(allBlogs);
        setBlogs(allBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Blogs</h1>
      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <img src={item.blogImage} alt="" className="card-img-top img-fluid" />
                  <h3 className="p-0 card-title mt-3">{item.title}</h3>
                  <p className="card-text">{item.description}</p>
                  <h6 className="card-subtitle text-muted">Uploaded By: {item.name}</h6>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center w-100">
            <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
