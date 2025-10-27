import testImg from "../../img/test/nike4.webp";

interface OrderHistoryProps {
    id : number,
    status: string,
    orderTime: string,
}

function OrderHistory({id, status, orderTime} : OrderHistoryProps) {

    status = '배송 전';

  return (
    <>
      <div className="w-9/10 h-[150px] border border-grey rounded-lg flex flex-row p-5 font-pretendard text-main-text justify-between">
        <div className="flex flex-row ml-10 items-center">
          <img src={testImg} className="w-[100px] h-[100px]" />
          <div className="flex flex-col ml-2">
            <p className="text-xs">Nike Air Force 1 ‘07 Low White 외 3개</p>
            <p className="text-sm font-bold">123,000원</p>
          </div>
        </div>
        <div className="flex flex-col mr-10 justify-center items-center text-center gap-y-1">
          <p className="font-light text-xs text-grey2">2025. 10. 14. 12:12 주문{orderTime}</p>
          <p className="text-sm font-bold">{status}</p>
            {
                status === '배송 전' ? (<button className="button-cancelButton">주문 취소</button>) : null 
            }
          <p className="font-light text-xs">상세보기 &gt;</p>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
