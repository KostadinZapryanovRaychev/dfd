import React, { useEffect } from "react";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { path } from "../../../routes/routes";

function AdminPanel() {
  const naviagete = useNavigate();
  function navigateToHomePage() {
    naviagete(path.home);
  }
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      navigateToHomePage();
    }
  }, []);
  return (
    <div>
      <table>
        <caption>Responsive Table Example</caption>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-th="Name">Alice</td>

            <td data-th="Email">alice@example.com</td>
            <td data-th="Phone">123-456-7890</td>
            <td data-th="Website">alice.com [^1^]</td>
          </tr>
          <tr>
            <td data-th="Name">Bob</td>
            <td data-th="Email">bob@example.com</td>
            <td data-th="Phone">234-567-8901</td>
            <td data-th="Website">bob.com [^2^]</td>
          </tr>
          <tr>
            <td data-th="Name">Charlie</td>
            <td data-th="Email">charlie@example.com</td>
            <td data-th="Phone">345-678-9012</td>
            <td data-th="Website">charlie.com [^3^]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
