import { Outlet } from "react-router-dom";

function Layout3() {
  return (
    // 회색 배경(사용자 커스텀 bg-grey 기준), 화면 최소 높이
    <section className="w-full min-h-screen bg-grey flex">
      {/* 중앙 컨테이너: 필요 없으면 이 div 제거 */}
      {/* <div className="max-w-[1200px] w-full mx-auto px-4 py-16">
        <Outlet />
      </div> */}
      <Outlet />
    </section>
  );
}

export default Layout3;
