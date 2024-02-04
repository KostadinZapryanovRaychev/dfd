import React, { useEffect } from "react";
import RegisterForm from "../../components/components/Register/RegisterForm";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [userId]);
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default Register;
