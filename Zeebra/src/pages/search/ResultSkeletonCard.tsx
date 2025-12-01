export default function ResultSkeletonCard() {
  return (
    // 1. 실제 카드와 동일한 너비/높이/패딩 클래스 유지
    <div className="w-40 md:w-[200px] lg:w-[238px] h-auto flex flex-col gap-y-2 mb-4">
      {/* 2. 이미지 영역: 회색 박스 + 깜빡임 */}
      <div className="w-40 h-40 md:w-[200px] md:h-[200px] lg:w-[238px] lg:h-[238px] bg-gray-200 rounded-lg animate-pulse" />

      {/* 3. 텍스트 영역: 글자 대신 막대기(div)로 표현 */}
      <div className="flex flex-col gap-y-[5px] px-3 w-full">
        {/* 첫 번째 줄 (브랜드명 등) */}
        <div className="flex flex-row justify-between items-center h-4">
          <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* 두 번째 줄 (상품명) */}
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-1" />

        {/* 세 번째 줄 (가격) */}
        <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse mt-1" />
      </div>
    </div>
  );
}
