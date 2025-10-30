import { useState } from "react";

function ProductMainImg({ imgs }: { imgs: string[] }) {
  const [curImgIdx, setCurImgIdx] = useState<number>(0);
  const changeImgRight = () => {
    setCurImgIdx((prev) => (prev + 1) % imgs.length);
  };

  const changeImgLeft = () => {
    setCurImgIdx((prev) => {
      if (prev === 0) return imgs.length - 1;
      else return (prev - 1) % imgs.length;
    });
  };


  return (
    <div className="pl-0 md:pl-10 flex flex-col gap-y-5">
      {/* 이미지 창고 */}
      <div className="max-h-[350px] max-w-[350px] md:max-h-[450px] md:max-w-[450px] lg:max-h-[560px] lg:max-w-[560px] flex flex-col justify-center items-center bg-gray-100">
        <div className="flex flex-row w-full relative">
          {
            imgs?
            <img
            src={imgs[curImgIdx]}
            className="max-h-[350px] max-w-[350px] md:max-h-[450px] md:max-w-[450px] lg:max-h-[560px] lg:max-w-[560px] object-contain"
            />
            :
            null
          }
          <button onClick={changeImgLeft} className="absolute top-1/2 -translate-y-1/2 z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-grey2 cursor-pointer md:w-[30px] md:h-[30px]"
            >
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button onClick={changeImgRight} className="absolute top-1/2 -translate-y-1/2 z-10 right-0.5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-grey2 cursor-pointer md:w-[30px] md:h-[30px]"
            >
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <div className="w-[300px] md:w-[400px] lg:min-w-[500px] flex flex-row relative bottom-10">
          {imgs.map((img, index) => (
            <div
              key={index}
              style={{ width: `${100 / imgs.length}%` }}
              className={`h-0.5 md:h-[3px] ${
                index === curImgIdx ? "bg-grey2" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductMainImg;
