import React, { useEffect, useState } from 'react'
import { getAllData } from '../config/firebasemethods'

const Home = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await getAllData("blogs")  
        console.log(allBlogs)
        setBlogs(allBlogs)  
      } catch (error) {
        console.error("Error fetching blogs:", error)
      }
    }

    
    fetchBlogs()
  }, [])

 

  return (
    <div>
      <h1>Home</h1>
      <h1 className='text-center'>All Blogs</h1>
      <div>
        {blogs.length > 0 ? blogs.map((item, index) => {
          return <div key={index} className="card m-5 p-3">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <h6>Upload By:{item.name}</h6>
          </div>
        }) : <h1>Loading</h1>}
      </div>
    </div>
  )
}

export default Home
