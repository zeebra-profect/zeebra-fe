import { useState } from "react";

const ColorOptions = [
  { name: "블랙", hex: "black" },
  { name: "화이트", hex: "white" },
  { name: "그레이", hex: "gray" },
  { name: "그린", hex: "green" },
  { name: "네이비", hex: "navy" },
  { name: "베이지", hex: "beige" },
  { name: "브라운", hex: "brown" },
  { name: "옐로우", hex: "yellow" },
  { name: "핑크", hex: "pink" },
  { name: "퍼플", hex: "purple" },
  { name: "레드", hex: "red" },
  { name: "블루", hex: "blue" },
];

function Color() {
  const [selected, setSelected] = useState<string>(""); // 어떤 버튼이 눌렸는지 저장

  return (
    <div className="flex flex-col gap-2 my-4">
      <div className="flex flex-row gap-6 items-center">
        <p className="text-sm ">색상</p>
        <p className="text-sm ">선택된 색 : {selected}</p>
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-center my-4 ">
        {ColorOptions.map((color, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(color.name)} // 클릭 시 선택값 변경
            style={{
              backgroundColor: color.hex,
              color: ["white", "beige", "yellow"].includes(color.hex)
                ? "black"
                : "white", // 흰색일 땐 글씨 보이게 조정
            }}
            className="w-fit h-fit px-3 py-1 rounded-2xl"
          >
            <p className="font-base text-[12px] font- font-family-pretendard">
              {color.name}
            </p>
          </button>
        ))}
      </div>
      <hr className="my-2 text-grey" />
    </div>
  );
}

export default Color;
