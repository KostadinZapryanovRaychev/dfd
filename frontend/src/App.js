import logo from "./logo.svg";
import "./App.css";
import RegisterForm from "./components/components/Register/RegisterForm";
import ProtectedComponent from "./components/components/ProtectedComponent/ProtectedComponent";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/components/LoginForm/LoginForm";
import StripePricingTable from "./components/components/Stripe/StripePricingTable";
import CompetitionsTable from "./components/components/CompetitionsTable/CompetitionsTable";
import CompetitionForm from "./components/components/CompetitionForm/CompetitionForm";
import RoleTable from "./components/components/RoleTable/RoleTable";
import RoleForm from "./components/components/RoleForm/RoleForm";
import EditRole from "./components/components/EditRole/EditRole";

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
          <li>
            <Link to="/competitions">Competitions</Link>
          </li>
          <li>
            <Link to="/roles">Roles</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/protected" element={<ProtectedComponent />} />
        <Route path="/checkout" element={<StripePricingTable />} />
        <Route path="/competitions" element={<CompetitionsTable />} />
        <Route path="/create-competition" element={<CompetitionForm />} />
        <Route path="/roles" element={<RoleTable />} />
        <Route path="/create-role" element={<RoleForm />} />
        <Route path="/roles/:roleId" element={<EditRole />} />
      </Routes>
    </div>
  );
}

export default App;
