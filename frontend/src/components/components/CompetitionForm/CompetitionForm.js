import React, { useState } from "react";
import { createCompetition } from "../../../services/competitionServices";
import { useNavigate } from "react-router-dom";
import { competitionStatus } from "../../../config/constants";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import NonAuthorized from "../NonAuthorized/NonAuthorized";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";

const CompetitionForm = () => {
  const navigate = useNavigate();
  const { userId, isAdmin } = useAuth();
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCompetitionData((prevData) => ({ ...prevData, logo: file }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetitionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCompetition = await createCompetition(competitionData);

      setCompetitionData({
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

      navigate("/competitions");
    } catch (error) {
      console.error("Error creating competition:", error);
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
      <h2>Create a New Competition</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={competitionData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="logo">Logo</label>
          <input type="file" id="logo" name="logo" onChange={handleFileChange} accept="image/*" />
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
          <select id="status" name="status" value={competitionData.status} onChange={handleChange} required>
            <option value="" disabled>
              Select competition status
            </option>
            <option value={competitionStatus.active}>Active</option>
            <option value={competitionStatus.pending}>Pending</option>
            <option value={competitionStatus.closed}>Closed</option>
            <option value={competitionStatus.published}>Published</option>
          </select>
        </div>
        <button type="submit">Create Competition</button>
      </form>
    </div>
  );
};

export default CompetitionForm;
