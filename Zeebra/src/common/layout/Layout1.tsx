import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

// 기본 레이아웃

function Layout1()
{
    return(
        <>
            <div className="static">
                <Header></Header>
            </div>
            <div className="flex justify-center flex-row font-pretendard pt-[100px] md:pt-[150px] px-4 md:px-0">
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default Layout1;