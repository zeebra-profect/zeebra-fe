function CartItem() {
  return (
    <>
      <hr className="text-grey"/>
      <div className="w-full max-h-[700px] p-5 flex flex-col text-main-text">
        <div className="flex flex-row justify-between items-center mb-2.5">
          <input type="checkbox" className="input-checkBox" id="all" />
          <button className="button-smallButton">삭제</button>
        </div>
        <div className="flex flex-row w-full max-h-[350px] justify-between">
          <div className="flex flex-row gap-x-2.5 items-center">
            <div className="w-15 h-15 sm:w-25 sm:h-25 bg-gray-100">
              {/* 이미지 넣기 */}
            </div>
            {/* 정보 부분 */}
            <div className="flex flex-col text-left">
              <p className="font-normal text-lg">
                Nike Air Force 1 ‘07 Low White
              </p>
              <pre className="font-light text-sm/4">
                {`나이키 에어포스 1 ‘07 로우 화이트
315122-111/CW2288-111`}
              </pre>
              <p className="font-bold text-sm">255</p>
            </div>
          </div>
          {/* 금액 부분 */}
          <div className="flex flex-row gap-x-3 items-end">
            <div className="flex flex-col text-right">
              <p className="font-normal text-sm">상품금액</p>
              <p className="font-light text-xs">배송비</p>
              <p className="font-bold text-sm/loose">총 금액</p>
            </div>
            <div className="flex flex-col text-right">
              <p className="font-normal text-sm">141,000원</p>
              <p className="font-light text-xs">5,000원</p>
              <p className="font-bold text-sm/loose">146,000원</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-1 mt-5">
          <button className="button-payment flex-1 h-9 sm:h-10 md:h-10 lg:h-10 bg-main-text">
            옵션 변경
          </button>
          <button className="button-payment flex-1 h-9 sm:h-10 md:h-10 lg:h-10 bg-orange">
            바로 주문
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
