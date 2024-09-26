import React, { useEffect, useState } from 'react'; 
import { userLogin } from './Login';


const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {

    console.log(userLogin);


    const fetchProfileData = async () => {
      try {
        const response = await userLogin;
        setProfileData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchProfileData();

   
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-card">
      {profileData ? (
        <>
          <img className="w-25 h25 " src={profileData.profileImage} alt="Profile Image" />
          <h2>Name: {profileData.fullName}</h2>
          <p>Email: {profileData.email}</p>
        </>
      ) : (
        <div>No profile data found</div>
      )}
    </div>
  );
};

export default Profile;
