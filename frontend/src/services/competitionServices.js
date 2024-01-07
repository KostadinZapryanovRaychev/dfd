import { getFetch, postFetch, patchFetch, deleteFetch } from "../lib/fetch";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust the URL as needed

export const createCompetition = async (competitionData) => {
  try {
    const formData = new FormData();
    Object.entries(competitionData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return await postFetch("/competitions", formData);
  } catch (error) {
    throw new Error("Error creating competition");
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
    return await patchFetch(`/competitions/${competitionId}`, competitionData);
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
    const formData = new FormData();
    formData.append("userId", applicationData.userId);
    formData.append("competitionId", applicationData.competitionId);
    formData.append("grade", applicationData.grade);

    if (applicationData.solution) {
      formData.append("solution", applicationData.solution);
    }
    const response = await postFetch("/applications", formData);

    return response;
  } catch (error) {
    throw new Error("Error applying to competition");
  }
};

export const getCompetitionPerUser = async (userId) => {
  try {
    const response = await getFetch(`/applications/${userId}`);
    return response;
  } catch (error) {
    throw new Error("Error getting competition for a given user");
  }
};

export const deleteCompetitionPerUser = async (userId, competitionId) => {
  try {
    const response = await deleteFetch(
      `/applications/${userId}/${competitionId}`
    );
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

export const updateApplicationForCompetition = async (competitionData) => {
  try {
    return await patchFetch(`/competitions`, competitionData);
  } catch (error) {
    throw new Error("Error updating this application");
  }
};
