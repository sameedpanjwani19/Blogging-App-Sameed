import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpUser, uploadImage } from '../config/firebasemethods';
import { useNavigate } from 'react-router-dom';

let userData;

const Register = () => {
  const [loading, setLoading] = useState(false); // State to track loading
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // Validate form on change
  });

  const navigate = useNavigate();

  const loginUserFromFirebase = async (data) => {
    setLoading(true); // Start loading
    const { fullName, email, password, profileImage } = data;
    try {
      // Upload image to Firebase
      const userProfileImageUrl = await uploadImage(profileImage[0], email);

      // Sign up user in Firebase
      userData = await signUpUser({
        fullName,
        email,
        password,
        profileImage: userProfileImageUrl,
      });

      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              <form onSubmit={handleSubmit(loginUserFromFirebase)}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    {...register('fullName', { required: 'Full Name is required' })}
                  />
                  {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="profileImage" className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    {...register('profileImage', {
                      required: 'Profile image is required',
                    })}
                  />
                  {errors.profileImage && (
                    <p style={{ color: 'red' }}>{errors.profileImage.message}</p>
                  )}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid || loading} // Disable when form is invalid or loading
                  >
                    {loading ? 'Registering...' : 'Register'}
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
export { userData };
