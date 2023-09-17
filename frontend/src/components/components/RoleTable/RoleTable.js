import React, { useState, useEffect } from "react";
import { deleteRole, getAllRoles } from "../../../services/roleServices";
import { Link } from "react-router-dom";

const RoleTable = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getAllRoles()
      .then((data) => {
        setRoles(data.roles);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  const handleDelete = async (roleId) => {
    try {
      await deleteRole(roleId);
      // Remove the deleted competition from the local state
      setRoles((prevRoles) => prevRoles.filter((roles) => roles.id !== roleId));
    } catch (error) {
      console.error("Error deleting competition:", error);
    }
  };

  return (
    <div>
      <Link to={"/create-role"}>Create new role</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <Link to={`/roles/${role.id}`}>Edit</Link>
                <button onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
