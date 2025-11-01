import { http } from "./http";

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

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/** 카테고리 정보 (공통적으로 사용된다면 common.ts 등으로 분리 가능) */
export interface CategoryResponse {
  categoryId: number;
  categoryName: string;
}

/** 브랜드 정보 (공통적으로 사용된다면 common.ts 등으로 분리 가능) */
export interface BrandResponse {
  brandId: number;
  brandName: string;
}

/** 응답 데이터의 본문 (body) */
export interface SearchData {
  productDetailResponses: ProductDetailResponse[];
  categoryResponses: CategoryResponse[];
  brandResponses: BrandResponse[];
  pagination: Pagination;
}

// --- 2. 최상위 응답 인터페이스 ---

/** 최종 검색 응답 객체 */
export interface SearchRes {
  status: string;
  message: string;
  data: SearchData;
  sendTime: string; // ISO 8601 형식의 날짜 문자열
}

export async function getProducts(
  keyword: string,
  page: number = 0, // 기본값: 0 (첫 페이지)
  size: number = 10, // 기본값: 10 (페이지 크기)
  sort: string[] = [] // 기본값: 빈 배열 (정렬 기준)
) {
  // 💡 URLSearchParams를 사용하여 쿼리 파라미터를 안전하게 구성합니다.
  const params = new URLSearchParams({
    keyword: keyword,
    page: page.toString(),
    size: size.toString(),
    // sort 배열을 JSON 문자열로 변환하여 전달 (API 요구사항에 따라 달라질 수 있음)
    // 예시 URL의 형태가 '[ "string" ]'이므로, 배열을 JSON.stringify로 처리합니다.
    sort: JSON.stringify(sort),
  });

  // 최종 URL: /products?keyword={...}&page=0&size=10&sort=["string"]
  const url = `/products?${params.toString()}`;

  // http.get은 URL 파라미터를 자동으로 인코딩하여 안전하게 처리합니다.
  // 예: sort=["string"]은 sort=%5B%22string%22%5D로 인코딩됩니다.
  const res = await http.get(url);

  return res.data;
}

export async function searchProducts(
  keyword: string,
  page: number = 0,
  size: number = 10
): Promise<SearchRes> {
  const { data } = await http.get<SearchRes>(`/products`, {
    params: {
      keyword,
      page,
      size,
    },
  });
  return data;
}
