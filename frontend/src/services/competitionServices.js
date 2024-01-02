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
