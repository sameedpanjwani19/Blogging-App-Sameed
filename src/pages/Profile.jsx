import React, { useEffect, useState } from 'react'; 
import { userLogin } from './Login';
import { userData } from './Register';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
   
    const fetchProfileData = async () => {
    
      try {
        const response = await (userLogin || userData);
        setProfileData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded text-center">
            <div className="card-body">
              {profileData ? (
                <>
                  <img
                    className="w-25 h-25 rounded-circle mb-4 w-50"
                    src={profileData.profileImage}
                    alt="Profile"
                  />
                  <h2 className="card-title">Name: {profileData.fullName}</h2>
                  <p className="card-text">Email: {profileData.email}</p>
                </>
              ) : (
                <div>No profile data found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
