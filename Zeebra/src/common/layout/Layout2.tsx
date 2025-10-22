import { Outlet } from 'react-router-dom';
import Header from "../header/Header";

// 마이페이지 레이아웃

function Layout2()
{
    return (
        <>
        <Header></Header>
        <Outlet/>
        </>
    )
}

export default Layout2;