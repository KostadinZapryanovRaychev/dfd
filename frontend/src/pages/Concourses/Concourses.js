import React, { useEffect, useState } from "react";
import ConcourseCard from "../../components/components/Concourses/ConcourseCard";
import "./Concourses.css";
import { getAllCompetitions } from "../../services/competitionServices";
import { useAuth } from "../../context/AuthContext/AuthContext";

function Concourses() {
  const [competitions, setCompetitions] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    getAllCompetitions()
      .then((data) => {
        setCompetitions(data.competitions);
      })
      .catch((error) => {
        console.error("Error fetching competitions:", error);
      });
  }, []);

  console.log(competitions);

  return (
    <>
      {competitions.length ? (
        <div className="grid-container">
          {competitions.map((competition, index) => (
            <ConcourseCard key={competition.id} {...competition} />
          ))}
        </div>
      ) : (
        <div className="no-data">Currently No competitions available</div>
      )}
    </>
  );
}

export default Concourses;
