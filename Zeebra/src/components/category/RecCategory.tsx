const RecCate = [
  "여성의류",
  "남성의류",
  "신발",
  "가방",
  "패션잡화",
  "뷰티",
  "디지털",
];

function RecCategory() {
  return (
    <div className="flex flex-col flex-wrap items-center mt-[40vh]">
      <p className="font-medium text-xl">2025 추천 카테고리</p>
      <div className="gap-6 flex w-fit flex-wrap ">
        {RecCate.map((cat, idx) => (
          <button
            key={idx}
            className="mt-8 w-[20vh] h-[4vh] text-center border border-grey rounded-lg"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecCategory;
