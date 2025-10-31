import { useState, useEffect } from "react";
import { addFavorite, deleteFavorite } from "@/utils/favorite";
import { HeartIcon } from "@/img/icons/HeartIcon";

interface FavoriteButtonProps {
  productId: number;
  initialIsFavorite?: boolean;
  size?: number;
  className?: string;
  onToggle?: (isFavorite: boolean) => void;
}

function FavoriteBtn({
  productId,
  initialIsFavorite = false,
  size = 24,
  className = "",
  onToggle,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    const previousState = isFavorite;
    setIsLoading(true);
    setIsFavorite(!isFavorite); // Optimistic update

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
      setIsFavorite(previousState); // 실패시 롤백
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
    </button>
  );
}

export default FavoriteBtn;
