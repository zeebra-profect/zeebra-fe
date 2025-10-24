import Category from "./Category";

function MainCategoryList()
{
    return (
        <div className="flex flex-row gap-x-4 md:gap-x-6 lg:gap-x-[30px] gap-y-4 md:gap-y-5 w-full max-w-[1200px] flex-wrap justify-center md:justify-start">
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
        </div>
    )
}

export default MainCategoryList;