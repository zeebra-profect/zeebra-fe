import { http } from "./http";

export interface SearchRes {
  status: string;
  message: string;
  data: SearchData;
  sendTime: string; // ISO 8601 형식의 날짜 문자열
}
export interface ProductDetailResponse {
  productId: number;
  brandId: number;
  categoryId: number;
  productName: string;
  productDescription: string;
  modelNumber: string;
  productThumbnail: string;
  images: string[];
  minPrice: number;
  reviewCount: number;
  favoriteProductCount: number;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  score: number;
}
export interface CategoryResponse {
  categoryId: number;
  categoryName: string;
}
export interface BrandResponse {
  brandId: number;
  brandName: string;
}
export interface Pagination {
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
}
export interface SearchData {
  products: ProductDetailResponse[];
  categoryResponses: CategoryResponse[];
  brandResponses: BrandResponse[];
  pagination: Pagination;
}

export interface SuggestionData {
  suggestions: string[];
}

export interface SuggestionRes {
  status: string;
  message: string | null;
  data: SuggestionData;
  sendTime: string;
}

export interface SearchReq {
  keyWord?: string | null;
  categoryIds?: number[] | null;
  brandIds?: number[] | null;
  productSort?: string | null;
  page?: number;
  size?: number;
  sort?: string[];
}

export async function getSuggestions(keyword: string): Promise<string[]> {
  if (!keyword.trim()) return [];

  try {
    const { data } = await http.get<SuggestionRes>(`/products/suggestions`, {
      params: { searchWord: keyword },
    });

    return data.data.suggestions;
  } catch (e) {
    console.error("추천 검색어 로딩 실패", e);
    return [];
  }
}

export async function getProducts(form: SearchReq): Promise<SearchRes> {
  // null/undefined 값 제거
  const params = { ...form };
  Object.keys(params).forEach((key) => {
    if (
      params[key as keyof SearchReq] === null ||
      params[key as keyof SearchReq] === undefined
    ) {
      delete params[key as keyof SearchReq];
    }
  });

  const { data } = await http.get<SearchRes>(`/products`, {
    params,
    paramsSerializer: {
      indexes: null,
    },
  });

  console.log("data: ", data);
  return data;
}
