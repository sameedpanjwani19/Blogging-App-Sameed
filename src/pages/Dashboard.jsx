import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { auth, getData, sendData } from '../config/firebasemethods'
import { onAuthStateChanged } from 'firebase/auth'

import { userLogin } from './Login';

const Dashboard = () => {

  
  const [profileData, setProfileData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [blogs, setBlogs] = useState([])


  useEffect(() => {

      onAuthStateChanged(auth , async(user)=>{
        if(user){
          console.log(user.uid)
          const blogsData = await getData("blogs" , user.uid)
          console.log(blogsData)
          setBlogs([...blogsData])


          const fetchProfileData = async () => {
            try {
              const response = await userLogin;
              setProfileData(response);
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchProfileData();

        
        }
      })
  }, [])

  const sendDatatoFirestore = async (data) => {
    console.log(data)
    try {
      const response = await sendData({
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid,
        name: profileData.fullName
      }, 'blogs')
      blogs.push({
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid,
        name: profileData.fullName
      })
      setBlogs([...blogs])
      console.log(response);


    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <h1 className='text-center m-3'>Dashboard</h1>
      <form onSubmit={handleSubmit(sendDatatoFirestore)} className='m-5'>
        <input type="text" placeholder='title' {...register("title", { required: true })} /> <br />
        {errors.title && <span>This field is required</span>}
        <br />
        <textarea cols='25' rows='5' placeholder='enter description' {...register("description", { required: true })} ></textarea> <br /><br />
        {errors.description && <span>This field is required</span>}

        <button type='submit'>add Blog</button>
      </form>

      <h1 className='text-center'>User Blogs</h1>
      <div>
        {blogs.length > 0 ? blogs.map((item, index) => {
          return <div key={index} className="card m-5 p-3">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <h6>Name: {profileData.fullName}</h6>
          </div>
        }) : <h1>No blogs found</h1>}
      </div>
    </>
  )
}

export default Dashboard
