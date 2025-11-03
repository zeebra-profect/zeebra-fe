import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchCartList,
  selectCartData,
  selectCartLoading,
} from "@/store/cartSlice";
import { useEffect } from "react";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

function CartPage() {
  const dispatch = useAppDispatch();

  // ✅ Redux Store에서 장바구니 전체 데이터와 로딩 상태 구독
  const cartData = useAppSelector(selectCartData);
  const isLoading = useAppSelector(selectCartLoading);

  // ✅ 컴포넌트 마운트 시 장바구니 목록 로드 요청
  useEffect(() => {
    // 데이터가 없거나 (null) 로딩 중이 아닐 때만 목록 조회 요청
    if (cartData === null && !isLoading) {
      dispatch(fetchCartList());
    }
  }, [dispatch, cartData, isLoading]);

  // -----------------------------------------------------------
  // 1. 로딩/데이터 상태 처리
  // -----------------------------------------------------------

  // 1. 로딩 상태
  if (isLoading) {
    return (
      <div className="text-center p-20">
        장바구니 정보를 불러오는 중입니다...
      </div>
    );
  }

  // 2. 장바구니 항목 추출
  const cartItems = cartData?.cartItems || [];

  // 3. 장바구니가 비어 있을 때
  if (cartItems.length === 0) {
    return (
      <div className="text-center p-20">
        장바구니에 담긴 상품이 없습니다. 텅!
      </div>
    );
  }

  // -----------------------------------------------------------
  // 2. 렌더링
  // -----------------------------------------------------------

  return (
    <>
      <div className="flex flex-col w-full max-w-[660px] text-center text-main-text">
        <p className="font-extrabold text-3xl">장바구니</p>

        {/* 선택/삭제 버튼 영역 */}
        <div className="flex flex-row items-center justify-between mt-10 pl-5 pr-5 mb-2.5">
          <div className="flex flex-row items-center gap-x-[5px]">
            <input type="checkbox" className="input-checkBox" id="all" />
            <label className="text-sm font-normal" htmlFor="all">
              전체선택
            </label>
          </div>
          <button className="button-smallButton">선택 삭제</button>
        </div>

        {/* ✅ 장바구니 아이템 목록 (CartItem 컴포넌트 반복) */}
        <div className="flex flex-col">
          {cartItems.map((item) => (
            // 💡 CartItem 컴포넌트에 item 데이터를 전달
            <CartItem key={item.productOptionId} item={item} />
          ))}
        </div>

        <hr className="text-grey" />

        {/* ✅ 장바구니 요약 정보 (CartSummary는 Redux에서 데이터를 직접 가져옴) */}
        {/* ⚠️ 기존의 <CartSummary/> 위치를 유지하며 렌더링 */}
        <CartSummary />
      </div>
    </>
  );
}

export default CartPage;
