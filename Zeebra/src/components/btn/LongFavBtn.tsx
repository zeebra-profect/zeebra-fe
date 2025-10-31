import { useState, useEffect } from "react";
import { addFavorite, deleteFavorite } from "@/utils/favorite";
import { HeartIcon } from "@/img/icons/HeartIcon";

interface FavoriteButtonProps {
  productId: number;
  initialIsFavorite?: boolean;
  initialFavoriteCount?: number; // 초기 관심수
  size?: number;
  className?: string;
  onToggle?: (isFavorite: boolean) => void;
}

function LongFavBtn({
  productId,
  initialIsFavorite = false,
  initialFavoriteCount = 0,
  size = 24,
  className = "",
  onToggle,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
    setFavoriteCount(initialFavoriteCount);
  }, [initialIsFavorite, initialFavoriteCount]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    const previousState = isFavorite;
    const previousCount = favoriteCount;

    setIsLoading(true);

    // Optimistic update (즉시 UI 변경)
    setIsFavorite(!isFavorite);
    setFavoriteCount((prev) => (isFavorite ? prev - 1 : prev + 1));

    try {
      if (isFavorite) {
        await deleteFavorite(productId);
        onToggle?.(false);
      } else {
        const result = await addFavorite(productId);
        console.log("찜 추가됨:", result.favoriteProductId);
        onToggle?.(true);
      }
    } catch (error) {
      console.error("찜 처리 실패:", error);
      // 실패시 롤백
      setIsFavorite(previousState);
      setFavoriteCount(previousCount);
      alert("찜 처리에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        button-productDetail flex-1 sm:flex-none
        flex items-center justify-center gap-2
        p-2 rounded-full transition-all duration-200
        hover:bg-gray-100 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label={isFavorite ? "찜 취소" : "찜하기"}
    >
      <HeartIcon
        filled={isFavorite}
        size={size}
        className={`
          transition-all duration-200
          ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}
        `}
      />
      <span
        className={`
        text-sm font-medium
        ${isFavorite ? "text-red-500" : "text-gray-600"}
      `}
      >
        관심 {favoriteCount.toLocaleString()}
      </span>
    </button>
  );
}

export default LongFavBtn;
