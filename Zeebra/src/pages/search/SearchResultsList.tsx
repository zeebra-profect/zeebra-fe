import SearchResultsCard from "./SearchResultsCard";
import type { ProductDetailResponse } from "@/utils/search";

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
      <div className="w-full max-w-[1200px] text-center py-10">
        <p className="text-grey2">검색 중...</p>
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
      {products.map((product) => (
        <SearchResultsCard key={product.productId} product={product} />
      ))}
    </div>
  );
}

export default SearchResultsList;
