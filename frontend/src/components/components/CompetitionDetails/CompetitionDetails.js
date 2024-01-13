import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getApplicationForAcompetition } from "../../../services/competitionServices";
import { getCurrentUser } from "../../../helpers/getCurrentUser";

function CompetitionDetails() {
  const [applicationsForCompetition, setApplicationForCompetition] = useState([]);
  const { competitionId } = useParams();
  useEffect(() => {
    if (competitionId) {
      getApplicationForAcompetition(competitionId, setApplicationForCompetition);
    }
  }, [competitionId]);

  const nameOfCompetition = applicationsForCompetition[0]?.competition?.name;

  return (
    <div>
      <h1>{nameOfCompetition}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Grade</th>
            <th>User ID</th>
            <th>Solution URL</th>
            <th>Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applicationsForCompetition.map((application) => (
            <tr key={application?.id}>
              <td>{application?.id}</td>
              <td>{application?.grade}</td>
              <td>{application?.user?.firstName + " " + application?.user?.lastName}</td>
              <td>{application?.solutionUrl}</td>
              <td>{application?.appliedAt}</td>
              <td>
                {/* update user competition by id */}
                <Link to={`/competitions/${application?.id}`}>Оцени</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompetitionDetails;
