import React, { useEffect, useState } from "react";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { getCompetitionPerUser } from "../../../services/competitionServices";
import { Link } from "react-router-dom";

function MyResults() {
  const { userId, isAdmin } = useAuth();
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    if (userId) {
      getCompetitionPerUser(userId)
        .then((data) => {
          console.log(data);
          setCompetitions(data.formattedApplications);
        })
        .catch((error) => {
          console.error("Error fetching competitions:", error);
        });
    }
  }, [userId]);

  if (!userId) {
    return <NonAuthenticated />;
  }

  return (
    userId && (
      <div>
        <div>Results</div>
        {competitions.length ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.competitionName}</td>
                  <td>{application.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>You dont have applications</div>
        )}
        <Link to="/">Back</Link>
      </div>
    )
  );
}

export default MyResults;
