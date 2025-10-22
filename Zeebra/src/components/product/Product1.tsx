import testImg from "../../img/test/testImg.png"

function Product1()
{
    return(
        <div className="w-[200px] h-[240px]">
            <img src={testImg} className="w-[200px] h-[200px]"/>
            <div className="max-h-[40px]">
                <p className="font-light text-main-text text-xs font-pretendard">
                    송지오지제로 러브 팬서 크루넥 멜란지
                </p>
                <div className="flex flex-row gap-x-[5px] text-xs font-pretendard">
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