import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser } from '../config/firebasemethods'

const Navbar = () => {

  // useNavigate
  const navigate = useNavigate()

  const LogoutUser = async () => {
    const user = await signOutUser();
    console.log(user);
    navigate('login')
  }
  return (
    <>
    
      <div className=' color-primary d-flex align-items-center justify-content-center gap-5 m-5'>
        <h5><Link className='text-decoration-none' to=''>Home</Link></h5>
        <h5><Link className='text-decoration-none' to='dashboard'>Dashboard</Link></h5>
        <h5><Link className='text-decoration-none' to='profile'>Profile</Link></h5>
        <h5><Link className='text-decoration-none' to='login'>Login</Link></h5>
        <h5><Link className='text-decoration-none' to='register'>Register</Link></h5>
        <button className='btn btn-primary' onClick={LogoutUser}>Logout</button>
      </div>
    </>
  )
}

export default Navbar