import logo from "./logo.svg";
import "./App.css";
import RegisterForm from "./components/components/Register/RegisterForm";
import ProtectedComponent from "./components/components/ProtectedComponent/ProtectedComponent";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/components/LoginForm/LoginForm";
import StripePricingTable from "./components/components/Stripe/StripePricingTable";

function App() {
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
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/protected" element={<ProtectedComponent />} />
        <Route path="/checkout" element={<StripePricingTable />} />
      </Routes>
    </div>
  );
}

export default App;
