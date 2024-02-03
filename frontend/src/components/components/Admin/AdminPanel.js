import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../../services/userServices";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { path } from "../../../routes/routes";

function AdminPanel() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate(path.home);
    } else {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm(`Потвърди изтриването на потребител с Id ${userId}`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <table>
        <caption>User Management</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user?.id}>
              <td>{`${user?.firstName} ${user?.lastName}`}</td>
              <td>{user?.email}</td>
              <td>{user?.isBlocked ? "Blocked" : "Active"}</td>
              <td>{user?.isAdmin ? "Admin" : "User"}</td>
              <td>
                <Link to={`/users/${user.id}`}>Edit</Link>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/`}>Back To Home</Link>
    </div>
  );
}

export default AdminPanel;
