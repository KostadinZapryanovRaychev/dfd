import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext/AuthContext";

function HomePage() {
  const { userId, isAdmin } = useAuth();
  console.log(isAdmin);

  return (
    <>
      {userId ? (
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
              {isAdmin ? (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default HomePage;
