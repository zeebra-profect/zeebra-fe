// SearchResultsPage.tsx (새로 만들어야 함)
// import { useLocation } from "react-router-dom";

function SearchResultsPage() {
  //   const location = useLocation();
  // 💡 쿼리 파라미터에서 keyword를 추출하여 API 재호출하거나,
  // state에서 데이터를 받아와서 Product2List에 전달하는 로직이 필요합니다.

  // 임시로 URL에서 키워드만 추출해 봅니다.
  // const queryParams = new URLSearchParams(location.search);
  // const keyword = queryParams.get("keyword");

  return (
    <div className="flex flex-row gap-x-3 md:gap-x-1 lg:gap-x-0.5 gap-y-2 md:gap-y-5 w-full max-w-[1200px] flex-wrap justify-center md:justify-start">
      {/* product2의 형식을 지닌 컴포넌트로 만들어야함 */}
    </div>
  );
}

export default SearchResultsPage;
