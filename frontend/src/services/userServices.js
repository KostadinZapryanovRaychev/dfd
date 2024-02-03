import { deleteFetch, getFetch, patchFetch, postFetch } from "../lib/fetch";

const API_BASE_URL = "http://localhost:5000/api";

export const loginUser = async (formData) => {
  try {
    const response = await postFetch("/login", formData);
    const token = response.token;
    sessionStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    throw new Error("Error during user login");
  }
};

export const registerUser = async (userData) => {
  return await postFetch("/register", userData);
};

export const getAllUsers = async () => {
  try {
    return await getFetch("/users");
  } catch (error) {
    throw new Error("Error fetching all users");
  }
};

export const getUser = async (userId) => {
  try {
    const currentUser = await getFetch(`/users/${userId}`);
    return currentUser;
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

export const updateUser = async (userId, userData) => {
  const { firstName, lastName, email, address, isAdmin, company, age, isBlocked, profession, photo, phone } = userData;
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("isAdmin", isAdmin);
  formData.append("address", address);
  formData.append("company", company);
  formData.append("phone", phone);
  formData.append("age", age);
  formData.append("isBlocked", isBlocked);
  formData.append("profession", profession);

  try {
    if (photo) {
      formData.append("photo", photo);
    }
    return await postFetch(`/users/${userId}`, formData);
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export const deleteUser = async (userId) => {
  try {
    return await deleteFetch(`/users/${userId}`);
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
