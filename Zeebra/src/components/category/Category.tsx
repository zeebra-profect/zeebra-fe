import testImg from "../../img/test/testImg.png"

function Category()
{
    return(
        <div className="max-w-[120px] max-h-[143px] flex flex-col justify-center gap-y-[9px] text-center">
            <img src={testImg} className="max-w-[120px] max-h-[120px]">
            </img>
            <p className="text-main-text font-pretendard font-light text-xs">
                카테고리명
            </p>
        </div>
    )
}

export default Category;