import { http } from "./http";
import { AxiosError } from "axios";
export interface FavoriteRes {
  favoriteProductId: number;
  productId: number;
  productName: string;
  productThumbnail: string;
  productDescription: string;
  memberId: number;
  createdAt: string;
}

export interface ApiResponse<T = void> {
  status: string;
  message: string | null;
  data: T;
  sendTime: string;
}

export interface FavoritesData {
  favoriteProductResponses: FavoriteRes[]; // ✅ dtos → favoriteProductResponses
  pagination: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  };
}

export async function addFavorite(productId: number): Promise<FavoriteRes> {
  const { data } = await http.post<ApiResponse<FavoriteRes>>(
    `favorite-products/${productId}`
  );
  return data.data;
}

export async function deleteFavorite(productId: number): Promise<void> {
  await http.delete<ApiResponse>(`favorite-products/${productId}`);
  return;
}

export async function getFavorites(): Promise<FavoriteRes[]> {
  try {
    // ✅ [수정 1] 'data' 대신 'responseBody'로 구조 분해하여 '읽히지 않음' 경고 제거
    const { data: responseBody } = await http.get<ApiResponse<FavoritesData>>(
      `favorite-products`,
      {
        headers: {
          "Cache-Control": "no-cache", // 캐싱하지 않도록 지시
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    console.log("🔍 API 전체 응답:", responseBody);

    // ✅ responseBody를 사용하여 데이터에 접근
    if (responseBody?.data?.favoriteProductResponses) {
      return responseBody.data.favoriteProductResponses;
    }

    console.warn("⚠️ getFavorites 응답이 예상과 다름:", responseBody);

    // ✅ [수정 2] if 문에 해당하지 않을 경우에도 명시적으로 Promise<FavoriteRes[]> 타입을 반환
    return [];
  } catch (error) {
    // 3. AxiosError인지 확인하고 처리
    if (error instanceof AxiosError) {
      console.error("❌ getFavorites API Axios 에러:", error);

      // 401 에러는 빈 배열 반환 (비로그인)
      if (error.response?.status === 401) {
        return [];
      }
    } else {
      // 그 외 일반적인 오류 (네트워크 문제 등)
      console.error("❌ getFavorites API 일반 에러:", error);
    }

    // 4. 오류를 다시 던집니다.
    throw error;
  }
}
