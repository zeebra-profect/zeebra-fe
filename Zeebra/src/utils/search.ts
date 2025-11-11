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
  ProductThumbnail: string;
  images: string[];
  lowPrice: number;
  reviewCount: number;
  favoriteProductCount: number;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
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
  totalCount: number;
  totalPages: number;
}
export interface SearchData {
  productDetailResponses: ProductDetailResponse[];
  categoryResponses: CategoryResponse[];
  brandResponses: BrandResponse[];
  pagination: Pagination;
}

export interface SearchReq {
  keyWord?: string | null;
  categoryIds: number[] | null;
  brandIds: number[] | null;
  productSort: string | null;
  pageable: {
    page: number;
    size: number;
    sort: string;
  };
}

export async function getProducts(form: SearchReq): Promise<SearchRes> {
  const { data } = await http.get<SearchRes>(`/products`, {
    params: form,
  });
  console.log("data: ", data);
  return data;
}
