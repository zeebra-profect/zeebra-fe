import React from "react";
import SearchResultsCard from "./SearchResultsCard";
import type { ProductDetailResponse } from "@/utils/search";
import ResultSkeletonCard from "./ResultSkeletonCard";

interface SearchResultsListProps {
  products: ProductDetailResponse[];
  loading?: boolean;
  error?: string | null;
}

function SearchResultsList({
  products,
  loading,
  error,
}: SearchResultsListProps) {
  const isInitialLoading = loading && products.length === 0;
  // 로딩 상태
  if (isInitialLoading) {
    return (
      // 👇 [중요] 아래 실제 데이터 렌더링하는 div와 클래스가 100% 똑같아야 함!
      <div className="flex flex-row gap-x-3 md:gap-x-1 lg:gap-x-0.5 gap-y-2 md:gap-y-5 w-full max-w-[1200px] flex-wrap justify-center md:justify-start">
        {/* 20개 뿌리기 (페이지네이션 사이즈에 맞춤) */}
        {Array.from({ length: 20 }).map((_, index) => (
          <ResultSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="w-full max-w-[1200px] text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // 검색 결과 없음
  if (!loading && products.length === 0) {
    return (
      <div className="w-full max-w-[1200px] text-center py-10">
        <p className="text-grey2">텅 비었어요....</p>
      </div>
    );
  }

  // 검색 결과 표시
  return (
    <div className="flex flex-row gap-x-3 md:gap-x-1 lg:gap-x-0.5 gap-y-2 md:gap-y-5 w-full max-w-[1200px] flex-wrap justify-center md:justify-start">
      {products.map((product, index) => (
        <SearchResultsCard
          key={product.productId}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
}

export default React.memo(SearchResultsList);
