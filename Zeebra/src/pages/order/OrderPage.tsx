import OrderItem from "../../components/order/OrderItem";
import OrderSummary from "../../components/order/OrderSummary";

function OrderPage() {
  return (
    <>
      <div className="flex flex-col w-full max-w-[660px] text-center text-main-text">
        <p className="font-extrabold text-3xl">결제</p>
        <div className="flex flex-row items-center justify-between mt-10 pl-5 pr-5 text-sm font-normal mb-2.5">
            <p>
                주문 상품 및 쿠폰
            </p>
            <p>
                총 3건
            </p>
        </div>
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
        <hr className="text-grey" />
        <OrderSummary/>
      </div>
    </>
  );
}

export default OrderPage;
