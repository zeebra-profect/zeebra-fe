import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSuggestions } from "@/utils/search"; // ✅ 추가된 함수 import

function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  // ✅ 추천 검색어 목록 상태 추가
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 드롭다운 닫기 로직 (기존 유지)
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // ✅ 검색어 입력 시 API 호출 (디바운싱 적용)
  useEffect(() => {
    // 검색어가 없으면 추천 목록 비우기
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    // 0.3초 기다렸다가 요청 보내기
    const timer = setTimeout(async () => {
      const results = await getSuggestions(searchTerm);
      setSuggestions(results);
    }, 300);

    return () => clearTimeout(timer); // 타이머 정리 (Clean-up)
  }, [searchTerm]);

  const clear = () => {
    setOpen(false);
    setSearchTerm("");
    setSuggestions([]); // ✅ 목록도 초기화
    inputRef.current?.focus();
  };

  // ✅ 검색 실행 함수 (직접 입력 or 추천어 클릭 공통 사용)
  const executeSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    setOpen(false);
    console.log("📢 검색 이동:", keyword);
    navigate(`/shopPage?keyword=${encodeURIComponent(keyword.trim())}`);
  };

  const handleEnter = () => {
    executeSearch(searchTerm);
  };

  return (
    <div className="w-full h-screen items-center flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="w-fit h-fit mt-5 ml-auto mr-[10vh] cursor-pointer"
        aria-label="취소"
      >
        취소
      </button>

      <div className="relative w-[90%] mt-10" ref={wrapRef}>
        <input
          ref={inputRef}
          maxLength={50}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setOpen(true);
          }}
          value={searchTerm}
          type="text"
          className="border-b-3 h-[5vh] w-full font-bold text-2xl placeholder:text-grey placeholder:font-base outline-none"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter") handleEnter();
          }}
          placeholder="브랜드, 상품 등"
          aria-expanded={open}
        />

        {searchTerm && (
          <div className="flex flex-row">
            <button
              type="button"
              className="absolute top-3 right-10 text-main-text hover:text-main-text z-50 cursor-pointer"
              onClick={handleEnter}
              aria-label="검색"
            >
              검색
            </button>
            <button
              type="button"
              className="absolute top-3 right-3 text-main-text hover:text-main-text z-50 cursor-pointer"
              onClick={clear}
              aria-label="검색어 지우기"
            >
              ✕
            </button>
          </div>
        )}

        {/* ✅ 추천 검색어 목록 (Dropdown) */}
        {open && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-grey rounded-b-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-main-text text-lg font-medium truncate"
                // 클릭 시 해당 추천어로 검색 실행
                onClick={() => {
                  setSearchTerm(item); // 입력창 업데이트
                  executeSearch(item); // 검색 실행
                }}
                // 베이직 같은 검색어 강조 (선택사항)
                dangerouslySetInnerHTML={{
                  __html: item.replace(
                    new RegExp(`(${searchTerm})`, "gi"),
                    `<span class="text-brand-color">$1</span>`
                  ),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
