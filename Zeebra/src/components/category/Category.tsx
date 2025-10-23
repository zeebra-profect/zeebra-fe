import testImg from "../../img/test/testImg.png"

function Category()
{
    return(
        <div className="w-[90px] md:w-[100px] lg:w-[120px] flex flex-col justify-center gap-y-2 lg:gap-y-[9px] text-center cursor-pointer">
            <img src={testImg} className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] object-cover rounded-lg"/>
            <p className="text-main-text font-pretendard font-light text-[10px] md:text-xs">
                카테고리명
            </p>
        </div>
    )
}

export default Category;