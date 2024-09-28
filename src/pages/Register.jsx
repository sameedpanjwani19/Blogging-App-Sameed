import React, { useRef } from 'react';
import { signUpUser, uploadImage } from '../config/firebasemethods';
import { useNavigate } from 'react-router-dom';
let userData;

const Register = () => {
  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const profileImage = useRef();

  const navigate = useNavigate();

  const loginUserFromFirebase = async (event) => {
    event.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);
    console.log(fullName.current.value);
    console.log(profileImage.current.files[0]);

    const userProfileImageUrl = await uploadImage(profileImage.current.files[0], email.current.value);
    try {
      userData = await signUpUser({
        email: email.current.value,
        password: password.current.value,
        fullName: fullName.current.value,
        profileImage: userProfileImageUrl,
      });
      navigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              <form onSubmit={loginUserFromFirebase}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    ref={fullName}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    ref={email}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    ref={password}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="profileImage" className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    ref={profileImage}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
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

export default Register;
export {userData} ;
