import { useState } from "react";
import like from "../../img/icons/like.png";
import GroupChat from "../chat/GroupChat";
import PurchaseModal from "./PurchaseModal";
import type { ProductDetail } from "@/utils/product";

interface ProductInfoProps {
  productInfo: ProductDetail["data"] | undefined;
}

function ProductInfo({ productInfo }: ProductInfoProps) {
  const [isPurModalOpen, setIsPurModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-y-4 md:gap-y-5 w-full lg:w-[519px] px-4 md:px-0">
        <div className="flex flex-col sm:flex-row justify-between gap-y-4">
          {/* 텍스트 부분 */}
          <div className="flex flex-col font-pretendard text-main-text">
            <p className="text-xs md:text-sm font-normal">즉시 구매가</p>
            <p className="text-xl md:text-[26px] font-bold mb-3 md:mb-5">
              {productInfo?.lowPrice
                ? productInfo.lowPrice.toLocaleString() + "원"
                : null}
            </p>
            <p className="text-base md:text-lg font-normal">
              {productInfo?.productName} {productInfo?.colorValue}
            </p>
            <p className="text-xs md:text-sm font-light text-grey2 mb-2 md:mb-2.5">
              {productInfo?.productDescription}
            </p>
            <p className="text-xs font-light">
              리뷰 {productInfo?.reviewCount}
            </p>
          </div>
          {/* 왼쪽 3버튼 부분 */}
          <div className="flex flex-row sm:flex-col font-pretendard text-main-text gap-x-2 gap-y-2 md:gap-y-[13px]">
            <button className="button-productDetail flex-1 sm:flex-none">
              브랜드 검색
            </button>
            <button className="button-productDetail flex-1 sm:flex-none">
              <img src={like} className="w-[15px] h-[13px]" /> 관심{" "}
              {productInfo?.favoriteProductCount}
            </button>
          </div>
        </div>
        {/* 구매/판매버튼 */}
        <div className="flex flex-col gap-y-6 md:gap-y-10">
          <div className="flex flex-col sm:flex-row gap-y-2 gap-x-2 md:gap-x-2.5">
            <button
              className="button-productDetail2 bg-orange flex-1"
              onClick={() => setIsPurModalOpen(true)}
            >
              <p className="text-base md:text-lg font-bold">구매</p>
              <div className="h-[50px] w-px bg-grey"></div>
              <div className="flex flex-col m-0 text-left">
                <p className="text-sm md:text-base font-bold">
                  {" "}
                  {productInfo?.lowPrice
                    ? productInfo.lowPrice.toLocaleString() + "원"
                    : null}
                </p>
                <p className="text-xs font-normal">즉시 구매가</p>
              </div>
            </button>
            <button className="button-productDetail2 bg-green flex-1">
              <p className="text-base md:text-lg font-bold">판매</p>
              <div className="h-[50px] w-px bg-grey"></div>
              <div className="flex flex-col m-0 text-left">
                <p className="text-sm md:text-base font-bold">
                  {" "}
                  {productInfo?.lowPrice
                    ? productInfo.lowPrice.toLocaleString() + "원"
                    : null}
                </p>
                <p className="text-xs font-normal">즉시 판매가</p>
              </div>
            </button>
          </div>
        </div>
        <hr className="w-full text-grey" />
        <GroupChat />
      </div>
      <PurchaseModal
        isOpen={isPurModalOpen}
        onClose={() => setIsPurModalOpen(false)}
        children={productInfo}
      />
    </>
  );
}

export default ProductInfo;
