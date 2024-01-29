import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { getUser } from "../../../services/userServices";

function UserProfile() {
  const { userId } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(userId);
        const currentUser = userData?.user;
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }

    // Cleanup function (optional)
    return () => {};
  }, [userId]);

  if (!user) {
    return <div>Something went wrong with this user</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;