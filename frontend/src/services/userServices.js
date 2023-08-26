import { postFetch } from "../lib/fetch";

const API_BASE_URL = "http://localhost:5000/api";

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
