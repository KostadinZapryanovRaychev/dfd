import React, { useEffect, useState } from "react";
import ConcourseCard from "../../components/components/Concourses/ConcourseCard";
import "./Concourses.css";
import { getAllCompetitions, getCompetitionPerUser } from "../../services/competitionServices";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useApp } from "../../context/DataContext/DataContext";
import { Link } from "react-router-dom";

let isDataFetched = false;

function Concourses() {
  const [competitions, setCompetitions] = useState([]);
  const { userId } = useAuth();
  const { setCompetitionOfUser } = useApp();

  useEffect(() => {
    if (userId) {
      getAllCompetitions()
        .then((data) => {
          setCompetitions(data.competitions);
        })
        .catch((error) => {
          console.error("Error fetching competitions:", error);
        });
    }
  }, [userId]);

  async function seeAll(fn, isPublished) {
    await getCompetitionPerUser(userId, isPublished)
      .then((data) => {
        if (data.formattedApplications.length) {
          fn(data.formattedApplications);
        } else {
          isDataFetched = true;
        }
      })
      .catch((error) => {
        console.error("Error fetching competitions:", error);
      });
  }

  useEffect(() => {
    if (userId) {
      seeAll(setCompetitionOfUser, false);
    }
  }, [userId]);

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
      <Link to="/">Back</Link>
    </>
  );
}

export default Concourses;
