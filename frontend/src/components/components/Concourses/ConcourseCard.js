// ConcourseCard.js

import React from "react";
import "./ConcourseCard.css";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { applyToCompetition } from "../../../services/competitionServices";

function ConcourseCard(props) {
  const {
    id,
    name,
    logo,
    description,
    startsAt,
    endsAt,
    awardRating,
    requirements,
    status,
  } = props;

  const { userId } = useAuth();

  async function apply(currentUserId, currentCompetitionId) {
    const userId = currentUserId;
    const competitionId = currentCompetitionId;
    const grade = 6;

    try {
      const applicationData = {
        userId,
        competitionId,
        grade,
      };
      const response = await applyToCompetition(applicationData);
      console.log("Application response:", response);
    } catch (error) {
      console.error("Error applying to competition:", error);
    }
  }

  console.log(id, "competion id");
  console.log(userId, "user Id");

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
        <button onClick={() => apply(userId, id)}>Apply</button>
      </div>
    </div>
  );
}

export default ConcourseCard;
