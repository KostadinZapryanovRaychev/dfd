import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCompetition, updateCompetition, uploadImage } from "../../../services/competitionServices";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";
import { competitionStatus } from "../../../config/constants";
import NonAuthorized from "../NonAuthorized/NonAuthorized";

const EditCompetition = () => {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const { isAdmin, userId } = useAuth();
  const [file, setFile] = useState(null);
  const [competitionData, setCompetitionData] = useState({
    name: "",
    logo: null,
    description: "",
    startsAt: "",
    endsAt: "",
    award: "",
    rating: 0,
    requirements: "",
    status: "",
  });

  useEffect(() => {
    // Fetch the competition data based on the competitionId from the URL parameter
    getCompetition(competitionId)
      .then((data) => {
        setCompetitionData(data.competition);
      })
      .catch((error) => {
        console.error("Error fetching competition:", error);
      });
  }, [competitionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetitionData({ ...competitionData, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        console.error("Invalid file type. Please select a JPEG, PNG, or JPG file.");
        event.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: competitionData.name,
      description: competitionData.description,
      startsAt: competitionData.startsAt,
      endsAt: competitionData.endsAt,
      award: competitionData.award,
      rating: competitionData.rating,
      requirements: competitionData.requirements,
      status: competitionData.status,
      logo: null,
    };
    try {
      const confirm = window.confirm(`Потвърдете ъпдейта на състезание с id ${competitionId}`);
      if (confirm) {
        // post request
        // data.logo = response.url
        // data
        const updatedCompetitionUrl = await uploadImage(file);
        console.log(updatedCompetitionUrl?.logo);
        if (updatedCompetitionUrl?.logo) {
          data.logo = updatedCompetitionUrl?.logo;
        }
        await updateCompetition(competitionId, data);
        // Fnavigate("/competitions");
      }
    } catch (error) {
      console.error("Error updating competition:", error);
    }
  };

  if (!userId) {
    return <NonAuthenticated />;
  }

  if (!isAdmin) {
    return <NonAuthorized />;
  }
  return (
    <div>
      <h2>Edit Competition</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={competitionData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="logo">Logo</label>
          <input type="file" id="logo" name="logo" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={competitionData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="startsAt">Start Date</label>
          <input
            type="date"
            id="startsAt"
            name="startsAt"
            value={competitionData.startsAt}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endsAt">End Date</label>
          <input
            type="date"
            id="endsAt"
            name="endsAt"
            value={competitionData.endsAt}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="award">Award</label>
          <input type="text" id="award" name="award" value={competitionData.award} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input type="number" id="rating" name="rating" value={competitionData.rating} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            value={competitionData.requirements}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={competitionData.status} onChange={handleChange} required>
            <option value={competitionData.status} disabled>
              Select competition status
            </option>
            <option value={competitionStatus.active}>Active</option>
            <option value={competitionStatus.pending}>Pending</option>
            <option value={competitionStatus.closed}>Closed</option>
            <option value={competitionStatus.published}>Published</option>
          </select>
        </div>
        <button type="submit">Update Competition</button>
      </form>
      <Link to="/competitions">Back to Competitions</Link>
    </div>
  );
};

export default EditCompetition;
