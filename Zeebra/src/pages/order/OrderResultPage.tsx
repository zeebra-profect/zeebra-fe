import { useSearchParams } from "react-router-dom";
import OrderProduct from "../../components/order/OrderProduct";
import ResultSummary from "../../components/order/ResultSummary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { postApprovePayment, postFailPayment } from "@/store/paymentSlice";
import type { PaymentApproveReq, PaymentFailReq } from "@/utils/payment";
import { v4 as uuidv4 } from "uuid";
import { fetchOrder } from "@/store/orderSlice";

function createUUID() {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[:.]/g, "-");
  const id = `${dateStr}_${uuidv4()}`;

  return id;
}

function OrderResultPage() {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order.orderById);
  const paymentResult = useAppSelector((state) => state.payment.paymentResult);
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState(-1);
  const [currentDate, setCurrentDate] = useState("로딩중...");
  const hasRun = useRef(false);

  // 페이지 진입 시 URL 파라미터 확인 및 처리
  useEffect(() => {
    if (hasRun.current) return; // 이미 실행했으면 스킵!
    hasRun.current = true;

    const success = searchParams.get("success") === "true";
    const orderId = searchParams.get("orderId");
    const paymentKey = searchParams.get("paymentKey");
    const amount = searchParams.get("amount");
    const code = searchParams.get("code");
    const message = searchParams.get("message");

    // 실패한 경우
    if (!success || code) {
      setResult(0);

      if (code && message && orderId) {
        const failForm: PaymentFailReq = {
          code,
          message,
          tossOrderId: orderId,
          clientRequestId: createUUID(),
        };
        dispatch(postFailPayment(failForm));
      }
      return;
    }

    // 성공한 경우 - 필수 파라미터 체크
    if (!paymentKey || !orderId || !amount) {
      setResult(0);
      return;
    }

    // 결제 승인 요청
    const form: PaymentApproveReq = {
      paymentKey,
      tossOrderId: orderId,
      amount: Number(amount),
      clientRequestId: createUUID(),
    };

    dispatch(postApprovePayment(form));
  }, []);

  // 결제 승인 API 응답 처리
  useEffect(() => {
    if (!paymentResult?.data) {
      console.log("⏳ 아직 응답 없음");
      return;
    }
    dispatch(fetchOrder(paymentResult.data.orderInfo.orderId));

    if (paymentResult.data.isApproved === true) {
      setResult(1);
      const formatted = new Date(
        paymentResult.data.orderInfo.orderTime
      ).toLocaleString("ko-KR");
      setCurrentDate(formatted);
    } else {
      setResult(0);
    }
  }, [paymentResult]);

  if (result === -1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">결제 진행 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[660px] text-center text-main-text">
      <p className="font-extrabold text-3xl">
        주문 {result === 1 ? "완료" : "실패"}
      </p>
      <div className="flex flex-col items-center mt-10 p-5 mb-2.5 border border-solid border-grey rounded-[10px]">
        <p className="text-lg font-normal">
          {result === 1 ? "주문이 완료되었습니다." : "주문에 실패하였습니다."}
        </p>
        <pre className="text-base font-normal whitespace-pre-wrap">
          {result === 1
            ? `${currentDate} \n주문하신 상품의 주문번호는 ${paymentResult?.data.orderInfo.orderNumber}입니다.`
            : `결제에 실패했습니다. 다시 시도해주세요.\n실패 사유: ${paymentResult?.message}`}
        </pre>
        <div className="flex flex-col text-left w-full mt-6">
          <p className="text-base font-semibold mb-2.5">주문 상품</p>
          {order?.data.orderItems?.map((item) => (
            <OrderProduct key={item.orderItemId} orderItem={item} />
          ))}
          {result === 1 &&
            order?.data?.totalPrice &&
            order?.data?.totalAmount && (
              <ResultSummary
                totalPrice={order.data.totalPrice}
                totalAmount={order.data.totalAmount}
              />
            )}
        </div>
      </div>
    </div>
  );
}

export default OrderResultPage;
