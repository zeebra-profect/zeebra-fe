import like from "../../img/icons/like.png";
import GroupChat from "../chat/GroupChat";

function ProductInfo() {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-[20px] w-full lg:w-[519px] px-4 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between gap-y-4">
        {/* 텍스트 부분 */}
        <div className="flex flex-col font-pretendard text-main-text">
          <p className="text-xs md:text-sm font-normal">즉시 구매가</p>
          <p className="text-xl md:text-[26px] font-bold mb-3 md:mb-[20px]">110,000원</p>
          <p className="text-base md:text-lg font-normal">Nike Air Force 1 '07 Low White</p>
          <p className="text-xs md:text-sm font-light text-grey2 mb-2 md:mb-[10px]">
            나이키 에어포스 1 '07 로우 화이트
          </p>
          <p className="text-xs font-light">리뷰 21,515</p>
        </div>
        {/* 왼쪽 3버튼 부분 */}
        <div className="flex flex-row sm:flex-col font-pretendard text-main-text gap-x-2 gap-y-2 md:gap-y-[13px]">
          <button className="button-productDetail flex-1 sm:flex-none">브랜드 검색</button>
          <button className="button-productDetail flex-1 sm:flex-none">
            <img src={like} className="w-[15px] h-[13px]" /> 관심 23.6만
          </button>
          <button className="button-productDetail flex-1 sm:flex-none">사이즈 선택</button>
        </div>
      </div>
      {/* 구매/판매버튼 */}
      <div className="flex flex-col gap-y-6 md:gap-y-[40px]">
        <div className="flex flex-col sm:flex-row gap-y-2 gap-x-2 md:gap-x-[10px]">
          <button className="button-ProductDetail2 bg-orange flex-1">
            <p className="text-base md:text-lg font-bold">구매</p>
            <div className="h-[50px] w-px bg-grey"></div>
            <div className="flex flex-col m-0 text-left">
              <p className="text-sm md:text-base font-bold">110,000원</p>
              <p className="text-xs font-normal">즉시 구매가</p>
            </div>
          </button>
          <button className="button-ProductDetail2 bg-green flex-1">
            <p className="text-base md:text-lg font-bold">판매</p>
            <div className="h-[50px] w-px bg-grey"></div>
            <div className="flex flex-col m-0 text-left">
              <p className="text-sm md:text-base font-bold">115,000원</p>
              <p className="text-xs font-normal">즉시 판매가</p>
            </div>
          </button>
        </div>
      </div>
      <hr className="w-full text-grey" />
      <GroupChat/>
    </div>
  );
}

export default ProductInfo;