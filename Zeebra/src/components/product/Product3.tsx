import testImg from "../../img/test/testImg.png";

function Product3() {
  return (
    <div className="max-h-[297px] flex flex-col gap-y-[8px]">
      <div className="max-w-[230px] max-h-[230px] bg-gray-100 rounded-[10px]">
        <img src={testImg} />
      </div>
      <div className="flex flex-col gap-y-[5px] font-pretendard text-main-text line-height">
        <p className="font-bold text-xs">275</p>
        <p className="font-normal text-xs/3">Nike Air Force 1 ‘07 Low White</p>
        <p className="font-bold text-sm/5">
            110,000원
        </p>
      </div>
    </div>
  );
}

export default Product3;
