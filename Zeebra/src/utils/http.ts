import axios from "axios";

// 환경 변수 VITE_API_BASE_URL은 http(s)://api.zeebra.shop:8080 형태로 설정 가정
const api = import.meta.env.VITE_API_BASE_URL;

export const http = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: `${api}/api`,

  // ⭐️ 쿠키 기반 인증을 위해 필수
  withCredentials: true,
});
