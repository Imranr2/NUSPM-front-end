import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default authAxios;
