import ProductMainImg from "../../components/product/ProductMainImg";
import ProductInfo from "../../components/product/ProductInfo";
import RecommendedProductList from "../../components/product/RecommendedProductList";
import ProductDetailImg from "../../components/product/ProductDetailImg";
import ReviewList from "../../components/review/ReviewList";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProduct } from "@/store/productSlice";
import { useEffect, useState } from "react";
import ProductColorOptionList from "@/components/product/ProductColorOptionList";

function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product?.data);
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    if (params.productId) {
      dispatch(fetchProduct(Number(params.productId)));
    }
  }, [params.productId, dispatch]);

  useEffect(() => {
    // console.log("product: ", product);
    if (product?.colorValue) {
      setSelectedColor(product.colorValue);
    }
  }, [product]);

  return (
    <div className="flex flex-col w-full lg:w-[1200px] gap-y-[30px]">
      <div className="flex flex-col lg:flex-row justify-center gap-y-6 lg:gap-x-10">
        <div className="flex flex-col gap-y-5">
          {product?.images ? (
            <ProductMainImg imgs={product.images} />
          ) : (
            <ProductMainImg imgs={null} />
          )}
          {product?.colorOptionResponses != null ? (
            <ProductColorOptionList
              colorOptionResponses={product.colorOptionResponses}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          ) : null}
        </div>
        <div className="hidden lg:block h-[865px] w-px bg-grey"></div>
        <ProductInfo productInfo={product} selectedColor={selectedColor}/>
      </div>
      <RecommendedProductList />
      {product?.images ? <ProductDetailImg imgs={product.images} /> : null}
      <ReviewList reviewCount={product?.reviewCount} />
    </div>
  );
}

export default ProductDetailPage;