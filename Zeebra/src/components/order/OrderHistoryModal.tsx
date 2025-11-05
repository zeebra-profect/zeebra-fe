import OrderItemDisplay from "./OrderItemDisplay";
import OrderSummary from "./OrderSummary";
import testImg from "../../img/test/nike4.webp";
import { useState, useEffect } from "react";
import { type OrderInfo } from "@/utils/order";

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  status: "1" | "2" | "3";
  orderData?: OrderInfo;
}

function OrderHistoryModal({
  isOpen,
  onClose,
  status,
  orderData,
}: OrderHistoryProps) {
  const [imgs, setImgs] = useState<string[]>([]);

  // 🔧 메모리 누수 방지: URL 정리
  useEffect(() => {
    return () => {
      imgs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imgs]);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 5 - imgs.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    const newImages = filesToAdd.map((file) => URL.createObjectURL(file));
    setImgs((prev) => [...prev, ...newImages]);
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    // 🔧 URL 해제
    URL.revokeObjectURL(imgs[index]);
    setImgs((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  // 🔧 데이터 검증 개선
  if (
    !orderData ||
    !orderData.orderItems ||
    orderData.orderItems.length === 0
  ) {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div className="bg-white rounded-xl p-5 max-w-md w-full mx-4">
          <p className="text-center font-pretendard text-main-text mb-4">
            주문 상세 정보를 확인할 수 없습니다.
          </p>
          <button onClick={onClose} className="button-cancelButton w-full">
            닫기
          </button>
        </div>
      </div>
    );
  }

  // 주문 취소 (status === "1")
  if (status === "1") {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-pretendard text-main-text"
        onClick={onClose}
      >
        <div
          className="flex flex-col bg-white rounded-xl p-5 max-w-md w-full mx-4 h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-bold text-xl text-center mb-2.5">구매 취소</p>

          <div className="flex flex-col gap-y-1">
            {orderData.orderItems.map((item) => (
              <OrderItemDisplay key={item.orderItemId} item={item} />
            ))}
          </div>

          <hr className="text-grey my-2.5" />
          <div className="flex flex-row justify-center gap-x-2 mt-2.5">
            <button className="button-cancelButton">구매 취소</button>
            <button className="button-cancelButton" onClick={onClose}>
              돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 주문 상세 보기 (status === "2")
  if (status === "2") {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-pretendard text-main-text"
        onClick={onClose}
      >
        <div
          className="flex flex-col bg-white rounded-xl p-5 max-w-md w-full mx-4 h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-bold text-xl text-center mb-2.5">구매 상세 내역</p>

          <div className="flex flex-col gap-y-1">
            {orderData.orderItems.map((item) => (
              <OrderItemDisplay key={item.orderItemId} item={item} />
            ))}
          </div>

          <hr className="text-grey my-2.5" />
          <OrderSummary
            totalPrice={orderData.totalPrice}
            totalAmount={orderData.totalAmount}
          />
        </div>
      </div>
    );
  }

  // 리뷰 쓰기 (status === "3")
  if (status === "3") {
    const reviewItem = orderData.orderItems[0];

    if (!reviewItem) {
      return (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <div className="bg-white rounded-xl p-5 max-w-md w-full mx-4">
            <p className="text-center font-pretendard text-main-text mb-4">
              리뷰할 상품 정보가 없습니다.
            </p>
            <button onClick={onClose} className="button-cancelButton w-full">
              닫기
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-pretendard text-main-text"
        onClick={onClose}
      >
        <div
          className="flex flex-col bg-white rounded-xl p-5 max-w-md w-full mx-4 h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-bold text-xl text-center mb-2.5">리뷰 등록하기</p>
          <div className="flex flex-col gap-y-2.5">
            <div className="flex flex-row w-full h-[100px] items-center p-5 border-t border-grey">
              <img
                src={reviewItem.orderItemThumbnail || testImg}
                className="w-[100px] h-[100px] object-cover"
                alt={reviewItem.orderItemName}
              />
              <div className="flex flex-col ml-2">
                <p className="text-sm font-semibold">
                  {reviewItem.orderItemName}
                </p>

                {reviewItem.orderItemOptions.map((option, index) => (
                  <p key={index} className="text-xs text-grey2">
                    {option.name}: {option.value}
                  </p>
                ))}

                <p className="text-xs text-grey2">
                  315122-111/CW2288-111 (임시 품번)
                </p>
              </div>
            </div>

            <textarea
              className="w-full h-20 bg-gray-100 resize-none text-sm p-2 outline-none rounded"
              placeholder="리뷰를 작성해주세요..."
            />

            {/* 이미지 업로드 영역 */}
            <div className="flex flex-row w-full gap-x-2">
              {imgs.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    className="w-20 h-20 object-cover bg-gray-200 rounded"
                    alt={`업로드 이미지 ${index + 1}`}
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="이미지 삭제"
                  >
                    ×
                  </button>
                </div>
              ))}

              {imgs.length < 5 && (
                <label className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    aria-label="이미지 업로드"
                  />
                  <span className="text-3xl text-gray-400">+</span>
                </label>
              )}
            </div>

            <div className="flex flex-row justify-center gap-x-2 mt-2.5">
              <button
                className="button-cancelButton opacity-50 cursor-not-allowed"
                disabled={true}
              >
                리뷰 등록
              </button>
              <button className="button-cancelButton" onClick={onClose}>
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default OrderHistoryModal;
