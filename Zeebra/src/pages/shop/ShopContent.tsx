import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultsList from "@/pages/search/SearchResultsList";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import {
  getProducts,
  type ProductDetailResponse,
  type SearchReq,
} from "@/utils/search";

const ALL_PRODUCTS_KEYWORD = "";

function ShopContent() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || ALL_PRODUCTS_KEYWORD;

  const [products, setProducts] = useState<ProductDetailResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // ✅ 변경 1: totalPages 삭제 -> hasNext 추가
  const [hasNext, setHasNext] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isInitializedRef = useRef(false);
  const requestedPagesRef = useRef(new Set<number>());

  const fetchProductsData = useCallback(
    async (
      pageNum: number,
      searchKeyword: string,
      isReset: boolean = false
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const form: SearchReq = {
          keyWord: searchKeyword,
          page: pageNum,
          size: 20,
          sort: ["createdAt,desc"],
        };

        const res = await getProducts(form);
        const data = res.data;
        const newItems = data.productDetailResponses;

        setProducts((prev) => {
          if (isReset) return newItems;
          const existingIds = new Set(prev.map((p) => p.productId));
          const filteredNewItems = newItems.filter(
            (p) => !existingIds.has(p.productId)
          );
          return [...prev, ...filteredNewItems];
        });

        // ✅ 변경 2: API 응답에서 hasNext 사용
        setHasNext(data.pagination.hasNext);
        setCurrentPage(data.pagination.currentPage);

        isInitializedRef.current = true;
      } catch (err) {
        console.error(err);
        setError("상품을 불러오는 중 오류가 발생했습니다.");
        // 에러 시 재요청 가능하게 set에서 제거
        requestedPagesRef.current.delete(pageNum);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    requestedPagesRef.current.clear();
    requestedPagesRef.current.add(0);
    fetchProductsData(0, keyword, true);
  }, [keyword, fetchProductsData]);

  const loadNextPage = useCallback(() => {
    const nextPage = currentPage + 1;

    // ✅ 변경 3: !hasNext 조건으로 체크
    if (
      isLoading ||
      !hasNext || // 다음 페이지 없으면 중단
      requestedPagesRef.current.has(nextPage)
    ) {
      return;
    }

    console.log(`[Infinite Scroll] 다음 페이지 요청: ${nextPage}`);
    requestedPagesRef.current.add(nextPage);
    fetchProductsData(nextPage, keyword, false);
  }, [isLoading, currentPage, hasNext, keyword, fetchProductsData]);

  const observerTargetRef = useInfiniteScroll(loadNextPage);

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <SearchResultsList
        products={products}
        loading={isLoading}
        error={error}
      />

      {/* ✅ 변경 4: hasNext가 true일 때만 센서 노출 (isLoading 조건 제거함!) */}
      {hasNext && (
        <div
          ref={observerTargetRef}
          className="h-[50px] flex justify-center items-center w-full"
        >
          <p className="text-gray-400">
            {isLoading ? "로딩 중..." : "스크롤하여 더보기"}
          </p>
        </div>
      )}

      {/* 결과 없음 메시지 */}
      {!isLoading && products.length === 0 && isInitializedRef.current && (
        <p className="text-gray-500 mt-20">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default ShopContent;
