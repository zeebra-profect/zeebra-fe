import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { getProducts, type SearchRes } from "@/utils/search";

vi.mock("@/utils/search", () => ({
  getProducts: vi.fn(),
}));

describe("TC-UT-PROD-FE-009: 카테고리 버튼 클릭", () => {
  const fakeSearchData: SearchRes = {
    status: "success",
    message: "조회 성공",
    data: {
      productDetailResponses: [],
      categoryResponses: [],
      brandResponses: [],
      pagination: {
        currentPage: 0,
        totalPages: 1,
        totalCount: 0,
        pageSize: 20,
      },
    },
    sendTime: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.mocked(getProducts).mockReset();
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);
  });

  test("다른 카테고리 버튼('상의')을 누르면 해당 버튼이 활성화되고 결과 페이지로 이동한다", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/shopPage"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const allCategoryBtn = await screen.findByRole("button", { name: "전체" });
    const topCategoryBtn = await screen.findByRole("button", { name: "상의" });

    expect(allCategoryBtn).toHaveClass("font-bold"); // 전체는 활성
    expect(topCategoryBtn).not.toHaveClass("font-bold"); // 상의는 비활성

    await user.click(topCategoryBtn);

    expect(topCategoryBtn).toHaveClass("font-bold");
    expect(allCategoryBtn).not.toHaveClass("font-bold");

    await waitFor(() => {
      expect(vi.mocked(getProducts)).toHaveBeenCalledWith(
        expect.objectContaining({
          keyWord: "상의",
          page: 0,
        })
      );
    });
  });

  test("이미 선택된 버튼('전체')을 다시 누르면 변화가 없다", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/shopPage"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();
    const allCategoryBtn = screen.getByRole("button", { name: "전체" });

    await user.click(allCategoryBtn);

    expect(allCategoryBtn).toHaveClass("font-bold");
  });
});
