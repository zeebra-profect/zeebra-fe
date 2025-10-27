import { useState } from "react";

const genderOptions = [{ name: "남성" }, { name: "여성" }, { name: "키즈" }];

function Gender() {
  const [selected, setSelected] = useState<string[]>([]); // 어떤 버튼이 눌렸는지 저장

  const toggleSelect = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-base mb-2">성별</p>
      <div className="flex flex-row gap-2 items-center">
        {genderOptions.map((gen, idx) => (
          <button
            key={idx}
            onClick={() => toggleSelect(gen.name)} // 클릭 시 선택값 변경
            className={`w-[4vh] h-[2.5vh] rounded-2xl border transition
              ${
                selected.includes(gen.name)
                  ? "bg-main-text text-main-bg border-main-text"
                  : "bg-grey text-main-text border-grey"
              }`}
          >
            <p className="font-extralight text-[12px] font-family-pretendard">
              {gen.name}
            </p>
          </button>
        ))}
      </div>
      <hr className="my-2 text-grey" />
    </div>
  );
}

export default Gender;
