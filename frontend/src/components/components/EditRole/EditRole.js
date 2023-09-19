import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRole, updateRole } from "../../../services/roleServices";
import { useNavigate } from "react-router-dom";

const EditRole = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [roleData, setRoleData] = useState({
    name: "",
  });

  useEffect(() => {
    // Fetch the role data based on the roleId from the URL parameter
    getRole(roleId)
      .then((data) => {
        setRoleData(data.role);
      })
      .catch((error) => {
        console.error("Error fetching role:", error);
      });
  }, [roleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRole(roleId, roleData);
      // Redirect to the roles list after successfully updating the role
      navigate("/roles");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div>
      <h2>Edit Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={roleData.name} onChange={handleChange} required />
        </div>
        <button type="submit">Update Role</button>
      </form>
      <Link to="/roles">Back to Roles</Link>
    </div>
  );
};

export default EditRole;
