// import Header from "./common/header/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout1 from "./common/layout/Layout1";
import Layout2 from "./common/layout/Layout2";
import Layout3 from "./common/layout/Layout3";
import Main from "./pages/mains/Main";
import MyPage from "./pages/mains/MyPage";
import Signup from "./pages/users/Signup";
import Login from "./pages/users/Login";
import NotFound from "./pages/etc/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 공통 레이아웃 */}
          <Route path="/" element={<Layout1 />}>
            <Route index element={<Main />} />

            {/* 마이페이지 */}
            <Route path="mypage" element={<Layout2 />}>
              <Route index element={<MyPage />} />
            </Route>

            {/* 로그인/회원가입만 회색 배경 레이아웃3 적용 */}
            <Route element={<Layout3 />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
