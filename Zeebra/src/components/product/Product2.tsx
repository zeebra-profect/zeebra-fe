import testImg from "../../img/test/testImg.png"
import like from "../../img/icons/like.png"

function Product2()
{
    return(
        <div className="max-w-[238px] max-h-[297px] flex flex-col gap-y-[8px]">
            <img src={testImg} />
            <div className="flex flex-col gap-y-[5px] font-pretendard text-main-text">
                <div className="flex flex-row justify-between">
                    <p className="font-light text-xs">
                        무신사 스탠다드 시티 레저 후드 라이트 다...
                    </p>
                    <button>
                        <img src={like} className="w-[15px] h-[13px] mr-6" />
                    </button>
                </div>
                <p className="font-semibold text-xs">
                    111,000원
                </p>
                <p className="font-light text-xs text-grey2">
                    관심 2.4만  · 리뷰 519  · 거래 3,815
                </p>
            </div>
        </div>
    )
}

export default Product2;