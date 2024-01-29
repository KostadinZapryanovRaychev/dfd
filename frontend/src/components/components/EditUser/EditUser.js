import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../../services/userServices";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roleId: null,
    profession: "",
    cv: null,
    age: null,
    address: "",
    company: "",
    phone: "",
    isAdmin: false,
    approvedAt: null,
  });

  useEffect(() => {
    // Fetch the user data based on the userId from the URL parameter
    getUser(userId)
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  console.log(userData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, userData);
      // Redirect to the users list after successfully updating the user
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user && !userId) {
    return <NonAuthenticated />;
  }
  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="roleId">Role ID</label>
          <input type="number" id="roleId" name="roleId" value={userData.roleId || ""} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={userData.profession || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cvUrl">CV</label>
          <input type="file" id="cvUrl" name="cvUrl" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" value={userData.age || ""} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={userData.address || ""} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" value={userData.company || ""} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" value={userData.phone || ""} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="isAdmin">Is Admin</label>
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={userData.isAdmin}
            onChange={(e) => setUserData({ ...userData, isAdmin: e.target.checked })}
          />
        </div>
        <div>
          <label htmlFor="approvedAt">Approved At</label>
          <input
            type="date"
            id="approvedAt"
            name="approvedAt"
            value={userData.approvedAt || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update User</button>
      </form>
      <Link to="/protected">Back to Users</Link>
    </div>
  );
};

export default EditUser;
