import testImg from "../../img/test/nike4.webp";

function OrderHistoryItem()
{
    return (
        <div className="flex flex-row w-[400px] h-[100px] justify-between items-center p-5 border-t border-grey">
          <img src={testImg} className="w-[100px] h-[100px]" />
          <div className="flex flex-col ml-2">
            <p className="text-xs font-semibold">275</p>
            <p className="text-xs">Nike Air Force 1 ‘07 Low White</p>
            <p className="text-sm font-bold">123,000원</p>
          </div>
        </div>
    )
}

export default OrderHistoryItem