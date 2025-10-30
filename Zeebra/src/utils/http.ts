import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// 401 오류 시 /api/auth/refresh 엔드포인트로 토큰 재발급 요청 (미구현)

// let isRefreshing = false;
// let waiters: Array<() => void> = [];

// http.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;
//     if (!error.response) return Promise.reject(error);

//     const isRefreshCall = original?.url?.includes("/auth/refresh");
//     if (error.response.status === 401 && !original._retry && !isRefreshCall) {
//       if (isRefreshing) {
//         await new Promise<void>((resolve) => waiters.push(resolve));
//         original._retry = true;
//         return http(original);
//       }
//       isRefreshing = true;
//       try {
//         await http.post("/auth/refresh");
//         waiters.forEach((fn) => fn());
//         waiters = [];
//         original._retry = true;
//         return http(original);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );
