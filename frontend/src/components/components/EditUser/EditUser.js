import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../../services/userServices";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";
import NonAuthorized from "../NonAuthorized/NonAuthorized";
import { path } from "../../../routes/routes";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userId: currentUserId, isAdmin } = useAuth();
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roleId: null,
    photoUrl: null,
    profession: "",
    age: null,
    address: "",
    company: "",
    phone: "",
    isAdmin: false,
    photo: null,
    approvedAt: null,
  });

  useEffect(() => {
    getUser(userId)
      .then((data) => {
        setUserData(data?.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
    console.log(currentUserId === userId);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        console.error("Invalid file type. Please select a JPEG, PNG, or JPG file.");
        event.target.value = null;
      }
    }
  };

  const updatedUserData = { ...userData };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: updatedUserData.firstName,
      lastName: updatedUserData.lastName,
      email: updatedUserData.email,
      address: updatedUserData.address,
      isAdmin: updatedUserData.isAdmin,
      company: updatedUserData.company,
      age: updatedUserData.age,
      isBlocked: updatedUserData.isBlocked,
      profession: updatedUserData.profession,
      photo: file,
    };
    try {
      const confirm = window.confirm(`Потвърдете ъпдейта на потребител с име  ${userData?.firstName}`);
      if (confirm) {
        await updateUser(userId, data);
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  console.log(currentUserId, "current user id", typeof currentUserId);
  console.log(userId, "target user id", typeof userId);

  if (!userData && !userId) {
    return <NonAuthenticated />;
  }

  if (currentUserId !== userId) {
    return <NonAuthorized />;
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
        {isAdmin && (
          <div>
            <label htmlFor="roleId">Role ID</label>
            <input type="number" id="roleId" name="roleId" value={userData.roleId || ""} onChange={handleChange} />
          </div>
        )}
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
          <label htmlFor="photo">Photo</label>
          <input type="file" id="photo" name="photo" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" value={userData.phone || ""} onChange={handleChange} />
        </div>
        {isAdmin && (
          <div>
            <label htmlFor="isAdmin">Is Admin</label>
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={userData?.isAdmin}
              onChange={(e) => setUserData({ ...userData, isAdmin: e.target.checked })}
            />
          </div>
        )}
        {isAdmin && (
          <div>
            <label htmlFor="isBlocked">Status</label>
            <input
              type="checkbox"
              id="isBlocked"
              name="isBlocked"
              checked={userData?.isBlocked}
              onChange={(e) => setUserData({ ...userData, isBlocked: e.target.checked })}
            />
          </div>
        )}
        {isAdmin && (
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
        )}
        <button type="submit">Update User</button>
      </form>
      <Link to={isAdmin ? "/admin" : "/"}>{isAdmin ? "Back to Users" : "Back"}</Link>
    </div>
  );
};

export default EditUser;
