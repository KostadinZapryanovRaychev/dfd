import React, { useState, useEffect } from "react";
import {
  getAllCompetitions,
  deleteCompetition,
} from "../../../services/competitionServices";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";

const CompetitionsTable = () => {
  const [competitions, setCompetitions] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    getAllCompetitions()
      .then((data) => {
        setCompetitions(data.competitions);
      })
      .catch((error) => {
        console.error("Error fetching competitions:", error);
      });
  }, []);

  const handleDelete = async (competitionId) => {
    try {
      await deleteCompetition(competitionId);
      // Remove the deleted competition from the local state
      setCompetitions((prevCompetitions) =>
        prevCompetitions.filter(
          (competition) => competition.id !== competitionId
        )
      );
    } catch (error) {
      console.error("Error deleting competition:", error);
    }
  };

  if (!userId) {
    return <NonAuthenticated />;
  }
  return (
    <div>
      <Link to={"/create-competition"}>Create new competition</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Logo</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Award</th>
            <th>Rating</th>
            <th>Requirements</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => (
            <tr key={competition.id}>
              <td>{competition.id}</td>
              <td>{competition.name}</td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${competition.logo}`}
                  alt="Competition Logo"
                />
              </td>
              <td>{competition.description}</td>
              <td>{new Date(competition.startsAt).toLocaleDateString()}</td>
              <td>{new Date(competition.endsAt).toLocaleDateString()}</td>
              <td>{competition.award}</td>
              <td>{competition.rating}</td>
              <td>{competition.requirements}</td>
              <td>{competition.status}</td>
              <td>
                <Link to={`/competitions/${competition.id}`}>Edit</Link>
                <button onClick={() => handleDelete(competition.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionsTable;
