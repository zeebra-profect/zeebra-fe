import OrderProduct from "../../components/order/OrderProduct";
import ResultSummary from "../../components/order/ResultSummary";

function OrderResultPage({ result }: { result: boolean }) {
  const currentDate = new Date().toLocaleString("ko-KR");
  const failComment = `결제에 실패했습니다. 다시 시도해주세요.
  실패 사유: 12312`;

  return (
    <>
      <div className="flex flex-col w-full max-w-[660px] text-center text-main-text">
        <p className="font-extrabold text-3xl">
          주문 {result ? `완료` : `실패`}
        </p>
        <div className="flex flex-col items-center mt-10 p-5 mb-2.5 border border-solid border-grey rounded-[10px]">
          <p className="text-lg font-normal">
            {result ? `주문이 완료되었습니다.` : `주문에 실패하였습니다.`}
          </p>
          <pre className="text-base font-normal">
            {result
              ? `${currentDate} 주문하신 상품의 주문번호는 ~~~입니다.`
              : failComment}
          </pre>
          <div className="flex flex-col text-left w-full mt-6">
            <p className="text-base font-semibold mb-2.5">주문 상품</p>
            <OrderProduct />
            <OrderProduct />
            <OrderProduct />
            {
              result ?
              <ResultSummary />
              : null
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderResultPage;
