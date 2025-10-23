import ProductMainImg from "../../components/product/ProductMainImg";
import ProductInfo from "../../components/product/ProductInfo";
import RecommendedProductList from "../../components/product/RecommendedProductList";
import ProductDetailImg from "../../components/product/ProductDetailImg";
import ReviewList from "../../components/review/ReviewList";

function ProductDetailPage()
{
    return(
        <div className="flex flex-col w-[1200px] gap-y-[30px]">
            <div className="flex flex-row justify-center gap-x-[40px]">
                <ProductMainImg/>
                <div className="h-[865px] w-px bg-grey"></div>
                <ProductInfo/>
            </div>
            <RecommendedProductList/>
            <ProductDetailImg/>
            <ReviewList/>
        </div>
    )
}

export default ProductDetailPage;