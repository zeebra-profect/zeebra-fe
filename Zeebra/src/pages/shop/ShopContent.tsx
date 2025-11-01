// ShopContent.tsx
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchResultsList from "../search/SearchResultsList";
import { getProducts } from "@/utils/search";
import type { ProductDetailResponse } from "@/utils/search";

function ShopContent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<ProductDetailResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. location.state로 전달된 데이터가 있으면 먼저 사용
    if (location.state?.searchData) {
      const searchData = location.state.searchData;
      setProducts(searchData.data.productDetailResponses);
      return;
    }

    // 2. state가 없으면 쿼리 파라미터로 다시 검색
    const keyword = searchParams.get("keyword");
    if (keyword) {
      fetchProducts(keyword);
    }
  }, [location.state, searchParams]);

  const fetchProducts = async (keyword: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getProducts(keyword, 0, 20);
      setProducts(response.data.productDetailResponses);
    } catch (err) {
      setError("검색 결과를 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      {/* 검색 결과 리스트 */}
      <SearchResultsList products={products} loading={loading} error={error} />
    </div>
  );
}

export default ShopContent;
