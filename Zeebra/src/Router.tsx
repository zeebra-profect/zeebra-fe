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
const ShopPage = React.lazy(() => import("./pages/shop/ShopPage"));
const ShopContent = React.lazy(() => import("./pages/shop/ShopContent"));
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
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        인증 정보를 확인 중입니다...
      </div>
    );
  }

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
            <Route index element={<ShopContent />} />
            <Route path="results" element={<ShopResultsPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="favorite" element={<FavoritePage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="mypage" element={<Layout2 />}>
              <Route index element={<MyPage />} />
              <Route path="info" element={<InfoPage />} />
              <Route path="orderHistory" element={<OrderHistoryPage />} />
            </Route>
          </Route>

          <Route element={<Layout3 />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout4 />}>
              <Route path="orders/:orderId" element={<OrderPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/search" element={<Search />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
