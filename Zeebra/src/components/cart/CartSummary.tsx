function CartSummary() {
  return (
    <div className="flex flex-col mt-2.5">
      <p className="text-left ">선택 주문정보</p>
      <div className="flex flex-row justify-between font-semibold text-sm mt-4.5">
        <p className="text-left text-grey2 font-light">총 상품금액</p>
        <p className="text-right font-medium">123,456원</p>
      </div>
      <div className="flex flex-row justify-between font-semibold text-sm/9">
        <p className="text-left text-grey2 font-light">총 수수료</p>
        <p className="text-right font-medium">20,000원</p>
      </div>
      <div className="flex flex-row justify-between font-semibold text-sm">
        <p className="text-left text-grey2 font-light">총 배송비</p>
        <p className="text-right font-medium">15,000원</p>
      </div>
      <div className="h-0.5 bg-main-text mt-3"></div>
      <div className="flex flex-row justify-between font-bold text-lg mt-3">
        <p>
            총 결제금액
        </p>
        <p>
            111,111원
        </p>
      </div>
    </div>

  );
}

export default CartSummary;
