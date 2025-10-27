import { useState } from "react";

const CategoryOptions = [
  { name: "상의" },
  { name: "하의" },
  { name: "아우터" },
  { name: "원피스" },
  { name: "신발" },
  { name: "가방" },
  { name: "악세사리" },
  { name: "바람막이" },
  { name: "경량 패딩" },
];

function Category() {
  const [selected, setSelected] = useState<string[]>([]); // 어떤 버튼이 눌렸는지 저장

  const toggleSelect = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-base mb-2">카테고리</p>
      <div className="flex flex-row flex-wrap gap-2 items-center ">
        {CategoryOptions.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => toggleSelect(cat.name)} // 클릭 시 선택값 변경
            className={`w-fit h-fit px-2 rounded-2xl border transition
                ${
                  selected.includes(cat.name)
                    ? "bg-main-text text-main-bg border-main-text"
                    : "bg-grey text-main-text border-grey"
                }`}
          >
            <p className="font-extralight text-[12px] font-family-pretendard">
              {cat.name}
            </p>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <button className="border-1 border-grey rounded-[.5rem] font-extralight text-sm w-3/4">
          더보기
        </button>
      </div>
      <hr className="my-2 text-grey" />
    </div>
  );
}

export default Category;
