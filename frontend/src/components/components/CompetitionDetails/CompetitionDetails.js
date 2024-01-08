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

  return (
    <div>
      <h1>Competition Details</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Grade</th>
            <th>User ID</th>
            <th>Competition ID</th>
            <th>Solution URL</th>
            <th>Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applicationsForCompetition.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.grade}</td>
              <td>{application.userId}</td>
              <td>{application.competitionId}</td>
              <td>{application.solutionUrl}</td>
              <td>{application.appliedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompetitionDetails;
