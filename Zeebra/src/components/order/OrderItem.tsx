import Coupon from "./Coupon";
import { type ProductDetail } from "@/utils/product";

interface orderItem {
  orderItemId: number;
  saleId: number;
  productOptionId: number;
  orderItemName: string;
  orderItemThumbnail: string;
  orderItemPrice: number;
  orderItemQuantity: number;
  orderItemAmount: number;
  orderItemStatus: string;
  orderItemOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface OrderItemProps {
  productInfo: ProductDetail["data"];
  option: orderItem;
}

function OrderItem({ productInfo, option}: OrderItemProps) {
  
  const formatted = option.orderItemAmount.toLocaleString();
  return (
    <>
      <hr className="text-grey" />
      <div className="w-full max-h-[700px] p-5 flex flex-col text-main-text">
        <Coupon />
        <div className="flex flex-row items-center">
          <img className="w-23 h-20" src={productInfo.productThumbnail} />
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col ml-3 text-left">
              <p className="font-normal text-lg">
                {productInfo.productName} {option.orderItemOptions[0].value}
              </p>
              <pre className="font-light text-sm/4">
                {productInfo.productDescription}
              </pre>
              <p className="font-bold text-sm">{option.orderItemOptions[1].value}</p>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col ml-3 text-right">
                <p className="font-normal text-sm">상품금액</p>
                <p className="font-light text-grey2 text-xs/4">배송비</p>
                <p className="font-light text-grey2 text-xs">수수료</p>
                <p className="font-light text-grey2 text-xs">쿠폰 할인</p>
                <p className="font-bold text-sm">결제 금액</p>
              </div>
              <div className="flex flex-col ml-3 text-right">
                <p className="font-normal text-sm">{formatted}</p>
                <p className="font-light text-grey2 text-xs/4">-</p>
                <p className="font-light text-grey2 text-xs">-</p>
                <p className="font-light text-grey2 text-xs">-</p>
                <p className="font-bold text-sm">{formatted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
