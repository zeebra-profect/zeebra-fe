import OrderHistoryItem from "./OrderHistoryItem";
import OrderSummary from "./OrderSummary";
import testImg from "../../img/test/nike4.webp";
import { useState } from "react";

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  status: string;
  // children?: React.ReactNode;
}

function OrderHistoryModal({
  isOpen,
  onClose,
  status,
  // children,
}: OrderHistoryProps) {
  const [imgs, setImgs] = useState<string[]>([]);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 5개 제한 체크
    const remainingSlots = 5 - imgs.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    // 미리보기 URL 생성
    const newImages = filesToAdd.map((file) => URL.createObjectURL(file));
    setImgs((prev) => [...prev, ...newImages]);
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    setImgs((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;
  // 주문 취소
  else if (status === "1") {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-pretendard text-main-text"
          onClick={onClose}
        >
          <div
            className="flex flex-col bg-white rounded-xl p-5 max-w-md w-full mx-4 h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold text-xl text-center mb-2.5">구매 취소</p>
            <OrderHistoryItem />
            <OrderHistoryItem />
            <OrderHistoryItem />
            <hr className="text-grey" />
            <div className="flex flex-row justify-center gap-x-2 mt-2.5">
              <button className="button-cancelButton">구매 취소</button>
              <button className="button-cancelButton" onClick={onClose}>
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  // 주문 상세 보기
  else if (status === "2") {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-pretendard text-main-text"
          onClick={onClose}
        >
          <div
            className="flex flex-col bg-white rounded-xl p-5 max-w-md w-full mx-4 h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold text-xl text-center mb-2.5">
              구매 상세 내역
            </p>
            <OrderHistoryItem />
            <OrderHistoryItem />
            <OrderHistoryItem />
            <hr className="text-grey" />
            <OrderSummary />
          </div>
        </div>
      </>
    );
  }
  // 리뷰 쓰기
  else if (status === "3") {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-pretendard text-main-text"
          onClick={onClose}
        >
          <div
            className="flex flex-col bg-white rounded-xl p-5 max-w-md w-full mx-4 h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold text-xl text-center mb-2.5">
              리뷰 등록하기
            </p>
            <div className="flex flex-col gap-y-2.5">
              <div className="flex flex-row w-[400px] h-[100px] items-center p-5 border-t border-grey">
                <img src={testImg} className="w-[100px] h-[100px]" />
                <div className="flex flex-col ml-2">
                  <p className="text-sm">Nike Air Force 1 ‘07 Low White</p>
                  <p className="text-xs text-grey2">
                    나이키 에어포스 1 ‘07 로우 화이트
                  </p>
                  <p className="text-xs text-grey2">315122-111/CW2288-111</p>
                </div>
              </div>
              <textarea className="w-99/100 h-20 bg-gray-100 resize-none text-sm p-1 outline-none"></textarea>
              {/* 이미지 업로드 영역 */}
              <div className="flex flex-row w-99/100 gap-x-2">
                {/* 업로드된 이미지들 */}
                {imgs.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      className="w-18 h-18 object-cover bg-gray-200"
                    />
                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 right-0 w-5 h-5 text-main-text rounded-full text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* 업로드 버튼 (5개 미만일 때만) */}
                {imgs.length < 5 && (
                  <label className="w-18 h-18 bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="text-3xl text-gray-400">+</span>
                  </label>
                )}
              </div>

              <div className="flex flex-row justify-center gap-x-2 mt-2.5">
                <button className="button-cancelButton">리뷰 등록</button>
                <button className="button-cancelButton" onClick={onClose}>
                  돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default OrderHistoryModal;
