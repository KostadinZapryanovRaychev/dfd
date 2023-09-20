import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCompetition, updateCompetition } from "../../../services/competitionServices";

const EditCompetition = () => {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const [competitionData, setCompetitionData] = useState({
    name: "",
    logo: null,
    description: "",
    startsAt: "",
    endsAt: "",
    award: "",
    rating: 0,
    requirements: "",
    status: "",
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
    const { name, value, type, files } = e.target;

    // For file input (logo), set the value as a File object
    const updatedValue = type === "file" ? files[0] : value;

    setCompetitionData({ ...competitionData, [name]: updatedValue });
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
          <label htmlFor="logo">Logo</label>
          <input type="file" id="logo" name="logo" onChange={handleChange} accept="image/*" />
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
        <div>
          <label htmlFor="award">Award</label>
          <input type="text" id="award" name="award" value={competitionData.award} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input type="number" id="rating" name="rating" value={competitionData.rating} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            value={competitionData.requirements}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input type="text" id="status" name="status" value={competitionData.status} onChange={handleChange} />
        </div>
        <button type="submit">Update Competition</button>
      </form>
      <Link to="/competitions">Back to Competitions</Link>
    </div>
  );
};

export default EditCompetition;
