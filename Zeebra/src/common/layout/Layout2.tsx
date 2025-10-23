import { Outlet } from "react-router-dom";
import Navi from "../navi/Navi";

// 마이페이지 레이아웃

function Layout2() {
  return (
    <>
      <div className="flex justify-center flex-col lg:flex-row gap-y-4 lg:gap-x-[50px] font-pretendard text-main-text text-lg md:text-xl pt-[50px] md:pt-[130px] px-4 md:px-6 lg:px-0">
        <Navi />
        <div className="w-full lg:w-[900px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout2;