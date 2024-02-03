import React, { useEffect } from "react";
import CompetitionsTable from "../../components/components/CompetitionsTable/CompetitionsTable";
import { path } from "../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { navigateToHomePage } from "../../helpers/navigation";
import { useAuth } from "../../context/AuthContext/AuthContext";

function Competitions() {
  const naviagete = useNavigate();

  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      navigateToHomePage(path.home, naviagete);
    }
  }, []);
  return (
    <div>
      <CompetitionsTable />
      <Link to="/">Back</Link>
    </div>
  );
}

export default Competitions;
