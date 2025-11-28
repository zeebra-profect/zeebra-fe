import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persister } from "@/store/index";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "@sentry/react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";

Sentry.init({
  // .env 파일에서 DSN 가져오기
  dsn: import.meta.env.VITE_SENTRY_DSN,
  enabled: import.meta.env.PROD,

  integrations: [
    // React Router v6 전용 브라우저 트레이싱 통합
    // (이게 있어야 페이지 이동 시 Transaction이 예쁘게 잡힘)
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),

    // (선택) 에러 발생 시 화면 녹화 (필요 없으면 주석 처리)
    // Sentry.replayIntegration(),
  ],

  // 🚀 성능 데이터 수집 비율 (1.0 = 100%)
  // 개발 중엔 1.0으로 하고, 나중에 운영 배포할 땐 0.1 정도로 줄이는 게 좋음
  tracesSampleRate: 1.0,

  // (선택) Replay 설정
  // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // replacesSampleRate: 0.1,
  // replacesOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
