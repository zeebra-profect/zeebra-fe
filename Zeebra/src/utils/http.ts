import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// 401 오류 시 /api/auth/refresh 엔드포인트로 토큰 재발급 요청
