import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDetail } from "@/utils/product";
import OptionButton from "./OptionButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductOption } from "@/store/productSlice";
import { addToCart } from "@/store/cartSlice"; // ✅ 장바구니 추가 Thunk 임포트
import { v4 as uuidv4 } from "uuid";
import { createOrder } from "@/store/orderSlice";
import type { OrderReq } from "@/utils/order";

function createUUID() {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[:.]/g, "-");
  const id = `${dateStr}_${uuidv4()}`;

  return id;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productInfo: ProductDetail["data"] | undefined;
  selectedColor: string;
}

function PurchaseModal({
  isOpen,
  onClose,
  productInfo,
  selectedColor,
}: ModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 옵션 관련
  const options = useAppSelector(
    (state) => state.product.productOption?.data.sizeOptionResponses
  );
  const currentColor = productInfo?.colorOptionResponses.find(
    (option: { colorOptionNameId: number; colorValue: string }) =>
      option.colorValue === selectedColor
  );

  // 로컬 상태
  const [checkedButton, setCheckedButton] = useState<number | null>(null); // 선택된 productOptionId
  const [isAddingToCart, setIsAddingToCart] = useState(false); // 장바구니 로딩 상태

  // 색상 변경/초기 로드 시 사이즈 옵션 가져오기
  useEffect(() => {
    if (productInfo?.productId && currentColor?.colorOptionNameId) {
      dispatch(
        fetchProductOption({
          productId: productInfo?.productId,
          colorOptionNameId: currentColor.colorOptionNameId,
        })
      );
    }
    console.log("currentColor: ", currentColor);
  }, [currentColor, selectedColor]);


  // Options 상태 변경 로깅 (디버깅용)
  useEffect(() => {
    // console.log("options: ", options);
  }, [options]);

  // -----------------------------------------------------------
  // 🛒 장바구니 담기 핸들러
  // -----------------------------------------------------------
  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    if (!checkedButton) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    // 🚨 수량은 기본 1개로 가정합니다. (필요하다면 수량 선택 로직 추가)
    const productOptionId = checkedButton;

    setIsAddingToCart(true);
    try {
      // ✅ addToCart Thunk 디스패치 (내부적으로 getCartList 갱신까지 처리)
      await dispatch(addToCart(productOptionId)).unwrap();

      alert("상품이 장바구니에 담겼습니다!");
      onClose(); // 성공 후 모달 닫기
    } catch (error) {
      console.error("❌ 장바구니 담기 실패:", error);
      alert("장바구니 담기에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsAddingToCart(false);
    }
  };
  // 주문 관련
  const onClickCreateOrder = async () => {
    const form: OrderReq = {
      clientRequestId: createUUID(),
      productOptionId: Number(checkedButton),
    };

    try {
      const result = await dispatch(createOrder(form)).unwrap();
      console.log("result", result);
      const orderId = result.data.order.orderId;

      if (orderId) {
        navigate(`/orders/${orderId}`, {
          state: {
            productInfo: Array.isArray(productInfo)
              ? productInfo
              : [productInfo],
            order: result,
          },
        });
      } else {
        console.error("orderId를 찾을 수 없습니다");
      }
    } catch (error) {
      console.error("주문 생성 실패:", error);
    }
  };

  if (!isOpen) return null;

  const isOptionSelected = checkedButton !== null;
  const isButtonDisabled = !isOptionSelected || isAddingToCart;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-white rounded-xl p-5 max-w-md w-full mx-4 h-auto gap-y-2.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <p className="font-bold text-lg">구매하기</p>
          <p className="font-light text-xs">(가격단위:원)</p>
        </div>
        <div className="flex flex-row gap-x-2.5 items-center">
          <img className="w-17 h-17" src={productInfo?.productThumbnail} />
          <div className="text-left">
            <p className="font-normal text-lg">{productInfo?.productName}</p>
            <p className="font-light text-sm/4">
              {productInfo?.productDescription}
            </p>
            <p className="font-light text-sm/4">{selectedColor}</p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-x-3 gap-y-2 overflow-y-auto max-h-[200px] justify-center scrollbar">
          {options?.map((option) => (
            <OptionButton
              size={String(option.sizeValue)}
              price={option.lowPriceOfSize}
              key={option.productOptionId}
              onClick={() => setCheckedButton(option.productOptionId)}
              isSelected={checkedButton === option.productOptionId}
            />
          ))}
        </div>
        <div className="mt-5 flex flex-row flex-2">
          <div className="flex flex-col sm:flex-row gap-y-2 gap-x-2 md:gap-x-2.5 w-full">
            {/* 1. 장바구니 담기 버튼 (수정 없음, 단지 재확인) */}
            <button
              className="button-productDetail2 bg-main-text justify-center text-base md:text-lg font-bold" // ✅ 텍스트 스타일을 버튼 자체에 적용
              onClick={handleAddToCart} // ✅ 핸들러 연결
              disabled={isButtonDisabled}
            >
              {isAddingToCart ? "담는 중..." : "장바구니 담기"}{" "}
              {/* ❌ p 태그 제거 */}
            </button>
            {/* 2. 즉시 구매하기 버튼 (onClick을 p 태그에서 button 태그로 이동 권장) */}
            <button
              className="button-productDetail2 bg-orange justify-center text-base md:text-lg font-bold"
              onClick={() => navigate("/order")} // ✅ navigate 핸들러를 button에 직접 연결 (권장)
            >
              즉시 구매하기 {/* ❌ p 태그 제거 */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;
