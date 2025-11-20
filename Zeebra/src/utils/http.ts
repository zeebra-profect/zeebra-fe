import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;

export const http = axios.create({
  // baseURL: "/api",
  baseURL: `${api}/api`,
  withCredentials: true,
});
