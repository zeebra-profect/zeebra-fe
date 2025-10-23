import Banner from "../../components/banner/Banner";
import LargeBanner from "../../components/banner/LargeBanner";
import MainCategoryList from "../../components/category/MainCategoryList";
import Product1List from "../../components/product/Product1List";
import Product2List from "../../components/product/Product2List";

function Main()
{
    return (
        <>
        <div className="flex flex-col gap-y-[30px]">
        <LargeBanner/>
        <MainCategoryList/>
        <Banner/>
        <Product1List/>
        <Banner/>
        <Product2List/>
        </div>
        </>
    )
}

export default Main;
