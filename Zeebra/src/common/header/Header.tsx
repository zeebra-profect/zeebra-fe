import searchIcon from "../../../public/img/icons/search.png";
import bagIcon from "../../../public/img/icons/bag.png";

export default function Header() {
    return(
        <>
        <div className="z-[3px] w-full min-h-[130px] max-h-[130px] font-pretendard fixed flex flex-col items-center
  bg-main-bg border-b border-grey">
            <div className="relative justify-end min-w-[1200px] max-w-[1200px] min-h-[40px] max-h-[40px] flex font-pretendard text-xs tracking-tight font-light">
                <div className="flex flex-row gap-x-[22px]">
                    <p>채팅방</p>
                    <p>마이페이지</p>
                    <p>관심</p>
                    <p>알림</p>
                    <p>로그인</p>
                </div>
            </div>
            <div className="w-[1200px] max-h-[36px] display-inline flex flex-row justify-between items-center">
                <p className="font-pretendard text-4xl font-black text-main-text">
                    ZEEBRA
                </p>
                <div className="font-pretendard text-2xl flex flex-row gap-x-[24px] text-main-text items-center">
                    <p className="hover:font-bold active:font-bold w-[70px]">
                        HOME
                    </p>
                    <p className="hover:font-bold active:font-bold w-[70px]">
                        SHOP
                    </p>
                    <img src={bagIcon} className="w-[22px] h-[19px]">
                    </img>
                </div>
            </div>
            <div className="w-[1200px] flex-row flex items-center justify-end gap-x-[5px] mt-auto">
                    <input type="text" id="search-input" name="search-input"
                    className="border-b-3 outline-none w-[200px] relative left-5
                    placeholder:text-grey" />
                    <button>
                        <img src={searchIcon} alt="searchIcon" className="w-[15px] h-[15px]">
                        </img>
                    </button>
            </div>
        </div>
        </>
    )
}