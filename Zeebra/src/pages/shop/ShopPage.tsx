import { Outlet } from "react-router-dom"; // ✨ Outlet 임포트 필수 ✨

import ShopCategory from "../../components/category/ShopCategory";
import SubCategory from "../../components/category/SubCategory";
import SortBtn from "../../components/btn/SortBtn";
import SortFilter from "../../components/filter/SortFilter";
// ShopContent는 이제 /shopPage 경로 자체의 메인 콘텐츠가 되거나,
// 혹은 모든 하위 페이지의 공통 부분이 아니라면 제거되어야 합니다.

function ShopPage() {
  return (
    <div className="flex flex-col  w-full lg:w-[1200px]  ">
      {/* 1. 공통으로 유지될 UI (헤더, 카테고리 필터 등) */}
      <div className="flex flex-col items-center gap-y-6">
        <h1 className="text-2xl font-semibold">SHOP</h1>
        <ShopCategory />
        <SubCategory />
        <SortBtn />
      </div>
      <SortFilter />

      {/* 2. ✨ 핵심: Outlet 위치 ✨ */}
      {/* 이 위치에 /shopPage/results 경로의 SearchResultsPage 컴포넌트가 렌더링됩니다. */}
      <Outlet />

      {/* 3. ShopContent의 역할 변경: */}
      {/* 만약 ShopContent가 검색 결과 페이지와 ShopPage 메인 모두에서 사용된다면,
         공통 컴포넌트로 Outlet 위/아래에 두거나, 각 자식 컴포넌트 내부에 포함시켜야 합니다.
         만약 ShopContent가 메인(/shopPage)에서만 사용된다면,
         ShopPage의 자식 라우트 중 index 라우트(<Route index element={<ShopContent />} />)로 옮겨야 합니다.
      */}
      {/* <ShopContent /> */}
    </div>
  );
}

export default ShopPage;
