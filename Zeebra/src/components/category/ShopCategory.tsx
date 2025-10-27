import { useState } from "react";

// 나중에 props로 받을 예정
const categories = ["전체", "상의", "하의", "아우터", "신발", "가방", "시계"];

function ShopCategory() {
  const [selected, setSelected] = useState<string>("전체");

  return (
    <div className="relative flex flex-col w-full mt-6">
      {/* ✅ 밑줄: 화면 끝까지 */}
      <div className="absolute w-full left-1/2 -translate-x-1/2 bottom-0 border-b border-gray-300 z-0" />

      {/* 카테고리 버튼들 */}
      <div className="relative flex flex-row items-start w-full gap-6 max-w-[1200px] mx-auto z-10">
        {categories.map((cat, idx) => {
          const active = selected === cat;
          return (
            <button
              key={idx}
              onClick={() => setSelected(cat)}
              className={[
                // 배치/여백
                "pb-2 -mb-px",
                // 텍스트
                active
                  ? "text-black font-bold"
                  : "text-gray-600 hover:text-black",
                // 밑줄 (활성만 두껍게)
                active
                  ? "border-b-4 border-black"
                  : "border-b-2 border-transparent hover:border-gray-400",
                // 전환
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
