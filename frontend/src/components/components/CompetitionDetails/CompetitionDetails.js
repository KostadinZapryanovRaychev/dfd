import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  downloadSolutionFile,
  getApplicationForAcompetition,
  updateApplicationGrade,
} from "../../../services/competitionServices";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import NonAuthorized from "../NonAuthorized/NonAuthorized";
import FileDownload from "js-file-download";
import axios from "axios";

function CompetitionDetails() {
  const [applicationsForCompetition, setApplicationForCompetition] = useState([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { competitionId } = useParams();
  const { userId, isAdmin } = useAuth();

  const targetUserId = applicationsForCompetition[0]?.user?.id.toString();

  useEffect(() => {
    if (competitionId) {
      try {
        getApplicationForAcompetition(competitionId, setApplicationForCompetition);
      } catch (err) {
        console.log("Errro", err);
      }
    }
  }, [competitionId]);

  const nameOfCompetition = applicationsForCompetition[0]?.competition?.name;

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
  if (!userId) {
    return <NonAuthenticated />;
  }

  if (!isAdmin && applicationsForCompetition.length > 1) {
    return <NonAuthorized />;
  }

  if (!isAdmin && targetUserId !== userId) {
    return <NonAuthorized />;
  }

  function getAuthToken() {
    return sessionStorage.getItem("authToken");
  }

  const handleDownload = async (fileName) => {
    try {
      const confirmDownload = window.confirm(`Confirm download of file: ${fileName}`);
      if (confirmDownload) {
        const blob = await downloadSolutionFile(fileName);

        console.log(blob, "blob in FE");
        if (!blob) {
          console.log("Failed to download the file");
          return;
        }

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);

        const link = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log("Error occurred during file download:", error);
    }
  };

  async function handleDownload1(e) {
    e.preventDefault();

    try {
      const authToken = getAuthToken();
      const response = await axios({
        url: "http://localhost:5000/api/applications/download/solutions/solution-1711283575691.pdf",
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      FileDownload(response.data);
    } catch (error) {
      console.error("Error occurred during download:", error);
    }
  }

  return (
    <>
      {applicationsForCompetition.length ? (
        <div>
          <h1>{nameOfCompetition}</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Grade</th>
                <th>User ID</th>
                {isAdmin && <th>Solution URL</th>}
                {isAdmin && <th>Applied At</th>}
              </tr>
            </thead>
            <tbody>
              {applicationsForCompetition.map((application) => (
                <tr key={application?.id}>
                  <td>{application?.id}</td>
                  <td>{application?.grade}</td>
                  <td>{application?.user?.firstName + " " + application?.user?.lastName}</td>
                  {isAdmin && (
                    <td>
                      <button onClick={(e) => handleDownload1(e)}>Download Solution</button>
                    </td>
                  )}
                  {isAdmin && <td>{application?.appliedAt}</td>}
                  {isAdmin && (
                    <td>
                      <button onClick={() => handleOpenPopUp(application)}>Оцени</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/">Back</Link>
          {isPopUpOpen && isAdmin && (
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
      ) : (
        <div>
          <div>There is applications for this competition</div>
          <Link to="/">Back</Link>
        </div>
      )}
    </>
  );
}

export default CompetitionDetails;
