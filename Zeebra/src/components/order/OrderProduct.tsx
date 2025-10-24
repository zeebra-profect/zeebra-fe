function OrderProduct() {
  return (
    <>
          <hr className="text-grey"/>
      <div className="p-5 flex flex-row">
        <img className="h-25 w-25" src="" />
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col ml-3 text-left">
            <p className="font-normal text-lg">
              Nike Air Force 1 ‘07 Low White
            </p>
            <pre className="font-light text-sm/4">
              {`나이키 에어포스 1 ‘07 로우 화이트
315122-111/CW2288-111`}
            </pre>
            <p className="font-bold text-sm">255</p>
          </div>
          <p className="font-semibold text-lg">123,456원</p>
        </div>
      </div>
    </>
  );
}

export default OrderProduct;
