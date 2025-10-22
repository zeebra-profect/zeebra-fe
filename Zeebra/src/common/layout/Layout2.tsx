import { Outlet } from 'react-router-dom';
import Navi from '../navi/Navi';

// 마이페이지 레이아웃

function Layout2()
{
    return (
        <>
            <div className="flex justify-center flex-row gap-x-[50px] font-pretendard text-main-text text-xl pt-[131px]">
                <Navi/>
                <div className="w-[900px]">
                <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Layout2;