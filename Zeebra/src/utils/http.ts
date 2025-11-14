import axios from "axios";

export const http = axios.create({
  // baseURL: "/api",
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});
