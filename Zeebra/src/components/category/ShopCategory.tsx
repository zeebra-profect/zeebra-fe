import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["전체", "상의", "하의", "아우터", "신발"]; // 데이터 오면 api로 받아올 예정

function ShopCategory() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("전체");

  const categoryHandle = (category: string) => {
    if (category !== "전체") {
      navigate(`/shopPage/results?keyword=${category}`);
    } else {
      navigate(`/shopPage`);
    }
  };

  return (
    <div className="relative flex flex-col w-full mt-6">
      <div className="absolute w-full left-1/2 -translate-x-1/2 bottom-0 border-b border-gray-300 z-0" />
      <div className="relative flex flex-row items-start w-full gap-6 max-w-[1200px] mx-auto z-10">
        {categories.map((cat) => {
          const active = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelected(cat);
                categoryHandle(cat);
              }}
              className={[
                "pb-2 -mb-px",

                active
                  ? "text-black font-bold"
                  : "text-gray-600 hover:text-black",

                active
                  ? "border-b-4 border-black"
                  : "border-b-2 border-transparent hover:border-gray-400",

                "transition-all duration-200",
              ].join(" ")}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ShopCategory;
