// import Header from "./common/header/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout1 from "./common/layout/Layout1";
import Layout2 from "./common/layout/Layout2";
import Main from "./pages/mains/Main";
import MyPage from "./pages/mains/MyPage";

 function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* 레이아웃1: 기본 페이지들 */}
        <Route path="/" element={<Layout1/>}>
          <Route index element={<Main/>}/>
        <Route/>
        {/* 레이아웃2: 마이페이지 내의 페이지들 */}
        <Route path="/mypage" element={<Layout2/>}>
          <Route index element={<MyPage/>} >

          </Route>
        </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
