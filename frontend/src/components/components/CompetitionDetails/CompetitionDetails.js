import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  downloadSolutionFile,
  getApplicationForAcompetition,
  updateApplicationGrade,
} from "../../../services/competitionServices";

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
    try {
      if (selectedApplication) {
        const updatedApplication = await updateApplicationGrade(selectedApplication.id, newGrade);
        if (updatedApplication) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.log("Error occured during update of competition");
    }
    handleClosePopUp();
  };

  const handleDownload = async (fileName) => {
    console.log(fileName, "FE filename");
    try {
      const response = await downloadSolutionFile(fileName);
      // const blob = await response.blob();
      // const link = document.createElement("a");
      // const url = window.URL.createObjectURL(blob);
      // link.href = url;
      // link.download = fileName;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error occurred during file download:", error);
    }
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
              <td>
                <button onClick={() => handleDownload(application?.solutionUrl)}>Download Solution</button>
              </td>
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
