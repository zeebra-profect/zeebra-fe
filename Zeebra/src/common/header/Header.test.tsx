import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { Provider } from "react-redux";
import { store } from "@/store"; // Adjust this path to your store file
import { getProducts } from "@/utils/search";
import { vi, describe, test, expect, beforeEach } from "vitest";

vi.mock("@/utils/search", async (_importOriginal) => {
  return {
    getProducts: vi.fn(),
  };
});

describe("UTTC-UT-PROD-FE-001: 검색화면으로 이동", () => {
  test("메인 페이지에서 검색 아이콘을 클릭하면 /search 페이지로 이동해야한다", async () => {
    //given: 사용자가 메인 페이지에 접속해있다.

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
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
