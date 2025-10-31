import testImg from "../../img/test/testImg.png";
import FavoriteBtn from "@/components/btn/FavoriteBtn";

function Product2() {
  return (
    <div className="w-40 md:w-[200px] lg:w-[238px] h-auto flex flex-col gap-y-2 cursor-pointer">
      <img
        src={testImg}
        className="w-40 h-40 md:w-[200px] md:h-[200px] lg:w-[238px] lg:h-[238px] object-cover rounded-lg"
      />
      <div className="flex flex-col gap-y-[5px] font-pretendard text-main-text">
        <div className="flex flex-row justify-between items-center">
          <p className="font-light text-[10px] md:text-xs line-clamp-2 flex-1">
            무신사 스탠다드 시티 레저 후드 라이트 다...
          </p>
          {/* <button className="shrink-0 ml-1">
                        <img src={like} className="w-[13px] h-[11px] md:w-[15px] md:h-[13px]" />
                    </button> */}
          <FavoriteBtn productId={1} />
          {/* // 위에 고쳐야함 */}
        </div>
        <p className="font-semibold text-[10px] md:text-xs">111,000원</p>
        <p className="font-light text-[9px] md:text-xs text-grey2">
          관심 2.4만 · 리뷰 519 · 거래 3,815
        </p>
      </div>
    </div>
  );
}

export default Product2;
