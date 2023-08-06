import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your API base URL

//TODO to take the url from ENV

// Facade function for GET requests
export function getFetch(url, params = {}) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "GET",
    params: params,
  }).then((res) => res.data);
}

// Facade function for POST requests
export function postFetch(url, data) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "POST",
    data: data,
  }).then((res) => res.data);
}

export function putFetch(url, data) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "PUT",
    data: data,
  }).then((res) => res.data);
}

// Facade function for PATCH requests
export function patchFetch(url, data) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "PATCH",
    data: data,
  }).then((res) => res.data);
}

// Facade function for DELETE requests
export function deleteFetch(url) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "DELETE",
  }).then((res) => res.data);
}
