import { Outlet } from 'react-router-dom';
import Header from "../header/Header";
import Footer from '../footer/Footer';

// 기본 레이아웃

function Layout1()
{
    return(
        <>
            <div className="fixed">
                <Header></Header>
            </div>
            <div className="flex justify-center flex-row font-pretendard pt-[130px]">
                <div className="w-max-[1200px]">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Layout1;
