import { getFetch, postFetch, patchFetch, deleteFetch, putFetch } from "../lib/fetch";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust the URL as needed

export const createCompetition = async (competitionData) => {
  try {
    return await postFetch("/competitions", competitionData);
  } catch (error) {
    throw new Error("Error creating competition");
  }
};

export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("logo", imageFile);
    return await postFetch("/competitions/upload", formData);
  } catch (error) {
    throw new Error("Error uploading image");
  }
};

export const getAllCompetitions = async () => {
  try {
    return await getFetch("/competitions");
  } catch (error) {
    throw new Error("Error fetching all competitions");
  }
};

export const getCompetition = async (competitionId) => {
  try {
    return await getFetch(`/competitions/${competitionId}`);
  } catch (error) {
    throw new Error("Error fetching competition");
  }
};

export const updateCompetition = async (competitionId, competitionData) => {
  try {
    return await putFetch(`/competitions/${competitionId}`, competitionData);
  } catch (error) {
    throw new Error("Error updating competition");
  }
};

export const deleteCompetition = async (competitionId) => {
  try {
    return await deleteFetch(`/competitions/${competitionId}`);
  } catch (error) {
    throw new Error("Error deleting competition");
  }
};

export const applyToCompetition = async (applicationData) => {
  try {
    const response = await postFetch("/applications", applicationData);
    return response;
  } catch (error) {
    throw new Error("Error applying to competition");
  }
};

export const uploadSolutionForApplication = async (applicationData) => {
  try {
    const formData = new FormData();
    if (applicationData) {
      formData.append("solution", applicationData);
    }
    const response = await postFetch("/applications/upload", formData);
    return response;
  } catch (error) {
    throw new Error("Error applying to competition");
  }
};

export const getCompetitionPerUser = async (userId, isPublished) => {
  try {
    const response = await getFetch(`/applications/user/${userId}/${isPublished}`);
    return response;
  } catch (error) {
    throw new Error("Error getting competition for a given user");
  }
};

export const getApplicationForAcompetition = async (competitionId, setCompetitions) => {
  try {
    const response = await getFetch(`/applications/competitions/${competitionId}`);

    console.log(response?.applications, "response");

    if (response?.applications?.length > 0) {
      const sortedApplications = response.applications.sort((a, b) => b.grade - a.grade);
      setCompetitions(sortedApplications);
    } else {
      setCompetitions(response);
    }
    return response;
  } catch (error) {
    throw new Error("Error getting competition for a given user", error);
  }
};

export const deleteCompetitionPerUser = async (userId, competitionId) => {
  try {
    const response = await deleteFetch(`/applications/${userId}/${competitionId}`);
    return response;
  } catch (error) {
    throw new Error("Error getting competition for a given user");
  }
};

export const getAllApplications = async () => {
  try {
    const response = await getFetch(`/applications`);
    return response;
  } catch (error) {
    throw new Error("Error getting all applications");
  }
};

export const updateApplicationGrade = async (applicationId, grade) => {
  try {
    const endpoint = `/applications/${applicationId}`;
    const updatedData = { grade };
    return await putFetch(endpoint, updatedData);
  } catch (error) {
    throw new Error("Error updating this application");
  }
};

export const downloadSolutionFile = async (fileName) => {
  const url = `/applications/download${fileName}`;

  const fullUrl = "http://localhost:5000/api" + url;
  try {
    const response = await getFetch(url);
    if (response) {
      window.open(fullUrl, "_blank");
      console.log(response);
      //return response;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error downloading solution file");
  }
};
