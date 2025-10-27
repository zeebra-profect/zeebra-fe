import SubCategoryItem from "./SubCategoryItem";

function SubCategory() {
  return (
    <div className="flex flex-row items-center gap-8 w-full max-w-[1200px] justify-center border-b border-gray-300">
      <SubCategoryItem />

      <button className="border-2 w-[4vh] h-[6vh] border-grey text-grey2 cursor-pointer">
        {">"}
      </button>
    </div>
  );
}
export default SubCategory;
