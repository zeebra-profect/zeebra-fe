import axios from "axios";

export const http = axios.create({
  baseURL: "https://zeebra.shop",
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
