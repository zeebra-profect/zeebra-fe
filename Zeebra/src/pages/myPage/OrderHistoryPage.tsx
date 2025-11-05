import { useState, useEffect, useCallback } from "react";
// import OrderItemDisplay from "../../components/order/OrderItemDisplay"; // 모달 내 상품 표시용
import OrderHistoryModal from "../../components/order/OrderHistoryModal"; // 모달
import ReviewBtn from "../../components/btn/ReviewBtn"; // 리뷰 버튼
// API 함수와 타입을 가져옵니다. (경로는 실제 파일 위치에 맞게 수정해주세요)
import {
  getOrders,
  type OrderGetReq,
  type OrderInfo,
  type OrderListRes,
} from "@/utils/order";
// date-fns 함수 임포트
import { format, subMonths } from "date-fns";

// --- 상수 정의 ---

// 주문 상태 매핑 (API 필터 값)
const ORDER_STATUS_MAP = {
  inProgress: "PAID", // 구매중 상태 코드
  completed: "COMPLETED", // 구매 완료 상태 코드
};

const STATUS_DISPLAY_MAP: { [key: string]: string } = {
  PAID: "결제 완료",
  DELIVERY_BEFORE: "배송 전",
  DELIVERY_IN_PROGRESS: "배송 중",
  DELIVERY_COMPLETED: "배송 완료",
  ORDER_COMPLETED: "구매 완료",
};

// 금액 표시를 위한 헬퍼 함수
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ko-KR").format(price);
};

// 기간(period)을 실제 날짜로 변환하는 헬퍼 함수
const getPeriodDates = (months: number) => {
  const endDate = new Date();
  if (months === 0) {
    return { startDate: "1900-01-01", endDate: format(endDate, "yyyy-MM-dd") };
  }
  const startDate = subMonths(endDate, months);

  return {
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd"),
  };
};

// --- OrderRow 컴포넌트 (개별 주문 건) ---

// ⭐️ OrderHistoryPage에서 호출하는 컴포넌트 (OrderInfo를 받음)
interface OrderRowProps {
  orderInfo: OrderInfo;
}

function OrderRow({ orderInfo }: OrderRowProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const displayStatus =
    STATUS_DISPLAY_MAP[orderInfo.orderStatus] || orderInfo.orderStatus;

  const firstItem = orderInfo.orderItems[0];
  const otherItemCount =
    orderInfo.orderItems.length > 1 ? orderInfo.orderItems.length - 1 : 0;
  const [modalType, setModalType] = useState<"1" | "2" | "3">("2");

  const openModal = (type: "1" | "2" | "3") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-[90%] h-[150px] border border-grey rounded-lg flex flex-row p-5 font-pretendard text-main-text justify-between">
        <div className="flex flex-row ml-10 items-center">
          <img
            src={firstItem?.orderItemThumbnail}
            className="w-[100px] h-[100px]"
            alt={firstItem?.orderItemName || "상품 이미지"}
          />
          <div className="flex flex-col ml-2">
            <p className="text-xs">
              {firstItem?.orderItemName}
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

          {displayStatus === "배송 전" ? (
            <button
              className="button-cancelButton"
              onClick={() => openModal("1")}
            >
              주문 취소
            </button>
          ) : null}
          {displayStatus === "구매 완료" ? (
            <ReviewBtn onClick={() => openModal("3")} />
          ) : null}

          <p
            className="font-light text-xs cursor-pointer"
            onClick={() => openModal("2")}
          >
            상세보기 &gt;
          </p>
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

// --- OrderHistoryPage (메인 컨테이너) ---

function OrderHistoryPage() {
  const [tab, setTab] = useState<boolean>(false);
  const [period, setPeriod] = useState(0);

  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [totalOrderCount, setTotalOrderCount] = useState<{
    inProgress: number;
    completed: number;
  }>({
    inProgress: 0,
    completed: 0,
  });

  const fetchOrders = useCallback(
    async (currentTab: boolean, currentPeriod: number) => {
      setIsLoading(true);

      const { startDate, endDate } = getPeriodDates(
        currentPeriod === 1
          ? 1
          : currentPeriod === 2
          ? 3
          : currentPeriod === 3
          ? 6
          : 0
      );

      const statusKey = currentTab ? "completed" : "inProgress";
      const orderStatus = ORDER_STATUS_MAP[statusKey];

      const params: OrderGetReq = {
        startDate: startDate,
        endDate: endDate,
        orderStatus: orderStatus,
        pageable: {
          page: 0,
          size: 100,
          sort: ["createdAt", "desc"],
        },
      };

      try {
        console.log("들어오냐", params);
        const response: OrderListRes = await getOrders(params);
        console.log("찍히냐 :", response);

        const count = response.data?.totalElements || 0;

        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }

        setTotalOrderCount((prev) => ({
          ...prev,
          [statusKey]: count,
        }));
      } catch (error) {
        console.error("주문 내역 조회 실패:", error);
        setOrders([]);
        const statusKey = currentTab ? "completed" : "inProgress";
        setTotalOrderCount((prev) => ({ ...prev, [statusKey]: 0 }));
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchOrders(tab, period);
  }, [tab, period, fetchOrders]);

  return (
    <>
      <div className="w-[900px] h-auto flex flex-col font-pretendard text-main-text items-center">
        <p className="text-center font-extrabold text-3xl">구매 내역</p>

        {/* 🛑 탭 영역 */}
        <div className="flex flex-row mt-10 pl-5 pr-5 mb-5 items-end">
          {/* 구매중 탭 */}
          <div
            className={
              !tab
                ? "cursor-pointer flex flex-col items-center min-w-[450px] border-b-3 border-main-text font-bold"
                : "cursor-pointer flex flex-col items-center min-w-[450px] border-b border-main-text"
            }
            onClick={() => {
              setTab(false);
            }}
          >
            <p>{totalOrderCount.inProgress}</p> <p>구매 진행 중</p>
          </div>
          {/* 구매 완료 탭 */}
          <div
            className={
              tab
                ? "cursor-pointer flex flex-col items-center min-w-[450px] border-b-3 border-main-text font-bold"
                : "cursor-pointer flex flex-col items-center min-w-[450px] border-b border-main-text"
            }
            onClick={() => {
              setTab(true);
            }}
          >
            <p>{totalOrderCount.completed}</p> <p>구매 확정</p>
          </div>
        </div>

        {/* 🛑 기간 필터 영역 */}
        <div className="flex flex-row gap-x-5 mb-5">
          {[1, 2, 3, 0].map((p) => (
            <button
              key={p}
              className={
                period === p ? "button-smallButton2" : "button-smallButton"
              }
              onClick={() => {
                setPeriod(p);
              }}
            >
              {p === 0 ? "전체" : `${p === 1 ? 1 : p === 2 ? 3 : 6}개월`}
            </button>
          ))}
        </div>

        {/* 🛑 주문 목록 영역 */}
        <div className="flex flex-col gap-y-3 w-full items-center">
          {isLoading ? (
            <div className="py-10 text-center">
              <p>주문 내역을 불러오는 중입니다...</p>
            </div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              // ⭐️ OrderRow를 호출하며 orderInfo를 전달합니다. (오류 해결)
              <OrderRow key={order.orderId} orderInfo={order} />
            ))
          ) : (
            <div className="py-10 text-center text-grey2">
              조회된 주문 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderHistoryPage;
