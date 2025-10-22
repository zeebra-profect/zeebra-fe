import notion from "../../img/icons/notion.png"
import git from "../../img/icons/git.png"
import jira from "../../img/icons/jira.png"

function Footer()
{
    return (
        <div className="w-full h-[570px] mt-[50px] border-t border-grey flex flex-col items-center">
            <div className="w-[1200px] max-h-[250px] mt-[50px] mb-[50px] flex flex-row gap-x-[80px]">
                <div className="flex flex-col gap-y-[16px] font-pretendard">
                    <p className="font-bold text-base text-main-text">
                        이용안내
                    </p>
                    <p className="font-light text-sm text-grey2">
                        검수기준
                    </p>
                    <p className="font-light text-sm text-grey2">
                        이용정책
                    </p>
                    <p className="font-light text-sm text-grey2">
                        패널티 정책
                    </p>
                    <p className="font-light text-sm text-grey2">
                        커뮤니티 가이드라인
                    </p>
                </div>
                <div className="flex flex-col gap-y-[16px] font-pretendard">
                    <p className="font-bold text-base text-main-text">
                        고객지원
                    </p>
                    <p className="font-light text-sm text-grey2">
                        공지사항
                    </p>
                    <p className="font-light text-sm text-grey2">
                        서비스 소개
                    </p>
                    <p className="font-light text-sm text-grey2">
                        스토어 안내
                    </p>
                    <p className="font-light text-sm text-grey2">
                        판매자 방문접수
                    </p>
                </div>
                <div className="flex flex-col gap-y-[16px] font-pretendard ml-[500px]">
                    <p className="font-bold text-base text-main-text">
                        고객센터 1111-2222
                    </p>
                    <p className="font-light text-sm text-grey2">
                        운영시간 평일 10:00 - 18:00 (토 · 일, 공휴일 휴무)
                        <br></br>
                        점심시간 평일 13:00 - 14:00
                    </p>
                    <p className="font-light text-sm text-main-text">
                        1:1 문의하기는 앱에서만 가능합니다.
                    </p>
                    <button className="w-[100px] h-[35px] bg-main-text text-xs text-main-bg cursor-pointer">
                        자주 묻는 질문
                    </button>
                </div>
            </div>
            <div className="w-[1200px] flex flex-row gap-x-[400px] border-t border-grey">
                <div className="max-h-[250px] max-w-[630px] pt-[30px] flex flex-col gap-y-[10px] font-pretendard">
                    <div className="flex flex-row gap-x-[20px]">
                        <p className="text-sm text-main-text font-extralight">
                            회사소개
                        </p>
                        <p className="text-sm text-main-text font-extralight">
                            인재채용
                        </p>
                        <p className="text-sm text-main-text font-extralight">
                            제휴제안
                        </p>
                        <p className="text-sm text-main-text font-extralight">
                            이용약관
                        </p>
                        <p className="font-bold text-sm text-main-text">
                            개인정보처리방침
                        </p>
                    </div>
                    <p className="text-xs font-light text-grey2 font-pretendard pt-[20px]">
                        지브라 주식회사 · 대표 ㅁㅁㅁ    사업자등록번호 : 123-45-67891  사업자정보확인    통신판매업 : 제 2025-ㅇㅇㅇㅇC-0001호 <br/>
                        사업장소재지 : 서울특별시 강남구 ~~~    호스팅 서비스 : ~~~    전화 : 1111-2222 <br/>
                        이메일 : help@zeebra.com
                    </p>
                    <p className="text-xs font-medium text-main-text font-pretendard pt-[20px]">
                        ㅇㅇ은행 채무지급보증 안내
                    </p>
                    <p className="text-xs font-light text-grey2 font-pretendard">
                        당사는 고객님의 현금 결제 금액에 대해 신한은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다. 서비스가입 사실 확인
                    </p>
                    <p className="text-xs font-light text-grey2 font-pretendard">
                    ZEEBRA는 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은 개별판매자가 등록한 상품으로 상품, 상품정보, 거래에 관한<br/>
                    의무와 책임은 각 판매자에게 있습니다. 단, 이용약관 및 정책, 기타 거래 체결 과정에서 고지하는 내용 등에 따라 검수하고 보증하는 내용<br/>
                    에 대한 책임은 ZEEBRA에 있습니다.
                    </p>
                </div>
                <div className="max-h-[250px] max-w-[570px] pt-[30px] flex flex-col gap-y-[10px] font-pretendard justify-between">
                    <div className="flex flex-row gap-x-[40px] items-center">
                        <img src={notion} className="w-[28px] h-[29px]"/>
                        <img src={git} className="w-[30px] h-[30px]"/>
                        <img src={jira} className="w-[28px] h-[28px]"/>
                    </div>
                    <p className="text-xs font-light text-grey2 font-pretendard">
                       © ZEEBRA Corp. 
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Footer;