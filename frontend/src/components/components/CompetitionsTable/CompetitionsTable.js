import React, { useState, useEffect } from "react";
import { getAllCompetitions, deleteCompetition } from "../../../services/competitionServices";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";
import NonAuthorized from "../NonAuthorized/NonAuthorized";

const CompetitionsTable = () => {
  const [competitions, setCompetitions] = useState([]);
  const { userId, isAdmin } = useAuth();

  useEffect(() => {
    getAllCompetitions()
      .then((data) => {
        setCompetitions(data.competitions);
      })
      .catch((error) => {
        console.error("Error fetching competitions:", error);
      });
  }, [isAdmin, userId]);

  const handleDelete = async (competitionId) => {
    try {
      const confirmed = window.confirm(`Потвърди изтриването на на състезание с Id ${competitionId}`);
      if (confirmed) {
        await deleteCompetition(competitionId);
        setCompetitions((prevCompetitions) =>
          prevCompetitions.filter((competition) => competition.id !== competitionId)
        );
      }
    } catch (error) {
      console.error("Error deleting competition:", error);
    }
  };

  if (!userId) {
    return <NonAuthenticated />;
  }

  if (!isAdmin) {
    return <NonAuthorized />;
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
              <td>
                <Link to={`/applications/competitions/${competition.id}`}>{competition.name}</Link>
              </td>
              <td>
                <img src={competition.logo} alt="Competition Logo" />
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
                <button onClick={() => handleDelete(competition.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionsTable;
