import React, { useState } from "react";
import { createRole } from "../../../services/roleServices";
import { useNavigate } from "react-router-dom";

const RoleForm = () => {
  const navigate = useNavigate();
  const [roleData, setRoleData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRole = await createRole(roleData);
      setRoleData({
        name: "",
      });
      navigate("/roles");
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={roleData.name} onChange={handleChange} required />
        </div>
        <button type="submit">Create Role</button>
      </form>
    </div>
  );
};

export default RoleForm;
