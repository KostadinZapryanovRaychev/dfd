import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../UserTable/UserTable";
import { useNavigate } from "react-router-dom";

const ProtectedComponent = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/protected", {
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
          <UserTable />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to access protected data.</p>
      )}
    </div>
  );
};

export default ProtectedComponent;
