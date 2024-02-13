import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../../../routes/routes";

function NonAuthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(path.home);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);
  return <div>Non Authorized</div>;
}

export default NonAuthorized;
