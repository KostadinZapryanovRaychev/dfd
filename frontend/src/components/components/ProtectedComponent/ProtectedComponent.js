import React, { useState, useEffect } from "react";
import axios from "axios";

const ProtectedComponent = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("localhost:5000/api/protected", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error("Error fetching protected data:", error));
    }
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Protected Data</h2>
          <p>User: {userData.user.email}</p>
        </div>
      ) : (
        <p>Please log in to access protected data.</p>
      )}
    </div>
  );
};

export default ProtectedComponent;
