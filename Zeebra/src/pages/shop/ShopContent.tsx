import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchResultsList from "../search/SearchResultsList";
import { getProducts } from "@/utils/search";
import type { ProductDetailResponse, SearchReq } from "@/utils/search";

const ALL_PRODUCTS_KEYWORD = "";

function ShopContent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductDetailResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.searchData) {
      const searchData = location.state.searchData;
      setProducts(searchData.data.productDetailResponses);
      return;
    }

    const keyword = searchParams.get("keyword");

    if (keyword) {
      fetchProducts(keyword);
    } else {
      fetchProducts(ALL_PRODUCTS_KEYWORD);
    }
  }, [location.state, searchParams]);

  const fetchProducts = async (keyword2: string) => {
    try {
      setLoading(true);
      setError(null);
      const form: SearchReq = {
        keyWord: keyword2,
        categoryIds: null,
        brandIds: null,
        productSort: null,
        pageable: {
          page: 10,
          size: 30,
          sort: "createdAt,desc",
        },
      };

      const response = await getProducts(form);
      setProducts(response.data.productDetailResponses);
    } catch (err) {
      setError("상품 목록을 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <SearchResultsList products={products} loading={loading} error={error} />
    </div>
  );
}

export default ShopContent;
