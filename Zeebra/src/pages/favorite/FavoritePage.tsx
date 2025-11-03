import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectFavorites,
  selectFavoritesLoading,
  fetchFavorites,
} from "@/store/favoriteSlice";
// ✅ FavoriteItem 대신, 카드 형태를 렌더링할 새로운 컴포넌트 이름을 사용합니다.
import FavoriteCard from "@/pages/favorite/FavoriteCard";
import { useEffect } from "react";
import type { FavoriteRes } from "@/utils/favorite"; // FavoriteRes를 사용합니다.

function FavoritePage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites) as FavoriteRes[];
  const loading = useAppSelector(selectFavoritesLoading); // ✅ 이 상태를 활용

  // 데이터 로딩 (빈 목록일 경우 다시 시도)
  useEffect(() => {
    // App.tsx에서 이미 초기 로드하므로, 여기에 로직을 두는 것은 선택 사항입니다.
    if (favorites.length === 0 && !loading) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, favorites.length, loading]);

  // --- UI 렌더링 ---

  if (loading) {
    return (
      <div className="text-center p-20">
        관심 상품 목록을 불러오는 중입니다...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center p-20">아직 찜한 상품이 없습니다. 💔</div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8">
        내 관심 목록 ({favorites.length}개)
      </h2>

      {/* ✅ 그리드 레이아웃 적용 */}
      <div
        className="grid gap-x-5 gap-y-10"
        // 모바일: 2개, 태블릿: 3개, 데스크탑: 4개, 대형 스크린: 5개 (max-5)
        // Tailwind에서는 기본 4개가 표준이지만, 5개(xl:grid-cols-5)를 원하시면 이렇게 적용합니다.
        // Tailwind에 5개 컬럼 클래스가 정의되어 있어야 합니다.
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
        // Tailwind 기본 클래스 예시: grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
      >
        {favorites.map((item) => (
          <FavoriteCard
            key={item.favoriteProductId}
            product={item} // FavoriteRes 객체를 전달합니다.
            // 🚨 FavoriteCard에서 찜 삭제 시 Redux 재호출이 필요합니다.
          />
        ))}
      </div>
      <hr className="text-grey mt-5" />
    </div>
  );
}

export default FavoritePage;
