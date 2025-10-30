import searchIcon from "../../img/icons/search.png";
import bagIcon from "../../img/icons/bag.png";
import NotificationModal from "../../components/notification/NotificationModal";
import ChatModal from "../../components/chat/ChatModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const Navigate = useNavigate();
  const { isAuthed, logout } = useAuth();
  const [isNotiModalOpen, setIsNotiModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    Navigate("/");
  };

  return (
    <>
      <div
        className="z-30 w-full min-h-20 md:min-h-[130px] md:max-h-[130px] font-pretendard fixed flex flex-col items-center
  bg-main-bg border-b border-grey px-4 md:px-0"
      >
        {/* 상단 메뉴 */}
        <div className="relative justify-end w-full lg:min-w-[1200px] lg:max-w-[1200px] min-h-[30px] md:min-h-10 max-h-10 flex font-pretendard text-[10px] md:text-xs tracking-tight font-light">
          <div className="flex flex-row gap-x-3 md:gap-x-[22px]">
            <div className="relative">
              <p
                className="cursor-pointer"
                onClick={() => setIsChatModalOpen(true)}
              >
                채팅방
              </p>
              <ChatModal
                isOpen={isChatModalOpen}
                onClose={() => setIsChatModalOpen(false)}
                // children={undefined}
              />
            </div>
            <p className="cursor-pointer">마이페이지</p>
            <p className="cursor-pointer">관심</p>
            <div className="relative">
              <p
                className="cursor-pointer"
                onClick={() => setIsNotiModalOpen(true)}
              >
                알림
              </p>
              <NotificationModal
                isOpen={isNotiModalOpen}
                onClose={() => setIsNotiModalOpen(false)}
                // children={undefined}
              />
            </div>
            {isAuthed ? (
              <p onClick={handleLogout} className="cursor-pointer">
                로그아웃
              </p>
            ) : (
              <Link to="/login">
                <button className="cursor-pointer">로그인</button>
              </Link>
            )}
          </div>
        </div>

        {/* 메인 헤더 */}
        <div className="w-full lg:w-[1200px] max-h-9 flex flex-row justify-between items-center">
          <Link to="/">
            <p className="font-pretendard text-2xl md:text-3xl lg:text-4xl font-black text-main-text">
              ZEEBRA
            </p>
          </Link>
          <div className="font-pretendard text-lg md:text-xl lg:text-2xl flex flex-row gap-x-3 md:gap-x-6 text-main-text items-center">
            <Link to="/">
              <p className="hover:font-bold active:font-bold w-[50px] md:w-[70px] cursor-pointer">
                HOME
              </p>
            </Link>
            <Link to="/shopPage">
              <p className="hover:font-bold active:font-bold w-[50px] md:w-[70px] cursor-pointer">
                SHOP
              </p>
            </Link>
            <img
              src={bagIcon}
              className="w-[18px] h-4 md:w-[22px] md:h-[19px] cursor-pointer"
            />
          </div>
        </div>

        {/* 검색 바 */}
        <div className="w-full lg:w-[1200px] flex-row flex items-center justify-end gap-x-[5px] mt-auto relative top-px">
          <input
            type="text"
            id="search-input"
            name="search-input"
            className="border-b-3 outline-none w-[120px] md:w-[200px] relative left-5
                    placeholder:text-grey pr-5 text-sm md:text-base"
          />
          <button className="z-[3px] cursor-pointer">
            <img
              src={searchIcon}
              alt="searchIcon"
              className="w-[13px] h-[13px] md:w-[15px] md:h-[15px]"
            />
          </button>
        </div>
      </div>
    </>
  );
}
