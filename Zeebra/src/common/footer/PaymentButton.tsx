import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPayment } from "@/store/paymentSlice";
import { type PaymentReq } from "@/utils/payment";
import { v4 as uuidv4 } from "uuid";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useAuth } from "@/hooks/useAuth";
// import { useEffect } from "react";

function createUUID() {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[:.]/g, "-");
  const id = `${dateStr}_${uuidv4()}`;

  return id;
}

function PaymentButton() {
  const dispatch = useAppDispatch();
  const me = useAuth().me;
  const order = useAppSelector((state) => state.order.order);
  const paymentInfo = useAppSelector((state) => state.payment);

  if (!order?.data.order || !me?.memberId) {
    alert("주문 정보가 없습니다.");
    return;
  }

  const orderData = order.data.order;
  let newOrderName = undefined;
  if (orderData.totalQuantity === 1)
    newOrderName = orderData.orderItems[0].orderItemName;
  else
    newOrderName =
      orderData.orderItems[0].orderItemName +
      "외 " +
      (orderData.totalQuantity - 1) +
      "개";

  const form: PaymentReq = {
    orderId: orderData.orderId,
    orderName: newOrderName,
    price: orderData.totalPrice,
    discount: 0,
    amount: orderData.totalAmount,
    clientRequestId: createUUID(),
  };

  const handlePayment = async () => {
    if (form.amount > 0) {
      try {
        console.log("🔵 1. 결제 생성 시작");
        console.log("📝 form.clientRequestId:", form.clientRequestId);
        console.log("📝 전체 form:", form);

        const result = await dispatch(createPayment(form)).unwrap();
        console.log("✅ 2. 결제 생성 완료! DB 응답:", result);

        const baseUrl = window.location.origin;
        const tossPayments = await loadTossPayments(
          "test_ck_6BYq7GWPVvNp41LjwY97VNE5vbo1"
        );
        const payment = tossPayments.payment({
          customerKey: "ANONYMOUS",
        });

        console.log("🔵 3. 토스페이먼츠 호출");
        console.log("📝 orderId:", paymentInfo.payment?.data.tossOrderId);

        await payment.requestPayment({
          method: "CARD",
          amount: { currency: "KRW", value: form.amount },
          orderId: result.data.tossOrderId,
          orderName: newOrderName,
          successUrl: `${baseUrl}/orders/result/${form.orderId}?success=true`,
          failUrl: `${baseUrl}/orders/result/${form.orderId}?success=false`,
          customerEmail: me.memberEmail,
          customerName: me.memberName,
          customerMobilePhone: null,
        });
      } catch (error) {
        console.error("❌ 결제 처리 실패:", error);
        alert("결제 처리에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("주문 정보를 불러오는 중입니다.");
    }
  };

  // useEffect(() => {

  // },[paymentInfo])

  return (
    <div className="flex fixed bottom-0 w-full h-20 bg-white z-10 justify-center items-center">
      <button
        onClick={handlePayment}
        className="button-payment bg-orange w-2/5 h-2/3"
      >
        {orderData.totalAmount > 0
          ? `${orderData.totalAmount.toLocaleString()}원 결제하기`
          : "로딩 중..."}
      </button>
    </div>
  );
}

export default PaymentButton;
