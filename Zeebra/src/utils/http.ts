import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

http.interceptors.request.use((config) => config);

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // 필요 시 리프레시 트리거 or 로그인 페이지로 이동
      // navigate("/login") 등
    }
    return Promise.reject(err);
  }
);
