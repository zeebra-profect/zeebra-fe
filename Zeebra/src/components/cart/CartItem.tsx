import type { CartItemRes } from "@/utils/cart";
import { useAppDispatch } from "@/store/hooks";
import { deleteCartItem } from "@/utils/cart";
import { fetchCartList } from "@/store/cartSlice"; // Redux 상태 갱신용

interface CartItemProps {
  item: CartItemRes;
}

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  // 금액 계산 및 포맷
  const formatPrice = (price: number) => price.toLocaleString("ko-KR") + "원";

  // 🗑️ 아이템 삭제 핸들러
  const handleDelete = async () => {
    if (
      !window.confirm(
        `'${item.productName}' 상품을 장바구니에서 삭제하시겠습니까?`
      )
    )
      return;

    try {
      // 1. 삭제 API 호출
      await deleteCartItem(item.productOptionId);

      // 2. Redux 상태 갱신 (목록에서 아이템 제거)
      // 💡 이 과정에서 500 오류가 났던 getCartList가 다시 호출됩니다.
      await dispatch(fetchCartList()).unwrap();
    } catch (error) {
      console.error("장바구니 항목 삭제 실패:", error);
      alert("상품 삭제에 실패했습니다. (서버 문제 확인 필요)");
    }
  };

  // ➕➖ 수량 변경 핸들러
  // const handleQuantityChange = async (change: 1 | -1) => {
  //   const newQuantity = item.quantity + change;
  //   if (newQuantity < 1 || newQuantity > 99) return;
  //   if (item.isSoldOut) return;

  //   try {
  //     // 1. 수량 변경 API 호출
  //     await updateCartQuantity(item.productOptionId, newQuantity);

  //     // 2. Redux 상태 갱신 (변경된 수량과 금액 반영)
  //     await dispatch(fetchCartList()).unwrap();
  //   } catch (error) {
  //     console.error("수량 변경 실패:", error);
  //     alert("수량 변경에 실패했습니다.");
  //   }
  // };

  // 옵션 문자열 생성 (예: "색상: 하양 / 사이즈: L")
  const optionString = item.options
    .map((opt) => `${opt.name}: ${opt.value}`)
    .join(" / ");

  return (
    <>
      <hr className="text-grey" />
      <div className="w-full max-h-[700px] p-5 flex flex-col text-main-text">
        <div className="flex flex-row justify-between items-center mb-2.5">
          {/* 체크박스 ID를 고유하게 설정 */}
          <input
            type="checkbox"
            className="input-checkBox"
            id={`cart-item-${item.productOptionId}`}
          />
          <button className="button-smallButton" onClick={handleDelete}>
            삭제
          </button>
        </div>

        <div className="flex flex-row w-full max-h-[350px] justify-between">
          {/* 상품 정보 영역 */}
          <div className="flex flex-row gap-x-2.5 items-center">
            <div className="w-15 h-15 sm:w-25 sm:h-25 bg-gray-100">
              {/* ✅ 이미지 넣기 */}
              <img
                src={item.thumbnail || "fallback-image-url"}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* ✅ 정보 부분 바인딩 */}
            <div className="flex flex-col text-left">
              <p className="font-normal text-lg line-clamp-2">
                {item.productName}
              </p>
              <pre className="font-light text-sm/4">{optionString}</pre>

              {/* ✅ 수량 컨트롤러 (수량은 정보 부분에 배치) */}
              {/* <div className="flex items-center mt-2 border border-grey rounded w-fit">
                <button
                  className="w-6 h-6 text-xl text-center"
                  disabled={item.quantity <= 1 || item.isSoldOut}
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className="px-2 text-base">{item.quantity}</span>
                <button
                  className="w-6 h-6 text-xl text-center"
                  disabled={item.isSoldOut}
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div> */}

              {/* ⚠️ 품절 표시 */}
              {item.isSoldOut && (
                <p className="text-sm font-bold text-red-500 mt-1">품절</p>
              )}
            </div>
          </div>

          {/* ✅ 금액 부분 바인딩 */}
          <div className="flex flex-row gap-x-3 items-end flex-shrink-0">
            <div className="flex flex-col text-right">
              <p className="font-normal text-sm">상품 금액</p>
              <p className="font-light text-xs">현재 최저가</p>
              {/* 총 금액 필드는 디자인에 없으나, 추가한다면 itemTotalPrice 사용 */}
            </div>
            <div className="flex flex-col text-right">
              <p className="font-normal text-sm">
                {formatPrice(item.snapShotPrice)}
              </p>
              <p className="font-light text-xs">
                {formatPrice(item.currentLowestPrice)}
              </p>
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
