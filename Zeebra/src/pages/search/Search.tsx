import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import RecCategory from "../../components/category/RecCategory";

function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  const clear = () => {
    setOpen(false);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    // 공백이면 무시
    if (searchTerm.trim() === "") return;

    setOpen(false);

    console.log("📢 검색 이동:", searchTerm);

    navigate(`/shopPage?keyword=${encodeURIComponent(searchTerm.trim())}`);
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
          // 5. ✅ Redux dispatch 대신 로컬 state 업데이트
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setOpen(true);
          }}
          value={searchTerm}
          type="text"
          className="border-b-3 h-[5vh] w-full font-bold text-2xl placeholder:text-grey placeholder:font-base outline-none"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="브랜드, 상품 등"
          aria-expanded={open}
        />

        {searchTerm && (
          <div className="flex flex-row">
            <button
              type="button"
              className="absolute top-3 right-10 text-main-text hover:text-main-text z-50 cursor-pointer"
              onClick={handleSearch}
              aria-label="검색"
              // 로딩 상태가 없으므로 disabled 제거
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

        {open && searchTerm && (
          <div
            className="fixed inset-0 z-40 bg-black/0"
            onClick={() => setOpen(false)}
          />
        )}

        {/* 6. ✅ 로딩 UI 삭제 (여기선 로딩 안 하니까) */}
      </div>
    </div>
  );
}

export default Search;
