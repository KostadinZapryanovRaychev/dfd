import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext/AuthContext";

function HomePage() {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/protected">Protected</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/checkout">Stripe</Link>
          </li>
          <li>
            <Link to="/competitions">Competitions</Link>
          </li>
          <li>
            <Link to="/roles">Roles</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
