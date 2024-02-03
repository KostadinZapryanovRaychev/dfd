import React, { useState, useEffect } from "react";
import { deleteUser, getAllUsers } from "../../../services/userServices";
import { Link } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = async (userId) => {
    try {
      const confirm = window.confirm(`Потвърдете изтриване на потребител с id  ${userId}`);
      if (confirm) {
        await deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role ID</th>
          <th>Profession</th>
          <th>Age</th>
          <th>Address</th>
          <th>Company</th>
          <th>Phone</th>
          <th>Admin</th>
          <th>Approved At</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.roleId}</td>
            <td>{user.profession}</td>
            <td>{user.age}</td>
            <td>{user.address}</td>
            <td>{user.company}</td>
            <td>{user.phone}</td>
            <td>{user.isAdmin ? "Yes" : "No"}</td>
            <td>{user.approvedAt}</td>
            <td>
              <Link to={`/users/${user.id}`}>Edit</Link>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
