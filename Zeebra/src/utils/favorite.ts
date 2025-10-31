import { http } from "./http";

export interface FavoriteRes {
  favoriteProductId: number;
  productId: number;
  memberId: number;
  createdAt: string;
}

export interface ApiResponse<T = void> {
  status: string;
  Message: string | null;
  data: T;
  sendTime: string;
}

export interface FavoritesData {
  dtos: FavoriteRes[];
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
  const { data } = await http.get<ApiResponse<FavoritesData>>(
    `favorite-products`
  );
  return data.data.dtos;
}
