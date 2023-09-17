import React, { useState } from "react";
import { createCompetition } from "../../../services/competitionServices";
import { useNavigate } from "react-router-dom";

const CompetitionForm = () => {
  const navigate = useNavigate();
  const [competitionData, setCompetitionData] = useState({
    name: "",
    description: "",
    startsAt: "",
    endsAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetitionData({ ...competitionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCompetition = await createCompetition(competitionData);
      
      setCompetitionData({
        name: "",
        description: "",
        startsAt: "",
        endsAt: "",
      });
      navigate("/competitions");
    } catch (error) {
      console.error("Error creating competition:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Competition</h2>
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
        <button type="submit">Create Competition</button>
      </form>
    </div>
  );
};

export default CompetitionForm;
