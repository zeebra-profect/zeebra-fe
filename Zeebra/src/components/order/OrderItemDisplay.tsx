import { type OrderItems } from "@/utils/order";

interface OrderItemDisplayProps {
  // ✅ 이름도 명확하게
  item: OrderItems; // ✅ orderInfo 대신 item
}

function OrderItemDisplay({ item }: OrderItemDisplayProps) {
  return (
    <div className="flex flex-row w-full h-[100px] items-center p-5 border-t border-grey">
      <img
        src={item.orderItemThumbnail || "/placeholder.png"}
        className="w-[100px] h-[100px] object-cover rounded"
        alt={item.orderItemName}
      />
      <div className="flex flex-col ml-2">
        <p className="text-sm font-semibold">{item.orderItemName}</p>

        {item.orderItemOptions.map((option, index) => (
          <p key={index} className="text-xs text-grey2">
            {option.name}: {option.value}
          </p>
        ))}

        <p className="text-xs text-grey2">수량: {item.orderItemQuantity}개</p>
        <p className="text-sm font-bold">
          {new Intl.NumberFormat("ko-KR").format(item.orderItemAmount)}원
        </p>
      </div>
    </div>
  );
}

export default OrderItemDisplay;
