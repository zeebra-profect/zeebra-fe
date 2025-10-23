import testImg from "../../img/test/testImg.png"

function Product1()
{
    return(
        <div className="w-[160px] md:w-[180px] lg:w-[200px] h-auto cursor-pointer">
            <img src={testImg} className="w-[160px] h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] object-cover rounded-lg"/>
            <div className="mt-2">
                <p className="font-light text-main-text text-[10px] md:text-xs font-pretendard line-clamp-2">
                    송지오지제로 러브 팬서 크루넥 멜란지
                </p>
                <div className="flex flex-row gap-x-[5px] text-[10px] md:text-xs font-pretendard mt-1">
                    <p className="font-medium text-orange">
                        5%
                    </p>
                    <p className="font-bold text-main-text">
                        284,000원
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Product1;