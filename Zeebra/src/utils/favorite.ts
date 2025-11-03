import { http } from "./http";
import { AxiosError } from "axios";
export interface FavoriteRes {
  favoriteProductId: number;
  productId: number;
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
}

export async function getFavorites(): Promise<FavoriteRes[]> {
  try {
    const { data } = await http.get<ApiResponse<FavoritesData>>(
      `favorite-products`
    );

    console.log("🔍 API 전체 응답:", data);

    if (data?.data?.favoriteProductResponses) {
      return data.data.favoriteProductResponses;
    }

    console.warn("⚠️ getFavorites 응답이 예상과 다름:", data);
    return [];
  } catch (error) {
    // 👈 2. 'error: any' 대신 'error'만 사용

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

    // 4. 오류를 다시 던지거나, 적절한 대체 값을 반환합니다.
    throw error;
  }
}
