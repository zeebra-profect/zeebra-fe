import { useRef, useState, useEffect } from "react";

const SortOptions = [
  "추천순",
  "관심 많은 순",
  "가격 높은 순",
  "가격 낮은 순",
  "상품 등록 순",
  "리뷰 많은 순",
];

function SortFilter() {
  const [selectedSort, setSelectedSort] = useState<string>("추천순");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        popRef.current &&
        !popRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div className="w-full flex justify-end items-center mb-4 gap-2 px-4">
      <div className="relative inline-block">
        {/* 정렬 버튼 */}
        <button
          ref={btnRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-fit h-fit px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          {selectedSort} ⇅
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div
            ref={popRef}
            className="absolute top-full left-0 mt-2 w-40 rounded-lg border border-gray-200
                       bg-white shadow-lg overflow-hidden z-50"
          >
            <ul className="text-sm text-gray-700">
              {SortOptions.map((opt, idx) => (
                <li
                  key={idx}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedSort(opt);
                    setIsOpen(false);
                  }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SortFilter;
