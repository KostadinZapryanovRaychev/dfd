import logo from "./logo.svg";
import "./App.css";
import RegisterForm from "./components/components/Register/RegisterForm";
import ProtectedComponent from "./components/components/ProtectedComponent/ProtectedComponent";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/components/LoginForm/LoginForm";

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/protected" element={<ProtectedComponent />} />
      </Routes>
    </div>
  );
}

export default App;
