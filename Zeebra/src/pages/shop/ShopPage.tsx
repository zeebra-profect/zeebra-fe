import { Outlet } from "react-router-dom";
import ShopCategory from "@/components/category/ShopCategory";
// import SubCategory from "../../components/category/SubCategory"; 나중에 다시 부활시키기
import SortBtn from "@/components/btn/SortBtn";
import SortFilter from "@/components/filter/SortFilter";

function ShopPage() {
  return (
    <div className="flex flex-col  w-full lg:w-[1200px]  ">
      <div className="flex flex-col items-center gap-y-6">
        <h1 className="text-2xl font-semibold">SHOP</h1>
        <ShopCategory />
        {/* <SubCategory /> 나중에 열기 */}
        <SortBtn />
      </div>
      <SortFilter />
      <Outlet />
    </div>
  );
}

export default ShopPage;
