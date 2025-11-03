import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchResultsList from "../search/SearchResultsList";
import { getProducts } from "@/utils/search"; // 'getProducts' 함수 재사용 (모든 상품을 가져오는 API로 가정)
import type { ProductDetailResponse } from "@/utils/search";

// 🚨 중요: 모든 상품을 가져올 때 사용할 기본 키워드 값.
// 서버에서 키워드가 'null' 또는 '빈 문자열'일 때 모든 상품을 반환하도록 설계되어 있어야 합니다.
const ALL_PRODUCTS_KEYWORD = "";

function ShopContent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductDetailResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  let response;

  useEffect(() => {
    // 1. location.state로 전달된 데이터가 있으면 먼저 사용 (검색 결과 페이지 이동 시)
    if (location.state?.searchData) {
      const searchData = location.state.searchData;
      setProducts(searchData.data.productDetailResponses);
      return;
    }

    // 2. state가 없으면 쿼리 파라미터 확인
    const keyword = searchParams.get("keyword");

    // ✅ 3. URL에 키워드가 있다면 해당 키워드로 검색
    if (keyword) {
      fetchProducts(keyword);
    }

    // ✅ 4. 키워드가 없고, state도 없다면 (순수 /shopPage 진입) 모든 상품 로드
    else {
      // ALL_PRODUCTS_KEYWORD는 빈 문자열로 설정하여,
      // 서버의 getProducts API가 '빈 키워드 = 모든 상품'을 의미하도록 요청합니다.
      fetchProducts(ALL_PRODUCTS_KEYWORD);
    }
  }, [location.state, searchParams]); // 의존성 배열 유지

  // ✅ fetchProducts 함수는 모든 상품 로드와 키워드 검색 모두를 처리하도록 재활용
  const fetchProducts = async (keyword: string) => {
    try {
      setLoading(true);
      setError(null);

      // 🚨 중요: 이 getProducts API가 빈 문자열("") 또는 null 키워드일 때
      //          DB의 전체 상품 목록을 반환하도록 백엔드가 구현되어 있어야 합니다.
      response = await getProducts(keyword, 0, 20);
      setProducts(response.data.productDetailResponses);
    } catch (err) {
      setError("상품 목록을 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("asfsdf: ", response);
  }, [response]);

  return (
    <div className="w-full flex flex-col items-center mt-6">
      {/* 검색 결과 리스트 */}
      <SearchResultsList products={products} loading={loading} error={error} />
    </div>
  );
}

export default ShopContent;
