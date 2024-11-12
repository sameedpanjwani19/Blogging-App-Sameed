import React, { useEffect, useState } from 'react'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebasemethods';
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = () => {
  const [singleUserData, setSingleUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const q = query(collection(db, "users"), where("id", "==", user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();  // Get the first matching document's data
              setSingleUserData(userData);
            } else {
              setError("No user profile found");
            }
          } catch (error) {
            console.error(error);
            setError("Failed to fetch user profile");
          } finally {
            setLoading(false);
          }
        } else {
          console.log('User logged out');
          setLoading(false);
        }
      });
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded text-center">
            <div className="card-body">
              {singleUserData ? (
                <>
                  <img
                    className="w-75 h-75 rounded-circle mb-4"
                    src={singleUserData.profileImage}
                    alt="Profile"
                  />
                  <h2 className="card-title">Name: {singleUserData.fullName}</h2>
                  <p className="card-text">Email: {singleUserData.email}</p>
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
