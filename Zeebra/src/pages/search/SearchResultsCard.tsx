import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import FavoriteBtn from "@/components/btn/FavoriteBtn";
import type { ProductDetailResponse } from "@/utils/search";
import { useNavigate } from "react-router-dom";

interface SearchResultsCardProps {
  product: ProductDetailResponse;
}

function SearchResultsCard({ product }: SearchResultsCardProps) {
  const favorites = useAppSelector((state) => state.favorites?.favorites ?? []);
  const navigate = useNavigate();

  // Redux 상태를 기반으로 이 상품의 찜 여부 확인
  const isProductFavorite = favorites.some(
    (fav) => fav.productId === product.productId
  );

  // ✅ 관심 카운트를 로컬 상태로 관리 (초기값 설정)
  const [favoriteCount, setFavoriteCount] = useState(
    product.favoriteProductCount
  );

  const handleCardClick = () => {
    navigate(`/products/${product.productId}`);
  };

  // ❌ prevIsFavorite 상태 제거
  // ❌ Redux 상태 변경 감지 및 카운트 조정하는 useEffect 제거

  // ✅ FavoriteBtn에서 API 성공 시 호출되는 콜백 함수
  const handleFavoriteToggle = (isAdding: boolean) => {
    setFavoriteCount((prev) => (isAdding ? prev + 1 : Math.max(0, prev - 1)));
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "가격 미정";
    return `${price.toLocaleString()}원`;
  };

  const formatCount = (count: number) => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}만`;
    }
    return count.toLocaleString();
  };

  return (
    <div
      className="w-40 md:w-[200px] lg:w-[238px] h-auto flex flex-col gap-y-2 cursor-pointer"
      onClick={handleCardClick}
    >
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
          <FavoriteBtn
            productId={product.productId}
            initialIsFavorite={isProductFavorite}
            onCountChange={handleFavoriteToggle} // 👈 카운트 변경 콜백 전달
          />
        </div>
        <p className="font-semibold text-[10px] md:text-xs">
          {formatPrice(product.lowPrice)}
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
