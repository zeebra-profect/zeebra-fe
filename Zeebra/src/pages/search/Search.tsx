import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type SearchReq } from "@/utils/search";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  searchProducts,
  selectSearchLoading,
  selectSearchTerm,
  setSearchTerm,
} from "@/store/searchSlice";
// import RecCategory from "../../components/category/RecCategory";

function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const q = useAppSelector(selectSearchTerm);
  const loading = useAppSelector(selectSearchLoading);
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
    dispatch(setSearchTerm(""));
    inputRef.current?.focus();
  };

  const handleSearch = async () => {
    if (q.trim() === "" || loading) return;

    setOpen(false);
    const searchTerm = q.trim();
    console.log("📢 실제 검색어:", searchTerm);

    try {
      const form: SearchReq = {
        keyWord: searchTerm,
        categoryIds: null,
        brandIds: null,
        productSort: null,
        page: 0,
        size: 20,
        sort: ["createdAt, desc"],
      };

      const result = await dispatch(searchProducts(form)).unwrap();

      navigate(`/shopPage/results?keyword=${encodeURIComponent(searchTerm)}`, {
        state: { searchData: result },
      });
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      alert("검색 중 오류가 발생했습니다.");
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
          maxLength={50}
          onChange={(e) => {
            dispatch(setSearchTerm(e.target.value));
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
