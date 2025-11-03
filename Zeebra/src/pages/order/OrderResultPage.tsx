import { useSearchParams } from "react-router-dom";
import OrderProduct from "../../components/order/OrderProduct";
import ResultSummary from "../../components/order/ResultSummary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { postApprovePayment, postFailPayment } from "@/store/paymentSlice";
import type { PaymentApproveReq, PaymentFailReq } from "@/utils/payment";
import { v4 as uuidv4 } from "uuid";

function createUUID() {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[:.]/g, "-");
  const id = `${dateStr}_${uuidv4()}`;

  return id;
}

// function OrderResultPage() {
//   const dispatch = useAppDispatch();
//   const order = useAppSelector((state) => state.order.order);
//   const payment = useAppSelector((state) => state.payment.payment);
//   const paymentResult = useAppSelector((state) => state.payment.paymentResult);
//   const [searchParams] = useSearchParams();
//   const [result, setResult] = useState(-1);

//   // const success = searchParams.get("success") === "true";
//   // const fail = searchParams.get("fail") === "fail";

//   const orderId = searchParams.get("orderId");
//   const paymentKey = searchParams.get("paymentKey");
//   const amount = searchParams.get("amount");
//   const [currentDate, setCurrentDate] = useState("로딩중...");

//   useEffect(() => {
//     if (!paymentKey || !orderId || !amount) {
//       console.error("필수 파라미터가 없습니다.");
//       setResult(0); // 실패 처리
//       return;
//     }

//     const form: PaymentApproveReq = {
//       paymentKey: paymentKey,
//       tossOrderId: orderId,
//       amount: Number(amount),
//       clientRequestId: createUUID(),
//     };

//     dispatch(postApprovePayment(form));
//   }, [orderId, paymentKey, amount]);

//   useEffect(() => {
//     if (paymentResult?.data.isApproved === true) {
//       setResult(1); // 성공
//       console.log("성공!", result);
//     } else {
//       setResult(0);
//       const code = searchParams.get("code");
//       const message = searchParams.get("message");

//       if (!code || !message || !orderId) {
//         console.error("필수 파라미터가 없습니다.");
//         setResult(0); // 실패 처리
//         return;
//       }

//       const failForm: PaymentFailReq = {
//         code: code,
//         message: message,
//         tossOrderId: orderId,
//         clientRequestId: createUUID(),
//       };
//       dispatch(postFailPayment(failForm));
//     }
//   }, [paymentResult]);

//   useEffect(() => {
//     if (order?.data?.order?.orderTime) {
//       const formatted = new Date(order.data.order.orderTime).toLocaleString(
//         "ko-KR"
//       );
//       setCurrentDate(formatted);
//     }
//   }, [order]);

//   const failComment = `결제에 실패했습니다. 다시 시도해주세요.
//   실패 사유: ${paymentResult?.message}`;

//   if (result === -1) {
//     return <p>결제 진행 중...</p>;
//   } else {
//     return (
//       <>
//         <div className="flex flex-col w-full max-w-[660px] text-center text-main-text">
//           <p className="font-extrabold text-3xl">
//             주문 {result === 1 ? `완료` : `실패`}
//           </p>
//           <div className="flex flex-col items-center mt-10 p-5 mb-2.5 border border-solid border-grey rounded-[10px]">
//             <p className="text-lg font-normal">
//               {result === 1
//                 ? `주문이 완료되었습니다.`
//                 : `주문에 실패하였습니다.`}
//             </p>
//             <pre className="text-base font-normal">
//               {result === 1
//                 ? `${currentDate} 주문하신 상품의 주문번호는 ${order?.data.order.orderNumber}입니다.`
//                 : failComment}
//             </pre>
//             <div className="flex flex-col text-left w-full mt-6">
//               <p className="text-base font-semibold mb-2.5">주문 상품</p>
//               <OrderProduct />
//               <OrderProduct />
//               <OrderProduct />
//               {result === 1 ? <ResultSummary /> : null}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

export default OrderResultPage;


function OrderResultPage() {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order.order);
  const paymentResult = useAppSelector((state) => state.payment.paymentResult);
  // const payment = useAppSelector((state) => state.payment.payment);
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

  console.log("📍 URL 파라미터:", { success, orderId, paymentKey, amount, code, message });

  // 실패한 경우
  if (!success || code) {
    console.log("❌ 결제 실패 처리");
    setResult(0);
    
    if (code && message && orderId) {
      const failForm: PaymentFailReq = {
        code,
        message,
        tossOrderId: orderId,
        clientRequestId: createUUID(),
      };
      console.log("📤 실패 API 호출:", failForm);
      dispatch(postFailPayment(failForm));
    }
    return;
  }

  // 성공한 경우 - 필수 파라미터 체크
  if (!paymentKey || !orderId || !amount) {
    console.error("❌ 필수 파라미터가 없습니다.");
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

  console.log("📤 승인 API 호출:", form);
  dispatch(postApprovePayment(form));
}, []); 

// 결제 승인 API 응답 처리
useEffect(() => {
  console.log("📥 paymentResult 변경됨:", paymentResult);
  
  if (!paymentResult?.data) {
    console.log("⏳ 아직 응답 없음");
    return;
  }
  
  if (paymentResult.data.isApproved === true) {
    setResult(1);
    console.log("✅ 결제 승인 성공!");
  } else {
    setResult(0);
    console.log("❌ 결제 승인 실패:", paymentResult.message);
  }
}, [paymentResult]);

  // 결제 승인 API 응답 처리
  useEffect(() => {
    if (!paymentResult?.data) return;
    
    if (paymentResult.data.isApproved === true) {
      setResult(1);
      console.log("결제 승인 성공!");
    } else {
      setResult(0);
      console.log("결제 승인 실패:", paymentResult.message);
    }
  }, [paymentResult]);

  // 주문 시간 포맷팅
  useEffect(() => {
    if (order?.data?.order?.orderTime) {
      const formatted = new Date(order.data.order.orderTime).toLocaleString("ko-KR");
      setCurrentDate(formatted);
    }
  }, [order]);

  const failComment = `결제에 실패했습니다. 다시 시도해주세요.\n실패 사유: ${paymentResult?.message || "알 수 없음"}`;

  if (result === -1) {
    return <div className="flex justify-center items-center h-screen">
      <p className="text-xl">결제 진행 중...</p>
    </div>;
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
            ? `${currentDate} 주문하신 상품의 주문번호는 ${order?.data.order.orderNumber}입니다.`
            : failComment}
        </pre>
        <div className="flex flex-col text-left w-full mt-6">
          <p className="text-base font-semibold mb-2.5">주문 상품</p>
          <OrderProduct />
          <OrderProduct />
          <OrderProduct />
          {result === 1 && <ResultSummary />}
        </div>
      </div>
    </div>
  );
}

