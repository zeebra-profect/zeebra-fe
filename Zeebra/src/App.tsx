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
import ShopContent from "./pages/shop/ShopContent";
import ShopResultsPage from "@/pages/shop/ShopResultsPage";
import Search from "@/pages/search/Search";
import InfoPage from "./pages/myPage/InfoPage";
import FavoritePage from "@/pages/favorite/FavoritePage";

// 🔽 Redux hooks/selectors
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  refetchMe,
  selectAuthLoading,
  selectIsAuthed,
} from "@/store/authSlice";
import { fetchFavorites } from "@/store/favoriteSlice";

// 🔒 라우트 가드
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

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsAuthed);
  const authLoading = useAppSelector(selectAuthLoading); // ✅ 추가

  // ✅ 앱 시작 시 쿠키 기반 세션 동기화
  useEffect(() => {
    dispatch(refetchMe());
  }, [dispatch]);

  // ✅ 세션 동기화 완료 후 로그인 상태일 때 관심상품 로드
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      dispatch(fetchFavorites());
    }
  }, [authLoading, isLoggedIn, dispatch]); // ✅ authLoading 의존성 추가

  return (
    <BrowserRouter>
      <Routes>
        {/* 레이아웃1: 기본 페이지들 */}
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Main />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route
            path="order/result"
            element={<OrderResultPage result={false} />}
          />
          <Route path="shopPage" element={<ShopPage />}>
            {/* 1. URL: /shopPage (메인 페이지 내용) */}
            <Route index element={<ShopContent />} />

            {/* 2. URL: /shopPage/results (검색 결과 페이지) */}
            <Route path="results" element={<ShopResultsPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="favorite" element={<FavoritePage />}></Route>
          </Route>

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
              <Route path="orders/:orderId" element={<OrderPage />} />
            </Route>
          </Route>
        </Route>

        {/* 별도 라우트 */}
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
