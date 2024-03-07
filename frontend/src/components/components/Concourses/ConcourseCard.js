import React, { useState } from "react";
import "./ConcourseCard.css";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import {
  applyToCompetition,
  deleteCompetitionPerUser,
  uploadSolutionForApplication,
} from "../../../services/competitionServices";
import { useApp } from "../../../context/DataContext/DataContext";

function ConcourseCard(props) {
  const { id, name, logo, description, startsAt, endsAt, awardRating, requirements, status } = props;

  const { userId } = useAuth();
  const { competitionsOfUser } = useApp();
  const [file, setFile] = useState(null);

  const isApplied = competitionsOfUser.some((entry) => entry.competitionId === id);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const grade = null;
    let applicationData = {
      userId: userId,
      competitionId: id,
      grade: grade,
      solutionUrl: null,
    };

    try {
      const solution = file || null;
      const res = await uploadSolutionForApplication(solution);
      if (res.solutionUrl) {
        applicationData.solutionUrl = res.solutionUrl;
      }
      await applyToCompetition(applicationData);
    } catch (error) {
      console.error("Error applying to competition:", error);
    }
  };

  // TODO to fixed logic if an user is already applied
  async function cancel(currentUserId, currentCompetitionId, isApplied) {
    console.log(isApplied);
    if (!isApplied) {
      console.log("You cant cancel a competition for which you dont applied");
      return null;
    }
    try {
      const response = await deleteCompetitionPerUser(currentUserId, currentCompetitionId);
      if (response.message === "User has not applied to this competition") {
        console.log("User does not applied for this competition");
        return null;
      }
    } catch (error) {
      console.error("Error deleting this competition:", error);
    }
  }

  return (
    <div className="concourse-card">
      <img src={logo} alt={`${name} Logo`} className="concourse-logo" />
      <div className="concourse-details">
        <h2 className="concourse-name">{name}</h2>
        <p className="concourse-description">{description}</p>
        <p className="concourse-dates">
          {startsAt} - {endsAt}
        </p>
        <p className="concourse-rating">Рейтинг: {awardRating}</p>
        <p className="concourse-requirements">Условия: {requirements}</p>

        <form onSubmit={handleSubmit}>
          <label>
            Upload Solution:
            <input disabled={isApplied} type="file" onChange={handleFileChange} />
          </label>
          <button type="submit" disabled={isApplied}>
            {isApplied ? "Applied" : "Apply"}
          </button>
        </form>

        <button onClick={() => cancel(userId, id, isApplied)} disabled={!isApplied}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConcourseCard;
