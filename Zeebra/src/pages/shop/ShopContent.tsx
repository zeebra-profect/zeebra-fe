
import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultsList from "@/pages/search/SearchResultsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchInfiniteProducts,
  selectProducts,
  selectSearchPagination,
  selectSearchTerm,
  selectSearchError,
  resetSearchState,
} from "@/store/searchSlice";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { SearchReq } from "@/utils/search";

const ALL_PRODUCTS_KEYWORD = "";

function ShopContent() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const products = useAppSelector(selectProducts);
  const { currentPage, totalPages, isLoading } = useAppSelector(
    selectSearchPagination
  );
  const error = useAppSelector(selectSearchError);

  const urlKeyword = searchParams.get("keyword") || ALL_PRODUCTS_KEYWORD;
  const currentKeyword = useAppSelector(selectSearchTerm);

  // ✅ 초기 로딩 완료 플래그
  const isInitializedRef = useRef(false);
  // ✅ 요청한 페이지 추적
  const requestedPagesRef = useRef(new Set<number>());

  // -----------------------------------------------------------
  // 1. ✅ 키워드 변경 감지 및 초기화
  // -----------------------------------------------------------
  useEffect(() => {
    if (urlKeyword !== currentKeyword) {
      console.log(`[Keyword Change] "${currentKeyword}" → "${urlKeyword}"`);
      
      // 상태 완전 초기화
      dispatch(resetSearchState());
      isInitializedRef.current = false;
      requestedPagesRef.current.clear();
      window.scrollTo(0, 0);
    }
  }, [urlKeyword, currentKeyword, dispatch]);

  // -----------------------------------------------------------
  // 2. ✅ 초기 로딩 (한 번만 실행)
  // -----------------------------------------------------------
  useEffect(() => {
    // 초기화가 안 됐고, 상품이 없고, 로딩 중이 아닐 때만
    if (!isInitializedRef.current && products.length === 0 && !isLoading) {
      console.log(`[Initial Load] 첫 페이지 요청 (keyword: "${urlKeyword}")`);
      
      isInitializedRef.current = true;
      requestedPagesRef.current.add(0);

      const form: SearchReq = {
        keyWord: urlKeyword,
        page: 0,
        size: 20,
        sort: ["createdAt,desc"],
      };

      dispatch(fetchInfiniteProducts(form));
    }
  }, [products.length, isLoading, urlKeyword, dispatch]);

  // -----------------------------------------------------------
  // 3. ✅ 다음 페이지 로드 핸들러
  // -----------------------------------------------------------
  const loadNextPage = useCallback(() => {
    const nextPage = currentPage + 1;

    // ✅ 중복 요청 방지 조건들
    if (
      isLoading ||
      nextPage >= totalPages ||
      requestedPagesRef.current.has(nextPage)
    ) {
      console.log(`[Infinite Scroll] 요청 스킵 - Page ${nextPage}`, {
        isLoading,
        nextPage,
        totalPages,
        alreadyRequested: requestedPagesRef.current.has(nextPage),
      });
      return;
    }

    console.log(`[Infinite Scroll] 다음 페이지 요청: ${nextPage}`);
    requestedPagesRef.current.add(nextPage);

    const form: SearchReq = {
      keyWord: urlKeyword,
      page: nextPage,
      size: 20,
      sort: ["createdAt,desc"],
    };

    dispatch(fetchInfiniteProducts(form));
  }, [isLoading, currentPage, totalPages, urlKeyword, dispatch]);

  const observerTargetRef = useInfiniteScroll(loadNextPage);

  // -----------------------------------------------------------
  // 4. 렌더링
  // -----------------------------------------------------------
  if (error) {
    return (
      <div className="w-full max-w-[1200px] text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <SearchResultsList
        products={products}
        loading={isLoading}
        error={error}
      />

      {/* ✅ 다음 페이지가 있고, 로딩 중이 아닐 때만 observer */}
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