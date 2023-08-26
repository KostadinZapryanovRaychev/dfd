import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export function getFetch(url, params = {}, headers = {}) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "GET",
    params: params,
    headers: headers,
  }).then((res) => res.data);
}

export function postFetch(url, data, headers = {}) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "POST",
    data: data,
    headers: headers,
  }).then((res) => res.data);
}

export function putFetch(url, data, headers = {}) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "PUT",
    data: data,
    headers: headers,
  }).then((res) => res.data);
}

export function patchFetch(url, data, headers = {}) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "PATCH",
    data: data,
    headers: headers,
  }).then((res) => res.data);
}

export function deleteFetch(url, headers = {}) {
  return axios({
    url: `${API_BASE_URL}${url}`,
    method: "DELETE",
    headers: headers,
  }).then((res) => res.data);
}
