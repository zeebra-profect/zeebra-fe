// import Header from "./common/header/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout1 from "./common/layout/Layout1";
import Layout2 from "./common/layout/Layout2";
import Layout3 from "./common/layout/Layout3";
import Main from "./pages/main/Main";
import MyPage from "./pages/main/MyPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import CartPage from "./pages/cart/CartPage";
import Layout4 from "./common/layout/Layout4";
import OrderPage from "./pages/order/OrderPage";
import OrderResultPage from "./pages/order/OrderResultPage";
import Signup from "./pages/users/Signup";
import Login from "./pages/users/Login";
import ShopPage from "./pages/shop/ShopPage";
import Search from "./pages/search/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 레이아웃1: 기본 페이지들 */}
          <Route path="/" element={<Layout1 />}>
            <Route index element={<Main />} />
            <Route path="/product" element={<ProductDetailPage />} />
            <Route
              path="/order/result"
              element={<OrderResultPage result={false} />}
            />
            <Route path="/shopPage" element={<ShopPage />} />
            {/* 레이아웃2: 마이페이지 내의 페이지들 */}
            <Route path="mypage" element={<Layout2 />}>
              <Route index element={<MyPage />} />
            </Route>
            <Route element={<Layout3 />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route element={<Layout4 />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
            </Route>
          </Route>
          <Route path="/search" element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
