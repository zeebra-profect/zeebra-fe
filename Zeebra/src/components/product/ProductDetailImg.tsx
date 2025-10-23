import detail1 from "../../img/test/detail1.jpg";
import detail2 from "../../img/test/detail2.jpg";
import detail3 from "../../img/test/detail3.jpg";
import detail4 from "../../img/test/detail4.jpg";
import detail5 from "../../img/test/detail5.jpg";
import detail6 from "../../img/test/detail6.jpg";
import detail7 from "../../img/test/detail7.jpg";
import detail8 from "../../img/test/detail8.jpg";
import detail9 from "../../img/test/detail9.jpg";

import { useState } from "react";

function ProductDetailImg() {
  const detail = [
    detail1,
    detail2,
    detail3,
    detail4,
    detail5,
    detail6,
    detail7,
    detail8,
    detail9,
  ];

  const [imgs, setImgs] = useState<string[]>(detail);
  const [bHeight, setBHeight] = useState<number>(1600);
  const more = () => {
    setBHeight(imgs.length * 1000 + (imgs.length - 1) * 20);
  };

  return (
    <>
      <hr className="text-grey" />
      <div className="flex flex-col items-center gap-y-[20px]">
        <p className="text-xl font-medium">상세 정보</p>
        <div className="w-[1200px] flex flex-col justify-center items-center">
          <div
            className="flex flex-col gap-y-[20px] overflow-hidden"
            style={{ maxHeight: bHeight }}
          >
            {imgs?.map((img, index) => (
              <img key={index} src={img} className="w-[1000px] h-[1000px]" />
            ))}
          </div>
          {bHeight < imgs.length * 1000 + (imgs.length - 1) * 20 && (
            <>
              <div className="relative bottom-20 h-[150px] w-[1200px] bg-linear-to-b from-transparent via-[rgba(255,255,255,0.95)] to-white flex flex-col items-center"></div>
              <button
                className="relative bottom-30 button-productDetail"
                onClick={more}
              >
                상세 정보 더보기
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetailImg;
