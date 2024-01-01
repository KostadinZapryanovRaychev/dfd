// ConcourseCard.js

import React from "react";
import "./ConcourseCard.css";

function ConcourseCard(props) {
  const {
    name,
    logo,
    description,
    startsAt,
    endsAt,
    awardRating,
    requirements,
    status,
  } = props;

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
      </div>
    </div>
  );
}

export default ConcourseCard;
