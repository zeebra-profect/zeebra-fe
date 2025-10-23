import nike1 from "../../img/test/nike1.webp";
import nike2 from "../../img/test/nike2.webp";
import nike3 from "../../img/test/nike3.webp";
import nike4 from "../../img/test/nike4.webp";
import nike5 from "../../img/test/nike5.webp";
import nike6 from "../../img/test/nike6.webp";
import nike7 from "../../img/test/nike7.webp";
import nike8 from "../../img/test/nike8.webp";
import nike9 from "../../img/test/nike9.webp";

import { useState } from "react";

function ProductMainImg() {
  const nike = [nike1, nike2, nike3, nike4, nike5, nike6, nike7, nike8, nike9];

  const [imgs, setImgs] = useState<string[]>(nike);
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
    <div className="pl-[40px] flex flex-col gap-y-[20px]">
      {/* 이미지 창고 */}
      <div className="max-h-[560px] max-w-[560px] flex flex-col justify-center items-center bg-gray-100">
        <div className="flex flex-row">
          <button onClick={changeImgLeft} className="relative left-10">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              className="text-grey2 cursor-pointer"
            >
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <img src={imgs[curImgIdx]} className="max-h-[560px] max-w-[560px]" />
          <button onClick={changeImgRight} className="relative right-10">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              className="text-grey2 cursor-pointer"
            >
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <div className="min-w-[500px] flex flex-row relative bottom-10">
          {imgs.map((img, index) => (
            <div
              key={index}
              style={{ width: `${500 / imgs.length}px` }}
              className={`h-[3px] ${
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
