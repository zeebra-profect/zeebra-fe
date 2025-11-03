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

export interface SearchReq {
  keyWord: string;
  categoryIds: number[];
  brandIds: number[];
  productSort: string;
  pageable: {
    page: number;
    size: number;
    // sort:
  };
}

export async function getProducts(
  keyword: string,
  page: number = 0, // 기본값: 0 (첫 페이지)
  size: number = 10, // 기본값: 10 (페이지 크기)
  sort: string[] = [] // 기본값: 빈 배열 (정렬 기준)
): Promise<SearchRes> {
  // ✅ 1. sort 배열을 Spring API가 흔히 요구하는 형태(예: 쉼표 구분 문자열)로 처리합니다.
  //    Spring Data JPA는 보통 배열 형태로 여러 번의 'sort=...' 파라미터를 원하거나,
  //    배열 인자를 그대로 넘겨도 자동으로 처리해줍니다. 여기서는 Axios의 배열 처리 방식을 따릅니다.

  const { data } = await http.get<SearchRes>(`/products`, {
    params: {
      // ✅ 2. keyword를 params로 직접 전달하여 쿼리 파라미터로 명확히 사용
      keyWord: keyword,
      page: page,
      size: size,
      // ✅ 3. sort 배열을 Axios params에 그대로 전달
      //    Axios는 이를 /products?sort=a,desc&sort=b,asc 형태로 자동 변환합니다.
      sort: sort.length > 0 ? sort : undefined, // 빈 배열일 경우 아예 파라미터에서 제외
    },
  });
  console.log("dataaaa: ", data);
  return data;
}

// ❌ searchProducts 함수는 getProducts로 통합되었으므로 제거하거나 주석 처리합니다.
/*
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
*/
