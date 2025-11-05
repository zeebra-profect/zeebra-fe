import { type OrderInfo } from "@/utils/order";
import OrderHistoryModal from "./OrderHistoryModal";
import { useState } from "react";
import ReviewBtn from "../btn/ReviewBtn";

interface OrderRowProps {
  orderInfo: OrderInfo;
}

const STATUS_DISPLAY_MAP: { [key: string]: string } = {
  PAID: "결제 완료",
  DELIVERY_BEFORE: "배송 전",
  DELIVERY_IN_PROGRESS: "배송 중",
  DELIVERY_COMPLETED: "배송 완료",
  ORDER_COMPLETED: "구매 완료",
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ko-KR").format(price);
};

function OrderRow({ orderInfo }: OrderRowProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"1" | "2" | "3">("2");

  const displayStatus =
    STATUS_DISPLAY_MAP[orderInfo.orderStatus] || orderInfo.orderStatus;

  // 데이터 체크
  if (!orderInfo.orderItems || orderInfo.orderItems.length === 0) {
    return (
      <div className="w-full h-[150px] border border-grey rounded-lg flex items-center justify-center">
        <p className="text-grey2">주문 상품 정보가 없습니다.</p>
      </div>
    );
  }

  const firstItem = orderInfo.orderItems[0];
  const otherItemCount =
    orderInfo.orderItems.length > 1 ? orderInfo.orderItems.length - 1 : 0;

  const openModal = (type: "1" | "2" | "3") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full max-w-4xl h-[150px] border border-grey rounded-lg flex flex-row p-5 font-pretendard text-main-text justify-between">
        <div className="flex flex-row ml-10 items-center">
          <img
            src={firstItem.orderItemThumbnail || "/placeholder.png"}
            className="w-[100px] h-[100px] object-cover rounded"
            alt={firstItem.orderItemName || "상품 이미지"}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
          />
          <div className="flex flex-col ml-2">
            <p className="text-xs font-bold">
              {firstItem.orderItemName}
              {otherItemCount > 0 ? ` 외 ${otherItemCount}개` : ""}
            </p>
            <p className="text-sm font-bold">
              {formatPrice(orderInfo.totalAmount)}원
            </p>
          </div>
        </div>

        <div className="flex flex-col mr-10 justify-center items-center text-center gap-y-1">
          <p className="font-light text-xs text-grey2">
            {orderInfo.orderTime.split("T")[0]} 주문
          </p>
          <p className="text-sm font-bold">{displayStatus}</p>

          {displayStatus === "배송 전" && (
            <button
              className="button-cancelButton"
              onClick={() => openModal("1")}
            >
              주문 취소
            </button>
          )}

          {displayStatus === "구매 완료" && (
            <ReviewBtn onClick={() => openModal("3")} />
          )}

          <button
            className="font-light text-xs cursor-pointer bg-transparent border-none p-0 hover:underline"
            onClick={() => openModal("2")}
          >
            상세보기 &gt;
          </button>
        </div>
      </div>

      <OrderHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={modalType}
        orderData={orderInfo}
      />
    </>
  );
}

export default OrderRow;
