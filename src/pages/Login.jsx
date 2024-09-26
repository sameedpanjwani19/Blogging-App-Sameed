import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../config/firebasemethods";
let userLogin;


const Login = () => {
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const loginUserFromFirebase = async (data, event) => {
    event.preventDefault()
    console.log(data)
    try {
      userLogin = await loginUser({
        email: data.email,
        password: data.password
      })

      console.log(userLogin)
      navigate('/')

    } catch (error) {
      console.error(error)
    }
  }

 


  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-center gap-5 m-5">
        <h1>Login Your Account</h1>
        <form onSubmit={handleSubmit(loginUserFromFirebase)}>
        <input type="email" placeholder='enter your email' {...register("email", { required: true })} /><br />
        {errors.email && <span className='text-danger'>This field is required</span>}
         <br />
        <input type="password" placeholder='enter your password' {...register("password", { required: true })} /><br />
        {errors.password && <span className='text-danger'>This field is required</span>}
         <br />
        <button type='submit'>login</button>
      </form>
      </div>

    </div>
  );
};

export default Login;

export { userLogin}
