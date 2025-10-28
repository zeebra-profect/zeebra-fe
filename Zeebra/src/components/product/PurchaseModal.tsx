import { useState } from "react";
import SizeButton from "./SizeButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // children?: React.ReactNode;
}

function PurchaseModal({ isOpen, onClose }: ModalProps) {
  const [checkedButton, setCheckedButton] = useState<number | null>(null);
  if (!isOpen) return null;

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
          <img className="w-17 h-17" />
          <div className="text-left">
            <p className="font-normal text-lg">
              Nike Air Force 1 ‘07 Low White
            </p>
            <pre className="font-light text-sm/4">
              {`나이키 에어포스 1 ‘07 로우 화이트
315122-111/CW2288-111`}
            </pre>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-x-3 gap-y-2 overflow-y-auto max-h-[200px] justify-center scrollbar">
          <SizeButton
            size={230}
            price={110000}
            key={1}
            onClick={() => setCheckedButton(1)}
            isSelected={checkedButton === 1}
          />
          <SizeButton
            size={230}
            price={110000}
            key={2}
            onClick={() => setCheckedButton(2)}
            isSelected={checkedButton === 2}
          />
        </div>
        <div className="mt-5 flex flex-row flex-2">
          <div className="flex flex-col sm:flex-row gap-y-2 gap-x-2 md:gap-x-2.5 w-full">
            <button className="button-productDetail2 bg-main-text justify-center">
              <p className="text-base md:text-lg font-bold">장바구니 담기</p>
            </button>
            <button className="button-productDetail2 bg-orange justify-center">
              <p className="text-base md:text-lg font-bold">즉시 구매하기</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;
