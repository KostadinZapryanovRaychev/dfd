// ConcourseCard.js

import React from "react";
import "./ConcourseCard.css";

function ConcourseCard(props) {
  const { name, logo, description, startDate, endDate, awardRating, requirements } = props;

  return (
    <div className="concourse-card">
      <img src={logo} alt={`${name} Logo`} className="concourse-logo" />
      <div className="concourse-details">
        <h2 className="concourse-name">{name}</h2>
        <p className="concourse-description">{description}</p>
        <p className="concourse-dates">
          {startDate} - {endDate}
        </p>
        <p className="concourse-rating">Award Rating: {awardRating}</p>
        <p className="concourse-requirements">Requirements: {requirements}</p>
      </div>
    </div>
  );
}

export default ConcourseCard;
