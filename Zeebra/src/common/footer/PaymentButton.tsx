import { useAppSelector } from "@/store/hooks";

function PaymentButton() {
  const order = useAppSelector((state) => state.order.order);
  const totalAmount = order?.data.order?.totalAmount || 0;

  const handlePayment = () => {
    if (totalAmount > 0) {
      console.log("결제:", totalAmount);
    } else {
      alert("주문 정보를 불러오는 중입니다.");
    }
  };

  return (
    <div className="flex fixed bottom-0 w-full h-20 bg-white z-10 justify-center items-center">
      <button 
        onClick={handlePayment}
        disabled={!totalAmount}
        className="button-payment bg-orange w-2/5 h-2/3"
      >
        {totalAmount > 0 
          ? `${totalAmount.toLocaleString()}원 결제하기`
          : '로딩 중...'
        }
      </button>
    </div>
  );
}

export default PaymentButton;
