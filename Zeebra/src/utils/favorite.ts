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
  favoriteProductResponses: FavoriteRes[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount?: number;
    totalPages?: number;
    hasNext?: boolean;
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

export async function getFavorites(page = 0): Promise<FavoritesData | null> {
  try {
    const { data: responseBody } = await http.get<ApiResponse<FavoritesData>>(
      `favorite-products`,
      {
        params: { page, size: 20 }, // ✅ 페이지 파라미터 추가!
        headers: {},
      }
    );

    console.log("🔍 찜 목록 응답:", responseBody);

    if (responseBody?.data) {
      return responseBody.data; // ✅ 리스트+페이지네이션 통째로 반환
    }

    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("❌ getFavorites API Axios 에러:", error);
      if (error.response?.status === 401) {
        return null;
      }
    } else {
      console.error("❌ getFavorites API 일반 에러:", error);
    }
    throw error;
  }
}
