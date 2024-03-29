import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { logout } from "../../../services/authServices";
import { refreshThePage } from "../../../helpers/refresh";

function HomePage() {
  const { userId, isAdmin, setAuthUser, setIsLoggedIn, setUserId, setIsAdmin } = useAuth();

  async function handleLogout() {
    try {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userId");
      setIsLoggedIn(false);
      setUserId(false);
      setIsAdmin(false);
      setAuthUser(null);
      await logout();
      refreshThePage();
    } catch (error) {
      console.error("Logout failed:", error);
      // TODO popup
    }
  }

  return (
    <>
      {userId ? (
        <div>
          <nav>
            <ul>
              {!userId && (
                <li>
                  <Link to="/register">Register</Link>
                </li>
              )}
              <li>
                <Link to="/protected">Protected</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              {isAdmin ? (
                <li>
                  <Link to="/competitions">Competitions</Link>
                </li>
              ) : null}
              {isAdmin ? (
                <li>
                  <Link to="/roles">Roles</Link>
                </li>
              ) : null}
              <li>
                <Link to="/results">Results</Link>
              </li>
              <li>
                <Link to="/my-results">My Results</Link>
              </li>
              <li>
                <Link to="/concourses">Concourses</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/profile">Стани наш бизнс клиент</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
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
