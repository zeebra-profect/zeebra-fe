import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import RecCategory from "../../components/category/RecCategory";
import { getProducts, type SearchRes } from "@/utils/search";

// ======================================================================
// ⚛️ Search 컴포넌트
// ======================================================================

function Search() {
  const navigate = useNavigate();
  const [q, setQ] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가
  const [searchResults, setSearchResults] = useState<SearchRes | null>(null); // 검색 결과 상태 추가

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
    setSearchResults(null); // 검색어 지울 때 결과도 초기화
    inputRef.current?.focus();
  };

  // 🚀 검색 API 호출 핸들러
  const handleSearch = async () => {
    if (q.trim() === "" || loading) return;

    setOpen(false);
    setLoading(true);

    try {
      const page = 0;
      const size = 10;
      const sortCriteria = ["createdAt,desc"];

      const result = await getProducts(q.trim(), page, size, sortCriteria);

      setSearchResults(result);

      // ✨✨✨ 여기에 결과 페이지 이동 로직 추가 ✨✨✨
      // 1. 쿼리 파라미터로 검색어를 전달하여 이동
      navigate(`/shopPage/results?keyword=${encodeURIComponent(q.trim())}`, {
        state: { searchData: result }, // (선택 사항) API 응답 데이터를 state로 전달
      });
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setSearchResults(null);
    } finally {
      setLoading(false);
      console.log(searchResults);
    }
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
              handleSearch(); // Enter 키로 검색 실행
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
              className="absolute top-3 right-10 text-main-text hover:text-main-text z-50"
              onClick={handleSearch} // 검색 버튼 클릭 시 handleSearch 실행
              aria-label="검색"
              disabled={loading} // 로딩 중 버튼 비활성화
            >
              {loading ? "검색 중..." : "검색"}
            </button>
            <button
              type="button"
              className="absolute top-3 right-3 text-main-text hover:text-main-text z-50"
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
        {/* {searchResults &&
          searchResults.data.productDetailResponses.length > 0 && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <p className="font-bold">검색 결과:</p>
              <ul>
                {searchResults.data.productDetailResponses.map((product) => (
                  <li key={product.productId} className="mt-1 text-sm">
                    [{product.brandId}] {product.productName}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-gray-500">
                총 {searchResults.data.pagination.totalCount}개 상품
              </p>
            </div>
          )} */}
      </div>
      {/* <RecCategory /> */}
    </div>
  );
}

export default Search;
