import { Outlet } from 'react-router-dom';
import Header from "../header/Header";

// 기본 레이아웃

function Layout1()
{
    return(
        <>
            <div className="fixed">
                <Header></Header>
            </div>
            <div className="flex justify-center">
                <div className="w-max-[1200px]">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Layout1;
