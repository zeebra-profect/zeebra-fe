import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDetail } from "@/utils/product";
import OptionButton from "./OptionButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductOption } from "@/store/productSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ProductDetail["data"] | undefined;
}

function PurchaseModal({ isOpen, onClose, children }: ModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) => state.product.productOption?.data.sizeOptionResponses);
  const currentColor = children?.colorOptionResponses.find(
    (option: { colorOptionNameId: number; colorValue: string }) =>
      option.colorValue === children.colorValue
  );

  useEffect(() => {
    if (children?.productId && currentColor?.colorOptionNameId) {
      dispatch(
        fetchProductOption({
          productId: children?.productId,
          colorOptionNameId: currentColor.colorOptionNameId,
        })
      );
    }
  }, [currentColor]);

  useEffect(() => {
    console.log("options: ", options);
  }, [options]);

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
          <img className="w-17 h-17" src={children?.productThumbnail}/>
          <div className="text-left">
            <p className="font-normal text-lg">{children?.productName}</p>
            <p className="font-light text-sm/4">
              {children?.productDescription}
            </p>
            <p className="font-light text-sm/4">{children?.colorValue}</p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-x-3 gap-y-2 overflow-y-auto max-h-[200px] justify-center scrollbar">
          {
            options?.map(option => (
            <OptionButton
            size={String(option.sizeValue)}
            price={option.lowPriceOfSize}
            key={option.productOptionId}
            onClick={() => setCheckedButton(option.productOptionId)}
            isSelected={checkedButton === option.productOptionId}
          />

          ))
          }
        </div>
        <div className="mt-5 flex flex-row flex-2">
          <div className="flex flex-col sm:flex-row gap-y-2 gap-x-2 md:gap-x-2.5 w-full">
            <button className="button-productDetail2 bg-main-text justify-center">
              <p className="text-base md:text-lg font-bold">장바구니 담기</p>
            </button>
            <button className="button-productDetail2 bg-orange justify-center">
              <p
                className="text-base md:text-lg font-bold"
                onClick={() => navigate("/order")}
              >
                즉시 구매하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;
