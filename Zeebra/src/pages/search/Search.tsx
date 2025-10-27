import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecCategory from "../../components/category/RecCategory";

const MOCK_RESULT = [
  "나이키 에어맥스",
  "아디다스 울트라부스트",
  "뉴발란스 990v5",
  "컨버스 척테일러 올스타",
  "푸마 스웨이드 클래식",
  "나이키 에어맥스",
  "나이키 에어맥스",
  "나이키 에어맥스",
  "나이키 에어맥스",
  "나이키 에어맥스",
  "나이키 에어맥스",
];

function Search() {
  const navigate = useNavigate();
  const [q, setQ] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setQ("");

    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  const results = MOCK_RESULT.filter((v) => v.includes(q));

  const clear = () => {
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full h-screen  items-center flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="w-fit h-fit mt-5 ml-auto mr-[10vh]"
      >
        취소
      </button>

      <div className="relative w-[90%] mt-10" ref={wrapRef}>
        <input
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          value={q}
          type="text"
          className="border-b-3 h-[5vh] w-full font-bold text-2xl placeholder:text-grey placeholder:font-base outline-none"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          placeholder="브랜드, 상품 등"
          aria-expanded={open}
          aria-controls="search-panel"
        />
        {q && (
          <button
            type="button"
            className="absolute top-3 right-3 text-grey hover:text-main-text"
            onClick={clear}
            aria-label="검색어 지우기"
          >
            ✕
          </button>
        )}
        {open && q && (
          <div
            className="fixed inset-0 z-40 bg-black/0" // 필요하면 /20 정도로 살짝 어둡게
            onClick={() => setOpen(false)}
          />
        )}

        {open && q && (
          <div
            id="search-panel"
            className="absolute top-full left-0 right-0 mt-2 z-50"
            role="listbox"
          >
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-auto max-h-80">
              {results.length ? (
                <ul>
                  {results.map((item) => (
                    <li key={item}>
                      <button
                        role="option"
                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                        onClick={() => {
                          setQ(item);
                          setOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-6 text-sm text-gray-500">
                  검색 결과가 없어요
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <RecCategory />
    </div>
  );
}

export default Search;
