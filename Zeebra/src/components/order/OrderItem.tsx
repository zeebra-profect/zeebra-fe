import Coupon from "./Coupon";

function OrderItem() {
  return (
    <>
      <hr className="text-grey" />
      <div className="w-full max-h-[700px] p-5 flex flex-col text-main-text">
        <Coupon />
        <div className="flex flex-row items-center">
          <img className="w-23 h-20" />
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-col ml-3 text-left">
              <p className="font-normal text-lg">
                Nike Air Force 1 ‘07 Low White
              </p>
              <pre className="font-light text-sm/4">
                {`나이키 에어포스 1 ‘07 로우 화이트
315122-111/CW2288-111`}
              </pre>
              <p className="font-bold text-sm">255</p>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col ml-3 text-right">
                <p className="font-normal text-sm">상품금액</p>
                <p className="font-light text-grey2 text-xs/4">배송비</p>
                <p className="font-light text-grey2 text-xs">수수료</p>
                <p className="font-light text-grey2 text-xs">쿠폰 할인</p>
                <p className="font-bold text-sm">결제 금액</p>
              </div>
              <div className="flex flex-col ml-3 text-right">
                <p className="font-normal text-sm">141,000원</p>
                <p className="font-light text-grey2 text-xs/4">5,000원</p>
                <p className="font-light text-grey2 text-xs">3.000원</p>
                <p className="font-light text-grey2 text-xs">-</p>
                <p className="font-bold text-sm">111,111원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
