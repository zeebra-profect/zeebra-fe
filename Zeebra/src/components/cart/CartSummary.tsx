import { useAppSelector } from "@/store/hooks";
import { selectCartData } from "@/store/cartSlice"; // ✅ Redux에서 cartData를 가져오는 셀렉터 import
import type { CartDataRes } from "@/utils/cart"; // CartDataRes 타입 import

function CartSummary() {
  // ✅ Redux Store에서 장바구니 전체 데이터 구독
  const cartData: CartDataRes | null = useAppSelector(selectCartData);

  // 총 결제 금액 계산: 총 상품 금액 (totalPrice) + 배송비
  // ⚠️ DTO에 배송비가 없으므로 임시로 5,000원을 추가하겠습니다.
  const DELIVERY_FEE = 5000;

  // 데이터가 로드되지 않았거나 항목이 없으면 0으로 처리
  const subtotal = cartData?.totalPrice ?? 0;

  // 총 결제 금액 (상품 총액 + 배송비)
  const estimatedTotal = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  // 금액 포맷 함수
  const formatPrice = (price: number) => price.toLocaleString("ko-KR") + "원";

  return (
    <div className="flex flex-col mt-2.5 p-5 border border-grey rounded-xl shadow-lg">
      {" "}
      {/* 스타일 추가 */}
      <h3 className="font-bold text-xl mb-3 border-b pb-2">결제 정보</h3>
      {/* 1. 상품 금액 합계 */}
      <div className="flex flex-row justify-between font-normal text-sm text-gray-700 mt-2">
        <p>총 상품 금액</p>
        <p>{formatPrice(subtotal)}</p>
      </div>
      {/* 2. 배송비 */}
      <div className="flex flex-row justify-between font-normal text-sm text-gray-700 mt-1">
        <p>배송비</p>
        <p>{subtotal > 0 ? formatPrice(DELIVERY_FEE) : "0원"}</p>
      </div>
      <hr className="my-3 text-grey" />
      {/* 3. 예상 결제 금액 (UI 원형 유지) */}
      <div className="flex flex-row justify-between font-bold text-lg mt-3 text-main-text">
        <p>예상 결제 금액</p>
        <p>{formatPrice(estimatedTotal)}</p>
      </div>
      {/* 4. 주문 버튼 영역 (선택 사항) */}
      <button
        className="bg-orange text-white font-bold py-3 mt-5 rounded-lg text-lg"
        disabled={subtotal === 0}
      >
        총 {cartData?.totalQuantity ?? 0}개 상품 주문하기
      </button>
    </div>
  );
}

export default CartSummary;
{
  /* <p className="text-left ">선택 주문정보</p>
      <div className="flex flex-row justify-between font-semibold text-sm mt-4.5">
        <p className="text-left text-grey2 font-light">총 상품금액</p>
        <p className="text-right font-medium">123,456원</p>
      </div>
      <div className="flex flex-row justify-between font-semibold text-sm/9">
        <p className="text-left text-grey2 font-light">예상 결제 금액</p>
        <p className="text-right font-medium">20,000원</p>
      </div>
      <div className="flex flex-row justify-between font-semibold text-sm">
        <p className="text-left text-grey2 font-light">총 배송비</p>
        <p className="text-right font-medium">15,000원</p>
      </div>
      <div className="h-0.5 bg-main-text mt-3"></div> */
}
