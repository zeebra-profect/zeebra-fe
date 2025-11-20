import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { getProducts } from "@/utils/search";
import { vi, describe, test, expect, beforeEach } from "vitest";

// getProducts 라는 함수를 목킹함.
vi.mock("@/utils/search", async (_importOriginal) => {
  return {
    getProducts: vi.fn(),
  };
});

describe("UTTC-UT-PROD-FE-001: 검색화면으로 이동", () => {
  test("메인 페이지에서 검색 아이콘을 클릭하면 /search 페이지로 이동해야한다", async () => {
    // 테스트 환경에서는 실제 브라우저 주소창이 없어서, 메모리에 가짜 주소만들기
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    // user 자주나온다고 beforeAll하면안됨, 매 테스트마다 새로 태어난 사용자여야함.
    const user = userEvent.setup();
    const searchLink = screen.getByRole("link", {
      name: /검색 페이지로 이동/i,
    });

    //when: 메인에서 돋보기를 클릭한다.
    await user.click(searchLink);

    //then: 검색 화면으로 넘어간다.
    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    expect(searchInput).toBeInTheDocument();
  });
});

describe("UTTC-UT-PROD-FE-008: 상품 페이지로 이동", () => {
  beforeEach(() => {
    vi.mocked(getProducts).mockReset();
    vi.mocked(getProducts).mockImplementation(() => new Promise(() => {}));
  });

  test("헤더에서 SHOP 버튼을 클릭하면 /shopPage로 이동해야한다.", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();
    const shopLink = screen.getByRole("link", {
      name: /SHOP/i,
    });
    await user.click(shopLink);
    const mainCategory = await screen.findByText(/전체/i);
    expect(mainCategory).toBeInTheDocument();
  });
});
