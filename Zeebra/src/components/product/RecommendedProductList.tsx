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
      <div className="flex flex-col justify-center items-center px-4 md:px-0">
        <p className="text-lg md:text-xl font-medium">추천 상품</p>
        <div className="flex flex-row gap-x-2 md:gap-x-3 gap-y-4 md:gap-y-5 mt-4 md:mt-5 w-full lg:max-w-[1200px] flex-wrap justify-center lg:justify-start">
          {products.map((product) => (
            <Product3 key={product.id} />
          ))}
        </div>
        {products.length < maxProducts && (
          <button className="button-productDetail !mt-6 md:mt-10!" onClick={more}>
            더보기
          </button>
        )}
      </div>
    </>
  );
}

export default RecommendedProductList;