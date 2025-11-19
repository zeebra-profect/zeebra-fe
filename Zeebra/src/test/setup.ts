// 📁 src/test/setup.ts

import "@testing-library/jest-dom";
import { vi } from "vitest"; // Vitest의 전역 유틸리티 임포트

// -----------------------------------------------------------
// ✅ [추가] IntersectionObserver 모킹
// -----------------------------------------------------------

// 1. 가짜 IntersectionObserver 클래스를 생성합니다.
// (new IntersectionObserver()가 생성자를 요구하므로 class로 만듭니다.)
type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

class MockIntersectionObserver {
  // 생성자 (인자는 사용하지 않으므로 _로 무시)
  constructor(_callback: IntersectionObserverCallback, _options: unknown) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];
}

// 3. ✅ window.IntersectionObserver를 가짜 클래스로 대체
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
