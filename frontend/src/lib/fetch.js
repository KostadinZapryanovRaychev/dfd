import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

function getAuthToken() {
  return sessionStorage.getItem("authToken");
}

function setAuthHeaders(customHeaders = {}) {
  const authToken = getAuthToken();
  return {
    ...customHeaders,
    Authorization: `Bearer ${authToken}`,
  };
}

function makeRequest(url, method, dataOrParams, customHeaders = {}) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: method,
    data: method === "GET" ? undefined : dataOrParams,
    params: method === "GET" ? dataOrParams : undefined,
    headers: setAuthHeaders(customHeaders),
  }).then((res) => res.data);
}

export function getFetch(url, params = {}, customHeaders = {}) {
  return makeRequest(url, "GET", params, customHeaders);
}

export function postFetch(url, data, customHeaders = {}) {
  return makeRequest(url, "POST", data, customHeaders);
}

export function putFetch(url, data, customHeaders = {}) {
  return makeRequest(url, "PUT", data, customHeaders);
}

export function patchFetch(url, data, customHeaders = {}) {
  return makeRequest(url, "PATCH", data, customHeaders);
}

export function deleteFetch(url, customHeaders = {}) {
  return makeRequest(url, "DELETE", undefined, customHeaders);
}
