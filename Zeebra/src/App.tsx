// App.tsx
import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";

import Layout1 from "./common/layout/Layout1";
import Layout2 from "./common/layout/Layout2";
import Layout3 from "./common/layout/Layout3";
import Layout4 from "./common/layout/Layout4";

import Main from "./pages/main/Main";
import MyPage from "./pages/main/MyPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import CartPage from "./pages/cart/CartPage";
import OrderPage from "./pages/order/OrderPage";
import OrderResultPage from "./pages/order/OrderResultPage";
import Signup from "./pages/users/Signup";
import Login from "./pages/users/Login";
import OrderHistoryPage from "./pages/myPage/OrderHistoryPage";
import ShopPage from "./pages/shop/ShopPage";
import Search from "./pages/search/Search";
import InfoPage from "./pages/myPage/InfoPage";

// 🔽 Redux hooks/selectors
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  refetchMe,
  selectAuthLoading,
  selectIsAuthed,
} from "@/store/authSlice";

// 🔒 라우트 가드
function ProtectedRoute() {
  const loading = useAppSelector(selectAuthLoading);
  const isAuthed = useAppSelector(selectIsAuthed);
  if (loading) return null; // 초기 세션 동기화 중이면 렌더 지연
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const dispatch = useAppDispatch();

  // ✅ 앱 시작 시 쿠키 기반 세션 동기화
  useEffect(() => {
    dispatch(refetchMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* 레이아웃1: 기본 페이지들 */}
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Main />} />
          <Route path="product" element={<ProductDetailPage />} />
          <Route
            path="order/result"
            element={<OrderResultPage result={false} />}
          />
          <Route path="shopPage" element={<ShopPage />} />

          {/* 🔒 보호 라우트: 마이페이지 */}
          <Route element={<ProtectedRoute />}>
            <Route path="mypage" element={<Layout2 />}>
              <Route index element={<MyPage />} />
              <Route path="info" element={<InfoPage />} />
              <Route path="orderhistory" element={<OrderHistoryPage />} />
            </Route>
          </Route>

          {/* 레이아웃3: 로그인/회원가입 (공개) */}
          <Route element={<Layout3 />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* 🔒 보호 라우트: 장바구니/주문 */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout4 />}>
              <Route path="cart" element={<CartPage />} />
              <Route path="order" element={<OrderPage />} />
            </Route>
          </Route>
        </Route>

        {/* 별도 라우트 */}
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
