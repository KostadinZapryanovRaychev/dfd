import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicationForAcompetition } from "../../../services/competitionServices";

function CompetitionDetails() {
  const [applicationsForCompetition, setApplicationForCompetition] = useState([]);
  const { competitionId } = useParams();
  useEffect(() => {
    if (competitionId) {
      getApplicationForAcompetition(competitionId, setApplicationForCompetition);
    }
  }, [competitionId]);

  console.log(applicationsForCompetition, " applications");

  return <div>CompetitionDetails</div>;
}

export default CompetitionDetails;
