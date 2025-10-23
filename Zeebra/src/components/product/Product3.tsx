import testImg from "../../img/test/testImg.png";

function Product3() {
  return (
    <div className="max-h-[250px] md:max-h-[297px] flex flex-col gap-y-[8px]">
      <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] lg:max-w-[230px] lg:max-h-[230px] bg-gray-100 rounded-[10px] flex-shrink-0">
        <img src={testImg} className="w-full h-full object-cover rounded-[10px]" />
      </div>
      <div className="flex flex-col gap-y-[5px] font-pretendard text-main-text line-height">
        <p className="font-bold text-[10px] md:text-xs">275</p>
        <p className="font-normal text-[10px] md:text-xs/3 line-clamp-2">Nike Air Force 1 '07 Low White</p>
        <p className="font-bold text-xs md:text-sm/5">
            110,000원
        </p>
      </div>
    </div>
  );
}

export default Product3;