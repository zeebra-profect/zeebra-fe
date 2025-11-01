import FavoriteBtn from "@/components/btn/FavoriteBtn";
import type { ProductDetailResponse } from "@/utils/search";

interface SearchResultsCardProps {
  product: ProductDetailResponse;
}

function SearchResultsCard({ product }: SearchResultsCardProps) {
  // 가격 포맷팅 함수
  const formatPrice = (price: number | null) => {
    if (!price) return "가격 미정";
    return `${price.toLocaleString()}원`;
  };

  // 숫자 포맷팅 함수 (2.4만 형식)
  const formatCount = (count: number) => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}만`;
    }
    return count.toLocaleString();
  };

  return (
    <div className="w-40 md:w-[200px] lg:w-[238px] h-auto flex flex-col gap-y-2 cursor-pointer">
      <img
        src={product.ProductThumbnail}
        alt={product.productName}
        className="w-40 h-40 md:w-[200px] md:h-[200px] lg:w-[238px] lg:h-[238px] object-cover rounded-lg"
      />
      <div className="flex flex-col gap-y-[5px] font-pretendard text-main-text">
        <div className="flex flex-row justify-between items-center">
          <p className="font-light text-[10px] md:text-xs line-clamp-2 flex-1">
            {product.productName}
          </p>
          <FavoriteBtn productId={product.productId} />
        </div>
        <p className="font-semibold text-[10px] md:text-xs">
          {formatPrice(product.lowPrice)}
        </p>
        <p className="font-light text-[9px] md:text-xs text-grey2">
          관심 {formatCount(product.favoriteProductCount)} · 리뷰{" "}
          {formatCount(product.reviewCount)}
        </p>
      </div>
    </div>
  );
}

export default SearchResultsCard;
