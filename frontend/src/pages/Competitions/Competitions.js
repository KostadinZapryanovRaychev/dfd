import React, { useEffect } from "react";
import CompetitionsTable from "../../components/components/CompetitionsTable/CompetitionsTable";
import { path } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { navigateToHomePage } from "../../components/components/helpers/navigation";
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
    </div>
  );
}

export default Competitions;
