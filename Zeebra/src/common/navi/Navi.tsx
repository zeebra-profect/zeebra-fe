import { Link } from "react-router-dom";

function Navi() {
  return (
    <div className="flex flex-row lg:flex-col w-full lg:w-[250px] h-auto lg:h-[530px] font-pretendard font-light text-main-text text-base md:text-lg gap-x-4 gap-y-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 flex-wrap">
      <Link to="info">
        <p className="hover:font-bold cursor-pointer whitespace-nowrap">메인</p>
      </Link>
      <Link to="orderhistory">
        <p className="hover:font-bold cursor-pointer whitespace-nowrap">
          구매 내역
        </p>
      </Link>
      <p className="hover:font-bold cursor-pointer whitespace-nowrap">
        판매 내역
      </p>
      <p className="hover:font-bold cursor-pointer whitespace-nowrap">
        관심 상품
      </p>
      <p className="hover:font-bold cursor-pointer whitespace-nowrap">
        정산 관리
      </p>
      <p className="hover:font-bold cursor-pointer whitespace-nowrap">
        쿠폰/포인트
      </p>
      <p className="hover:font-bold cursor-pointer whitespace-nowrap">
        리뷰 관리
      </p>
      <p className="hover:font-bold cursor-pointer whitespace-nowrap">
        공지사항
      </p>
      <p className="hover:font-bold cursor-pointer whitespace-nowrap">
        회원탈퇴
      </p>
    </div>
  );
}

export default Navi;
