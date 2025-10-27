import { useState } from "react";
import OrderHistory from "../../components/order/OrderHistory";

function OrderHistoryPage() {

    //true면 구매 완료 탭
    const [tab, setTab] = useState<boolean>(false);

  return (
    <>
      <div className="w-[900px] h-auto flex flex-col font-pretendard text-main-text items-center">
        <p className="text-center font-extrabold text-3xl">구매 내역</p>
        <div className="flex flex-row mt-10 pl-5 pr-5 mb-5 items-end">
          <div className={!tab ? "cursor-pointer flex flex-col items-center min-w-[450px] border-b-3 border-main-text font-bold"
            : "cursor-pointer flex flex-col items-center min-w-[450px] border-b border-main-text"
          }
          onClick={() => setTab(false)}>
            <p>3</p>
            <p>구매중</p>
          </div>
          <div className={tab ? "cursor-pointer flex flex-col items-center min-w-[450px] border-b-3 border-main-text font-bold"
            : "cursor-pointer flex flex-col items-center min-w-[450px] border-b border-main-text"
          }
          onClick={() => setTab(true)}>
            <p>1</p>
            <p>구매 완료</p>
          </div>
        </div>
        <div className="flex flex-row gap-x-5 mb-5">
            <button className="button-smallButton">1개월</button>
            <button className="button-smallButton">3개월</button>
            <button className="button-smallButton">6개월</button>
            <button className="button-smallButton">전체</button>
        </div>
        <div className="flex flex-col gap-y-3 w-full items-center">
            <OrderHistory/>
            <OrderHistory/>
        </div>
      </div>
    </>
  );
}

export default OrderHistoryPage;
