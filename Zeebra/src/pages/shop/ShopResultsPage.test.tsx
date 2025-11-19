import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { getProducts, type SearchRes } from "@/utils/search";
import { resetSearchState } from "@/store/searchSlice";

// 1. API 모킹
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
    store.dispatch(resetSearchState());
  });

  test("다른 카테고리 버튼('상의')을 누르면 해당 버튼이 활성화되고 결과 페이지로 이동한다", async () => {
    // ======================================================
    // GIVEN: 상품 목록 페이지(/shopPage)에 접속 중이다. (기본 '전체' 선택됨)
    // ======================================================
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/shopPage"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // 1. 초기 상태 확인: '전체' 버튼이 활성화(font-bold) 되어 있어야 함
    // (ShopCategory.tsx의 로직: active ? "text-black font-bold" : ...)
    const allCategoryBtn = await screen.findByRole("button", { name: "전체" });
    const topCategoryBtn = await screen.findByRole("button", { name: "상의" });

    expect(allCategoryBtn).toHaveClass("font-bold"); // 전체는 활성
    expect(topCategoryBtn).not.toHaveClass("font-bold"); // 상의는 비활성

    // ======================================================
    // WHEN: '상의' 버튼을 누른다.
    // ======================================================
    await user.click(topCategoryBtn);

    // ======================================================
    // THEN: 표시가 '상의'로 옮겨지고, 해당 결과를 검색한 페이지로 이동한다.
    // ======================================================

    // 1. 시각적 변화: '상의' 버튼이 활성화(Bold) 되었는지 확인
    expect(topCategoryBtn).toHaveClass("font-bold");
    expect(allCategoryBtn).not.toHaveClass("font-bold");

    // 2. 페이지 이동 및 데이터 요청 확인:
    //    API가 'keyWord: 상의'로 호출되었는지 확인하여 페이지 이동을 검증
    await waitFor(() => {
      expect(vi.mocked(getProducts)).toHaveBeenCalledWith(
        expect.objectContaining({
          keyWord: "상의", // 👈 핵심: 상의로 검색 요청이 갔는가?
          page: 0,
        })
      );
    });
  });

  test("이미 선택된 버튼('전체')을 다시 누르면 변화가 없다", async () => {
    // ======================================================
    // GIVEN: 이미 '전체'가 선택된 상태
    // ======================================================
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/shopPage"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();
    const allCategoryBtn = screen.getByRole("button", { name: "전체" });

    // 초기 호출 횟수 확인 (렌더링 시 1회 호출됨)
    // await waitFor(() => expect(vi.mocked(getProducts)).toHaveBeenCalledTimes(1));
    // (비동기 타이밍 때문에 명시적 wait 대신 초기화 후 진행 추천하지만 흐름상 진행)

    // ======================================================
    // WHEN: 기존과 동일한 '전체' 버튼을 누른다.
    // ======================================================
    await user.click(allCategoryBtn);

    // ======================================================
    // THEN: 변화가 없다 (여전히 활성 상태 유지)
    // ======================================================
    expect(allCategoryBtn).toHaveClass("font-bold");

    // 💡 참고: ShopCategory.tsx 로직상 같은 버튼을 눌러도 navigate('/shopPage')가 호출되므로
    //          URL이나 UI상으로는 변화가 없는 것처럼 보입니다.
    //          여기서는 "활성 상태가 풀리지 않았다"는 것을 검증합니다.
  });
});
