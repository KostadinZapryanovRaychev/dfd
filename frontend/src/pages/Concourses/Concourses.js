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
  const { competitionsOfUser, setCompetitionOfUser } = useApp();

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

  async function seeAll(fn) {
    await getCompetitionPerUser(userId)
      .then((data) => {
        if (data.applications.length) {
          fn(data.applications);
        } else {
          isDataFetched = true;
        }
      })
      .catch((error) => {
        console.error("Error fetching competitions:", error);
      });
  }

  // useEffect(() => {
  //   if (userId) {
  //     seeAll(setCompetitionOfUser);
  //   }
  // }, [userId]);

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
