// import { useState } from "react";
import ShopCategory from "../../components/category/ShopCategory";
import SubCategory from "../../components/category/SubCategory";
import SortBtn from "../../components/btn/SortBtn";
import SortFilter from "../../components/filter/SortFilter";
import ShopContent from "./ShopContent";

function ShopPage() {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col  w-full lg:w-[1200px]  ">
      <div className="flex flex-col items-center gap-y-6">
        <h1 className="text-2xl font-semibold">SHOP</h1>
        <ShopCategory />
        <SubCategory />
        <SortBtn />
      </div>
      <SortFilter />
      <ShopContent />
    </div>
  );
}

export default ShopPage;
