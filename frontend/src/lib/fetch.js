import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

function getAuthToken() {
  return sessionStorage.getItem("authToken");
}

function navigateToIndexPage() {
  window.location.href = "/";
}

function setAuthHeaders(customHeaders = {}) {
  const authToken = getAuthToken();

  if (authToken) {
    return {
      ...customHeaders,
      Authorization: `Bearer ${authToken}`,
    };
  }
  return { ...customHeaders };
}

function makeRequest(url, method, dataOrParams, customHeaders = {}) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: method,
    data: method === "GET" ? undefined : dataOrParams,
    params: method === "GET" ? dataOrParams : undefined,
    headers: setAuthHeaders(customHeaders),
  })
    .then((res) => {
      //console.log(res.status, "status");
      if (res.status === 401 || res.status === 403) {
        navigateToIndexPage();
      }
      return res.data;
    })
    .catch((error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        navigateToIndexPage();
      }
      console.error("Request error:", error);
      throw error;
    });
}

export async function getFetch(url, params = {}, customHeaders = {}) {
  return await makeRequest(url, "GET", params, customHeaders);
}

export async function postFetch(url, data, customHeaders = {}) {
  return await makeRequest(url, "POST", data, customHeaders);
}

export async function putFetch(url, data, customHeaders = {}) {
  return await makeRequest(url, "PUT", data, customHeaders);
}

export async function patchFetch(url, data, customHeaders = {}) {
  return await makeRequest(url, "PATCH", data, customHeaders);
}

export async function deleteFetch(url, customHeaders = {}) {
  return await makeRequest(url, "DELETE", undefined, customHeaders);
}
