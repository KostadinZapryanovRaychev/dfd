import React, { useEffect, useState } from "react";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { getAllCompetitions } from "../../../services/competitionServices";
import { Link } from "react-router-dom";
import { competitionStatus } from "../../../config/constants";

function Results() {
  const { userId, isAdmin } = useAuth();
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    // TODO to add check if it is no longer available
    getAllCompetitions()
      .then((data) => {
        const publishedCompetitions = data.competitions.filter(
          (competition) => competition.status === competitionStatus.published
        );
        setCompetitions(publishedCompetitions);
      })
      .catch((error) => {
        console.error("Error fetching competitions:", error);
      });
  }, []);

  console.log(competitions, "competitions");
  if (!userId) {
    return <NonAuthenticated />;
  }
  return (
    <div>
      <div>Results</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => (
            <tr key={competition.id}>
              <td>{competition.id}</td>
              <td>
                <Link to={`/applications/competitions/${competition.id}`}>{competition.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Results;
