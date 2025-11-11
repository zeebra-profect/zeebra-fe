import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, type SearchReq, type SearchRes } from "@/utils/search";
// import RecCategory from "../../components/category/RecCategory";

function Search() {
  const navigate = useNavigate();
  const [q, setQ] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchRes | null>(null);

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
    setQ("");
    setSearchResults(null);
    inputRef.current?.focus();
  };

  const handleSearch = async () => {
    if (q.trim() === "" || loading) return;

    setOpen(false);
    setLoading(true);
    const searchTerm = q.trim();
    console.log("📢 실제 검색어:", searchTerm);

    try {
      const form: SearchReq = {
        keyWord: q,
        categoryIds: null,
        brandIds: null,
        productSort: null,
        pageable: {
          page: 10,
          size: 30,
          sort: "createdAt,desc",
        },
      };

      const result = await getProducts(form);

      setSearchResults(result);

      navigate(`/shopPage/results?keyword=${encodeURIComponent(q.trim())}`, {
        state: { searchData: result },
      });
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setSearchResults(null);
    } finally {
      setLoading(false);
      console.log("검색 결과 : ", searchResults);
    }
  };

  return (
    <div className="w-full h-screen  items-center flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="w-fit h-fit mt-5 ml-auto mr-[10vh] cursor-pointer"
      >
        취소
      </button>

      <div className="relative w-[90%] mt-10" ref={wrapRef}>
        <input
          ref={inputRef}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          value={q}
          type="text"
          className="border-b-3 h-[5vh] w-full font-bold text-2xl placeholder:text-grey placeholder:font-base outline-none"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
            }
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="브랜드, 상품 등"
          aria-expanded={open}
          aria-controls="search-panel"
        />
        {q && (
          <div className="flex flex-row">
            <button
              type="button"
              className="absolute top-3 right-10 text-main-text hover:text-main-text z-50 cursor-pointer"
              onClick={handleSearch}
              aria-label="검색"
              disabled={loading}
            >
              {loading ? "검색 중..." : "검색"}
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
        {open && q && (
          <div
            className="fixed inset-0 z-40 bg-black/0"
            onClick={() => setOpen(false)}
          />
        )}

        {loading && <p className="mt-4 text-lg">상품을 검색 중입니다...</p>}
      </div>
      {/* <RecCategory /> 엘라스틱 서치 적용시 사라짐 */}
    </div>
  );
}

export default Search;
