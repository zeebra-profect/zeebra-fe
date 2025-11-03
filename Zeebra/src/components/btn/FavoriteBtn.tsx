import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchFavorites } from "@/store/favoriteSlice";
import { addFavorite, deleteFavorite } from "@/utils/favorite";
import { HeartIcon } from "@/img/icons/HeartIcon";
import { AxiosError } from "axios"; // ✅ AxiosError import

interface FavoriteButtonProps {
  productId: number;
  initialIsFavorite?: boolean;
  size?: number;
  className?: string;
  onToggle?: (isFavorite: boolean) => void;
  onCountChange?: (isAdding: boolean) => void;
}

function FavoriteBtn({
  productId,
  initialIsFavorite = false,
  size = 24,
  className = "",
  onToggle,
  onCountChange,
}: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
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

    try {
      if (previousState) {
        // ✅ 삭제 로직
        console.log("🗑️ 삭제 시도 - productId:", productId);
        await deleteFavorite(productId);
        console.log("✅ 찜 삭제 API 성공");

        setIsFavorite(false);
        onToggle?.(false);
        onCountChange?.(false);

        // ✅ Redux 업데이트
        console.log("🔄 Redux 상태 업데이트 시작...");
        const updatedFavorites = await dispatch(fetchFavorites()).unwrap();
        console.log("✅ Redux 상태 업데이트 완료:", updatedFavorites);
        console.log("✅ 업데이트된 개수:", updatedFavorites.length);
      } else {
        // ✅ 추가 로직
        console.log("➕ 추가 시도 - productId:", productId);
        const result = await addFavorite(productId);
        console.log("✅ 찜 추가 API 성공:", result);

        setIsFavorite(true);
        onToggle?.(true);
        onCountChange?.(true);

        // ✅ Redux 업데이트
        console.log("🔄 Redux 상태 업데이트 시작...");
        const updatedFavorites = await dispatch(fetchFavorites()).unwrap();
        console.log("✅ Redux 상태 업데이트 완료:", updatedFavorites);
        console.log("✅ 업데이트된 개수:", updatedFavorites.length);
      }
    } catch (error) {
      // 👈 error: any 제거

      console.error("❌ 찜 처리 실패:", error);

      // ✅ AxiosError 타입 체크를 통해 안전하게 response에 접근
      if (error instanceof AxiosError) {
        console.error("❌ 에러 상세:", error.response?.data);
      } else {
        console.error("❌ 에러 상세 (비 Axios 오류):", error);
      }

      setIsFavorite(previousState); // 롤백
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
