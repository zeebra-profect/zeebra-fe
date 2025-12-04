import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import FavoriteBtn from "@/components/btn/FavoriteBtn";
import type { ProductDetailResponse } from "@/utils/search";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "@/utils/image";
import DOMPurify from "dompurify";

interface SearchResultsCardProps {
  product: ProductDetailResponse;
  index: number;
}

function SearchResultsCard({ product, index }: SearchResultsCardProps) {
  const navigate = useNavigate();
  const favorites = useAppSelector((state) => state.favorites?.favorites ?? []);

  const isProductFavorite = favorites.some(
    (fav) => fav.productId === product.productId
  );

  const [favoriteCount, setFavoriteCount] = useState(
    product.favoriteProductCount
  );

  const handleCardClick = () => {
    navigate(`/products/${product.productId}`);
  };

  // ✅ 부모 쪽 함수는 'isAdding'만 받도록 수정 (이벤트 객체 e 제거)
  const handleFavoriteToggle = (isAdding: boolean) => {
    setFavoriteCount((prev) => (isAdding ? prev + 1 : Math.max(0, prev - 1)));
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "재고 없음";
    return `${price.toLocaleString()}원`;
  };

  const formatCount = (count: number | undefined | null) => {
    // 값이 없으면 0으로 취급
    const safeCount = count || 0;

    if (safeCount >= 10000) {
      return `${(safeCount / 10000).toFixed(1)}만`;
    }
    return safeCount.toLocaleString();
  };

  const safeName = DOMPurify.sanitize(product.productName);

  return (
    <div
      className="w-40 md:w-[200px] lg:w-[238px] h-auto flex flex-col gap-y-2 cursor-pointer"
      onClick={handleCardClick}
      data-testid="product-card"
    >
      <img
        // ✅ [수정 1] ProductThumbnail -> productThumbnail (소문자)
        src={getImageUrl(product.productThumbnail, product.productId)}
        alt={product.productName}
        className="w-40 h-40 md:w-[200px] md:h-[200px] lg:w-[238px] lg:h-[238px] object-cover rounded-lg"
        fetchPriority={index < 2 ? "high" : "auto"}
        loading={index < 2 ? "eager" : "lazy"}
      />
      <div className="flex flex-col gap-y-[5px] font-pretendard text-main-text px-3">
        <div className="flex flex-row justify-between items-center">
          <p
            className="font-light text-[10px] md:text-xs line-clamp-2 flex-1"
            dangerouslySetInnerHTML={{ __html: safeName }}
          />

          <FavoriteBtn
            productId={product.productId}
            initialIsFavorite={isProductFavorite}
            onCountChange={handleFavoriteToggle}
          />
        </div>
        <p className="font-semibold text-[10px] md:text-xs">
          {/* ✅ [수정 2] lowPrice -> minPrice (인터페이스에 맞춤) */}
          {formatPrice(product.minPrice)}
        </p>
        <p className="font-light text-[9px] md:text-xs text-grey2">
          관심 {formatCount(favoriteCount)} · 리뷰{" "}
          {formatCount(product.reviewCount)}
        </p>
      </div>
    </div>
  );
}

export default SearchResultsCard;
