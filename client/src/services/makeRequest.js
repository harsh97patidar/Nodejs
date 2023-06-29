import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: false,
});

export function makeRequest(url, options) {
  const requestOptions = {
    ...options,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  return api(url, requestOptions)
    .then((res) => res.data)
    .catch((error) => {
      if (error?.response?.status) {
        localStorage.removeItem("token");
      }

      return Promise.reject(error?.response?.data?.message ?? "Error");
    });
}
