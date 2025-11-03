import OrderItem from "../../components/order/OrderItem";
import OrderSummary from "../../components/order/OrderSummary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchOrder } from "@/store/orderSlice";
import type { ProductDetail } from "@/utils/product";
import type { OrderRes } from "@/utils/order";

interface LocationState {
  productInfo: ProductDetail["data"];
  order: OrderRes;
}

function OrderPage() {
  const location = useLocation();
  const { productInfo, order } = location.state as LocationState;

  useEffect(() => {
    console.log("get order by Id: ", order);
    console.log("info: ", productInfo);
  }, [order]);

  return (
    <>
      <div className="flex flex-col w-full max-w-[660px] text-center text-main-text">
        <p className="font-extrabold text-3xl">결제</p>
        <div className="flex flex-row items-center justify-between mt-10 pl-5 pr-5 text-sm font-normal mb-2.5">
          <p>주문 상품 및 쿠폰</p>
          <p>총 {order?.data.order.totalQuantity}건</p>
        </div>
        {order?.data.order?.orderItems?.map((item) => (
          <OrderItem
            key={item.orderItemId}
            children={productInfo}
            option={item}
          />)
        )}
        <hr className="text-grey" />
        <OrderSummary totalPrice={order?.data.order.totalPrice} totalAmount={Number(order?.data.order.totalAmount)}/>
      </div>
    </>
  );
}

export default OrderPage;
