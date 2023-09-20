import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCompetition, updateCompetition } from "../../../services/competitionServices";

const EditCompetition = () => {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const [competitionData, setCompetitionData] = useState({
    name: "",
    description: "",
    startsAt: "",
    endsAt: "",
  });

  useEffect(() => {
    // Fetch the competition data based on the competitionId from the URL parameter
    getCompetition(competitionId)
      .then((data) => {
        setCompetitionData(data.competition);
      })
      .catch((error) => {
        console.error("Error fetching competition:", error);
      });
  }, [competitionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetitionData({ ...competitionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompetition(competitionId, competitionData);
      // Redirect to the competitions list after successfully updating the competition
      navigate("/competitions");
    } catch (error) {
      console.error("Error updating competition:", error);
    }
  };

  return (
    <div>
      <h2>Edit Competition</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={competitionData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={competitionData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="startsAt">Start Date</label>
          <input
            type="date"
            id="startsAt"
            name="startsAt"
            value={competitionData.startsAt}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endsAt">End Date</label>
          <input
            type="date"
            id="endsAt"
            name="endsAt"
            value={competitionData.endsAt}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Competition</button>
      </form>
      <Link to="/competitions">Back to Competitions</Link>
    </div>
  );
};

export default EditCompetition;
