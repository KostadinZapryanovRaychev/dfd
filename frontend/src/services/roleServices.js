import { getFetch, postFetch, patchFetch, deleteFetch } from "../lib/fetch";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust the URL as needed

export const createRole = async (roleData) => {
  try {
    return await postFetch("/roles", roleData);
  } catch (error) {
    throw new Error("Error creating role");
  }
};

export const getAllRoles = async () => {
  try {
    return await getFetch("/roles");
  } catch (error) {
    throw new Error("Error fetching all roles");
  }
};

export const getRole = async (roleId) => {
  try {
    return await getFetch(`/roles/${roleId}`);
  } catch (error) {
    throw new Error("Error fetching role");
  }
};

export const updateRole = async (roleId, roleData) => {
  try {
    return await patchFetch(`/roles/${roleId}`, roleData);
  } catch (error) {
    throw new Error("Error updating role");
  }
};

export const deleteRole = async (roleId) => {
  try {
    return await deleteFetch(`/roles/${roleId}`);
  } catch (error) {
    throw new Error("Error deleting role");
  }
};
