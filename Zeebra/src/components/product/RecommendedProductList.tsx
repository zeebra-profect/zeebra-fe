import { useState } from "react";
import Product3 from "./Product3";

interface Product3Type {
  id: number;
  // name : string;
  // price : number;
  // size : number;
  // img : string;
}

function RecommendedProductList() {
  const initialState = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const [products, setProducts] = useState<Product3Type[]>(initialState);
  const maxProducts = 10;

  const more = () => {
    const newProducts = [
      ...products,
      { id: products.length + 1 },
      { id: products.length + 2 },
      { id: products.length + 3 },
      { id: products.length + 4 },
      { id: products.length + 5 },
    ];
    setProducts(newProducts);
  };

  return (
    <>
      <hr className="text-grey" />
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl font-medium">추천 상품</p>
        <div className="flex flex-row gap-x-[12px] gap-y-[20px] mt-[20px] max-w-[1200px] flex-wrap">
          {products.map((product) => (
            <Product3 key={product.id} />
          ))}
        </div>
        {products.length < maxProducts && (
          <button className="button-productDetail !mt-[40px]" onClick={more}>
            더보기
          </button>
        )}
      </div>
    </>
  );
}

export default RecommendedProductList;
