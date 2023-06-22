import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: false,
});

export function makeRequest(url, options) {
  const requestOptions = {
    ...options,
    headers: {
      // Add your headers here
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // "Content-Type": "application/json",
      "Content-Type": "text/plain",
      // Other headers...
    },
  };

  return api(url, requestOptions)
    .then((res) => res.data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? "Error")
    );
}
