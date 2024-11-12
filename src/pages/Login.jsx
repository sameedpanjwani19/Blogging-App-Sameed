import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../config/firebasemethods";
let userLogin;


const Login = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginUserFromFirebase = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    try {
      userLogin = await loginUser({
        email: data.email,
        password: data.password,
      });

      console.log(userLogin);
      navigate("/");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-5">
      <div className="align-item-center row justify-content-center">
        <div className="col-md-6  col-lg-4">
          <div className="card shadow-lg border-0 rounded">
            <div className="mt-30 card-body">
              <h3 className="card-title text-center mb-4">Login Your Account</h3>
              <form onSubmit={handleSubmit(loginUserFromFirebase)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">This field is required</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">This field is required</div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
export {userLogin};