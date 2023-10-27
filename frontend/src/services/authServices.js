import { deleteFetch, getFetch, patchFetch, postFetch } from "../lib/fetch";

export const loginUser = async (formData) => {
  try {
    const response = await postFetch("/login", formData);
    const token = response.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    throw new Error("Error during user login");
  }
};

export const registerUser = async (userData) => {
  return await postFetch("/register", userData);
};

export const logout = async () => {
  return await postFetch("/logout");
};

export const isAutheticated = async () => {
    return await postFetch("/authenticated");
  };
