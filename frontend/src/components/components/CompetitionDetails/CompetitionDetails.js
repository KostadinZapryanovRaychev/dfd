import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getApplicationForAcompetition } from "../../../services/competitionServices";
import { getCurrentUser } from "../../../helpers/getCurrentUser";

function CompetitionDetails() {
  const [applicationsForCompetition, setApplicationForCompetition] = useState([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { competitionId } = useParams();
  useEffect(() => {
    if (competitionId) {
      getApplicationForAcompetition(competitionId, setApplicationForCompetition);
    }
  }, [competitionId]);

  const nameOfCompetition = applicationsForCompetition[0]?.competition?.name;

  const getCompetitionById = async () => {};

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  const handleOpenPopUp = (application) => {
    setSelectedApplication(application);
    setIsPopUpOpen(true);
  };

  const handleUpdateGrade = async (newGrade) => {
    // if (selectedApplication) {
    //   // Perform the update and then close the pop-up
    //   await updateApplicationGrade(selectedApplication.id, newGrade);
    //   // Refresh the data after update
    //   getApplicationForAcompetition(competitionId, setApplicationForCompetition);
    //   handleClosePopUp();
    // }
  };

  return (
    <div>
      <h1>{nameOfCompetition}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Grade</th>
            <th>User ID</th>
            <th>Solution URL</th>
            <th>Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applicationsForCompetition.map((application) => (
            <tr key={application?.id}>
              <td>{application?.id}</td>
              <td>{application?.grade}</td>
              <td>{application?.user?.firstName + " " + application?.user?.lastName}</td>
              <td>{application?.solutionUrl}</td>
              <td>{application?.appliedAt}</td>
              <td>
                <button onClick={() => handleOpenPopUp(application)}>Оцени</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopUpOpen && (
        <div>
          <h2>{`Оцени application с ID: ${selectedApplication?.id}`}</h2>
          <div>
            <label>New Grade:</label>
            <input
              type="number"
              value={selectedApplication?.grade}
              onChange={(e) => setSelectedApplication({ ...selectedApplication, grade: e.target.value })}
            />
          </div>
          <button onClick={() => handleUpdateGrade(selectedApplication?.grade)}>Update Grade</button>
          <button onClick={handleClosePopUp}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CompetitionDetails;
