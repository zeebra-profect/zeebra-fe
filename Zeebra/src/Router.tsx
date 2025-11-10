import React, { Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { selectAuthLoading, selectIsAuthed } from "@/store/authSlice";
import Main from "@/pages/main/Main";
import Layout1 from "./common/layout/Layout1";
import Layout2 from "./common/layout/Layout2";
import Layout3 from "./common/layout/Layout3";
import Layout4 from "./common/layout/Layout4";

const MyPage = React.lazy(() => import("./pages/main/MyPage"));
const ProductDetailPage = React.lazy(
  () => import("./pages/product/ProductDetailPage")
);
const CartPage = React.lazy(() => import("./pages/cart/CartPage"));
const OrderPage = React.lazy(() => import("./pages/order/OrderPage"));
const OrderResultPage = React.lazy(
  () => import("./pages/order/OrderResultPage")
);
const Signup = React.lazy(() => import("./pages/users/Signup"));
const Login = React.lazy(() => import("./pages/users/Login"));
const OrderHistoryPage = React.lazy(
  () => import("./pages/myPage/OrderHistoryPage")
);
const ShopPage = React.lazy(() => import("./pages/shop/ShopPage")); // ShopPage 자체도 lazy 가능
const ShopContent = React.lazy(() => import("./pages/shop/ShopContent")); // ShopPage를 lazy화하면 필요 없을 수 있음
const ShopResultsPage = React.lazy(
  () => import("@/pages/shop/ShopResultsPage")
);
const Search = React.lazy(() => import("@/pages/search/Search"));
const InfoPage = React.lazy(() => import("./pages/myPage/InfoPage"));
const FavoritePage = React.lazy(() => import("@/pages/favorite/FavoritePage"));

function ProtectedRoute() {
  const loading = useAppSelector(selectAuthLoading);
  const isAuthed = useAppSelector(selectIsAuthed);
  console.log(loading, isAuthed);

  if (loading) {
    // 💡 임시 로딩 UI를 반환하여, 'loading' 중인지 '오류'인지 확인
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        인증 정보를 확인 중입니다...
      </div>
    );
  }

  // loading이 false이고 인증되지 않았다면 로그인 페이지로 리다이렉트
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
}

function AppRouter() {
  return (
    <Suspense fallback={<div>물건을 마음껏 zeebra</div>}>
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Main />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="/orders/result/:orderId" element={<OrderResultPage />} />
          <Route path="shopPage" element={<ShopPage />}>
            {/* 1. URL: /shopPage (메인 페이지 내용) */}
            <Route index element={<ShopContent />} />

            {/* 2. URL: /shopPage/results (검색 결과 페이지) */}
            <Route path="results" element={<ShopResultsPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="favorite" element={<FavoritePage />}></Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<CartPage />} />
          </Route>

          {/* 🔒 보호 라우트: 마이페이지 */}

          <Route element={<ProtectedRoute />}>
            <Route path="mypage" element={<Layout2 />}>
              <Route index element={<MyPage />} />
              <Route path="info" element={<InfoPage />} />
              <Route path="orderHistory" element={<OrderHistoryPage />} />
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
              <Route path="orders/:orderId" element={<OrderPage />} />
            </Route>
          </Route>

          {/* 별도 라우트 */}
        </Route>
        <Route path="/search" element={<Search />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
