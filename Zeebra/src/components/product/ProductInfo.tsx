import like from "../../img/icons/like.png";
import GroupChat from "../chat/GroupChat";

function ProductInfo() {
  return (
    <div className="flex flex-col gap-y-[20px] w-[519px]">
      <div className="flex flex-row justify-between">
        {/* 텍스트 부분 */}
        <div className="flex flex-col font-pretendard text-main-text">
          <p className="text-sm font-normal">즉시 구매가</p>
          <p className="text-[26px] font-bold mb-[20px]">110,000원</p>
          <p className="text-lg font-normal">Nike Air Force 1 ‘07 Low White</p>
          <p className="text-sm font-light text-grey2 mb-[10px]">
            나이키 에어포스 1 ‘07 로우 화이트
          </p>
          <p className="text-xs font-light">리뷰 21,515</p>
        </div>
        {/* 왼쪽 3버튼 부분 */}
        <div className="flex flex-col font-pretendard text-main-text gap-y-[13px]">
          <button className="button-productDetail">브랜드 검색</button>
          <button className="button-productDetail">
            <img src={like} className="w-[15px] h-[13px]" /> 관심 23.6만
          </button>
          <button className="button-productDetail">사이즈 선택</button>
        </div>
      </div>
      {/* 구매/판매버튼 */}
      <div className="flex flex-col gap-y-[40px]">
        <div className="flex flex-row gap-x-[10px]">
          <button className="button-ProductDetail2 bg-orange">
            <p className="text-lg font-bold">구매</p>
            <div className="h-[50px] w-px bg-grey"></div>
            <div className="flex flex-col m-0 text-left">
              <p className="text-base font-bold">110,000원</p>
              <p className="text-xs font-normal">즉시 구매가</p>
            </div>
          </button>
          <button className="button-ProductDetail2 bg-green">
            <p className="text-lg font-bold">판매</p>
            <div className="h-[50px] w-px bg-grey"></div>
            <div className="flex flex-col m-0 text-left">
              <p className="text-base font-bold">115,000원</p>
              <p className="text-xs font-normal">즉시 판매가</p>
            </div>
          </button>
        </div>
      </div>
              <hr className="w-[520px] text-grey" />
        <GroupChat/>
    </div>
  );
}

export default ProductInfo;
