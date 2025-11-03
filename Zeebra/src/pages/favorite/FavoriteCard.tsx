import { useAppDispatch } from "@/store/hooks";
import FavoriteBtn from "@/components/btn/FavoriteBtn";
import { useNavigate } from "react-router-dom";
import type { FavoriteRes } from "@/utils/favorite";
import { fetchFavorites } from "@/store/favoriteSlice";

// Props 인터페이스 정의
interface FavoriteCardProps {
  product: FavoriteRes;
}

function FavoriteCard({ product }: FavoriteCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 찜 목록에서는 항상 true로 시작
  const initialIsFavorite = true;

  const handleCardClick = () => {
    navigate(`/products/${product.productId}`);
  };

  // 찜 해제 성공 콜백
  const handleFavoriteToggle = (isAdding: boolean) => {
    // 삭제 성공 시 (isAdding: false)
    if (!isAdding) {
      // Redux 상태를 새로고침하여 목록에서 아이템 제거
      dispatch(fetchFavorites());
    }
  };

  return (
    // ✅ [스타일 적용] SearchResultsCard와 동일한 크기 스타일 적용
    <div
      className="w-40 md:w-[200px] lg:w-[238px] h-auto flex flex-col gap-y-2 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* ✅ [스타일 적용] 이미지 크기 적용 */}
      <img
        src={product.productThumbnail || ""} // 필드명 통일 및 안전 접근
        alt={product.productName || "상품 이미지"}
        className="w-40 h-40 md:w-[200px] md:h-[200px] lg:w-[238px] lg:h-[238px] object-cover rounded-lg"
      />
      <div className="flex flex-col gap-y-[5px] font-pretendard text-main-text">
        <div className="flex flex-row justify-between items-center">
          <p className="font-light text-[10px] md:text-xs line-clamp-2 flex-1">
            {product.productName || "상품명 없음"}
          </p>
          <FavoriteBtn
            productId={product.productId}
            initialIsFavorite={initialIsFavorite} // 항상 찜된 상태
            onCountChange={handleFavoriteToggle}
          />
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
