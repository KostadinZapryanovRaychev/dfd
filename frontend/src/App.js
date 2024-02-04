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
import EditUser from "./components/components/EditUser/EditUser";
import EditCompetition from "./components/components/EditCompetition/EditCompetition";
import ErrorPage from "./components/components/ErrorPage/ErrorPage";
import HomePage from "./components/components/HomePage/HomePage";
import AdminPanel from "./components/components/Admin/AdminPanel";
import Register from "./pages/Register/Register";
import Competitions from "./pages/Competitions/Competitions";
import Concourses from "./pages/Concourses/Concourses";
import { useApp } from "./context/DataContext/DataContext";
import Loading from "./components/components/Loading/Loading";
import CompetitionDetails from "./components/components/CompetitionDetails/CompetitionDetails";
import UserProfile from "./components/components/UserProfile/UserProfile";
import Results from "./components/components/Results/Results";

function App() {
  const { isLoading } = useApp();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/protected" element={<ProtectedComponent />} />
        <Route path="/checkout" element={<StripePricingTable />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/create-competition" element={<CompetitionForm />} />
        <Route path="/roles" element={<RoleTable />} />
        <Route path="/create-role" element={<RoleForm />} />
        <Route path="/roles/:roleId" element={<EditRole />} />
        <Route path="/users/:userId" element={<EditUser />} />
        <Route path="/competitions/:competitionId" element={<EditCompetition />} />
        <Route path="applications/competitions/:competitionId" element={<CompetitionDetails />} />
        <Route path="/concourses" element={<Concourses />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/results" element={<Results />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
