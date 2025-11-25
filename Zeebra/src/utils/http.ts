import axios from "axios";

// 환경 변수 VITE_API_BASE_URL은 http(s)://api.zeebra.shop:8080 형태로 설정 가정
const api = import.meta.env.VITE_API_BASE_URL;

export const http = axios.create({
  
  baseURL: `${api}/api`,
  
  // ⭐️ 쿠키 기반 인증을 위해 필수
  withCredentials: true,
  
  // ⭐️ 요청 시간 초과 설정 (선택 사항, 네트워크 불안정 대응)
  timeout: 10000, 
});

// 💡 선택적: 응답 인터셉터를 추가하여 공통 오류 처리
http.interceptors.response.use(
  (response) => {
    // 2xx 범위의 상태 코드는 이 함수를 트리거합니다.
    return response;
  },
  (error) => {
    // 2xx 외의 상태 코드는 이 함수를 트리거합니다.
    if (error.response) {
      const status = error.response.status;
      
      // 401 Unauthorized 처리 (토큰 만료, 인증 실패)
      if (status === 401) {
        console.error("인증 실패 또는 토큰 만료");
        // 예: 토큰 재발급 로직 호출 또는 로그인 페이지로 리다이렉트
        // window.location.href = '/login'; 
      } 
      // 403 Forbidden 처리 (권한 부족)
      else if (status === 403) {
        console.error("접근 권한이 없습니다.");
      }
      // 다른 상태 코드 처리...

      // 오류를 다시 던져서 개별 컴포넌트에서 catch할 수 있도록 합니다.
      return Promise.reject(error);
    }
    // 네트워크 오류 등의 경우
    return Promise.reject(error);
  }
);