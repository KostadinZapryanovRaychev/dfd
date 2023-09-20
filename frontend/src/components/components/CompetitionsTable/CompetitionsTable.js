import React, { useState, useEffect } from "react";
import { getAllCompetitions, deleteCompetition } from "../../../services/competitionServices";
import { Link } from "react-router-dom"; // If using React Router for navigation

const CompetitionsTable = () => {
  const [competitions, setCompetitions] = useState([]);

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
      setCompetitions((prevCompetitions) => prevCompetitions.filter((competition) => competition.id !== competitionId));
    } catch (error) {
      console.error("Error deleting competition:", error);
    }
  };

  return (
    <div>
      <Link to={"/create-competition"}>Create new competition</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => (
            <tr key={competition.id}>
              <td>{competition.id}</td>
              <td>{competition.name}</td>
              <td>{competition.description}</td>
              <td>{competition.startsAt}</td>
              <td>{competition.endsAt}</td>
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
