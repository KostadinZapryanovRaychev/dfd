import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
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
