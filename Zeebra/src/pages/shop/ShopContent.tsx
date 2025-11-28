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
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

        // 상태 업데이트
        setProducts((prev) => {
          // 리셋(검색어 변경 등)인 경우 새 데이터로 덮어쓰기
          if (isReset) return newItems;

          // 무한 스크롤인 경우: 기존 데이터 + 새 데이터 (중복 제거 포함)
          const existingIds = new Set(prev.map((p) => p.productId));
          const filteredNewItems = newItems.filter(
            (p) => !existingIds.has(p.productId)
          );
          return [...prev, ...filteredNewItems];
        });

        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.currentPage);
        isInitializedRef.current = true; // 데이터 로드 성공 표시
      } catch (err) {
        console.error(err);
        setError("상품을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    // URL 키워드가 바뀌면 상태를 초기화하고 0페이지 요청
    window.scrollTo(0, 0);
    requestedPagesRef.current.clear();
    requestedPagesRef.current.add(0); // 0페이지 요청 기록

    // 리셋 모드(true)로 호출
    fetchProductsData(0, keyword, true);
  }, [keyword, fetchProductsData]);

  const loadNextPage = useCallback(() => {
    const nextPage = currentPage + 1;

    // 더 이상 페이지가 없거나, 로딩 중이거나, 이미 요청한 페이지면 스킵
    if (
      isLoading ||
      nextPage >= totalPages ||
      requestedPagesRef.current.has(nextPage)
    ) {
      return;
    }

    console.log(`[Infinite Scroll] 다음 페이지 요청: ${nextPage}`);
    requestedPagesRef.current.add(nextPage);

    // 추가 로드 모드(false)로 호출
    fetchProductsData(nextPage, keyword, false);
  }, [isLoading, currentPage, totalPages, keyword, fetchProductsData]);

  // 7. 훅 연결
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

      {/* ✅ 무한 스크롤 센서 (다음 페이지가 있고, 로딩 중 아닐 때) */}
      {currentPage + 1 < totalPages && !isLoading && (
        <div
          ref={observerTargetRef}
          className="h-[50px] flex justify-center items-center w-full"
        >
          <p className="text-gray-400">스크롤하여 더보기</p>
        </div>
      )}

      {/* 로딩 중 표시 */}
      {isLoading && products.length > 0 && (
        <div className="h-[50px] flex justify-center items-center w-full">
          <p className="text-gray-500">다음 상품 로딩 중...</p>
        </div>
      )}

      {/* 모든 상품 로드 완료 */}
      {currentPage + 1 >= totalPages && products.length > 0 && !isLoading && (
        <p className="text-gray-400 mt-5 mb-10">
          모든 상품 ({products.length}개)을 불러왔습니다.
        </p>
      )}

      {/* 결과 없음 */}
      {!isLoading && products.length === 0 && isInitializedRef.current && (
        <p className="text-gray-500 mt-20">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default ShopContent;
