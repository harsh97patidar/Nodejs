import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: false,
});

export async function makeRequest(url, options) {
  const token = await `Bearer ${localStorage.getItem("token")}`;
  const requestOptions = {
    ...options,
    headers: {
      Authorization: token,
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
