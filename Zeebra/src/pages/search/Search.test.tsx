import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { getProducts, type SearchRes } from "@/utils/search";
import { vi, describe, test, expect, beforeEach } from "vitest";

vi.mock("@/utils/search", async (_importOriginal) => {
  return {
    getProducts: vi.fn(),
  };
});

beforeEach(() => {
  vi.mocked(getProducts).mockReset(); // API 모킹 리셋
});

describe("UTTC-UT-PROD-FE-002: 이전 화면으로 돌아감", () => {
  test("검색 페이지에서 취소버튼을 클릭하면 이전 화면으로 돌아가야한다.", async () => {
    render(
      <Provider store={store}>
        {/* / -> /search로 접속했고 현재는 배열의 1번 인덱스임 */}
        <MemoryRouter initialEntries={["/", "/search"]} initialIndex={1}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const exitBtn = await screen.findByRole("button", { name: /취소/i }); // lazy loading이라
    expect(exitBtn).toBeInTheDocument();

    await user.click(exitBtn);
    expect(exitBtn).not.toBeInTheDocument();

    const searchLink = await screen.findByRole("link", {
      name: /검색 페이지로 이동/i,
    });
    expect(searchLink).toBeInTheDocument();
  });
});

describe("UTTC-UT-PROD-FE-006: 검색을 하고 결과 페이지로 넘어감", () => {
  test("검색어를 입력하고 검색 버튼을 클릭하면 결과 페이지로 이동한다", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // GIVEN: API 성공 응답 모킹 (데이터 있음)
    const fakeSearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        products: [
          {
            productId: 999,
            productName: "테스트용 아디다스 신발",
            brandId: 1,
            categoryId: 1,
            productDescription: "설명",
            modelNumber: "123",
            productThumbnail: "",
            images: [],
            minPrice: 10000,
            reviewCount: 0,
            favoriteProductCount: 0,
            createdAt: new Date().toISOString(),
            score: 0,
          },
        ],
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          hasNext: false,
          pageSize: 20,
        },
      },
      sendTime: new Date().toISOString(),
    };
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "아디다스");
    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    const productItem = await screen.findByText("테스트용 아디다스 신발");
    expect(productItem).toBeInTheDocument();
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe("UTTC-UT-PROD-FE-017: 검색 결과 지연 확인", () => {
  test("결과 페이지 로드 시 '검색 중...' 텍스트가 표시되어야 한다", async () => {
    vi.mocked(getProducts).mockImplementation(() => new Promise(() => {}));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/shopPage/results?keyword=아디다스"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    const loadingText = await screen.findByText(/검색 중.../i);
    expect(loadingText).toBeInTheDocument();
  });
});

describe("UTTC-UT-PROD-FE-015: 엔터 키 검색", () => {
  test("검색바에서 엔터 키를 누르면 결과 페이지로 이동한다", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const fakeSearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        products: [
          {
            productId: 999,
            productName: "테스트용 아디다스 신발",
            brandId: 1,
            categoryId: 1,
            productDescription: "설명",
            modelNumber: "123",
            productThumbnail: "",
            images: [],
            minPrice: 10000,
            reviewCount: 0,
            favoriteProductCount: 0,
            createdAt: new Date().toISOString(),
            score: 0,
          },
        ],
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          hasNext: false,
          pageSize: 20,
        },
      },
      sendTime: new Date().toISOString(),
    };
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "아디다스{Enter}");

    const productItem = await screen.findByText("테스트용 아디다스 신발");
    expect(productItem).toBeInTheDocument();
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe("TC-UT-PROD-FE-003: 검색 결과가 없음", () => {
  test("데이터에 존재하지 않는 검색어를 입력하면 '텅 비었어요.'가 출력된다", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const emptySearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        products: [],
        categoryResponses: [],
        brandResponses: [],

        pagination: {
          currentPage: 0,
          hasNext: false,
          pageSize: 20,
        },
      },
      sendTime: new Date().toISOString(),
    };

    vi.mocked(getProducts).mockResolvedValue(emptySearchData);

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);

    await user.type(searchInput, "존재하지않는상품");

    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    const emptyMessage = await screen.findByText(/텅 비었어요/i);
    expect(emptyMessage).toBeInTheDocument();

    expect(searchInput).not.toBeInTheDocument();
  });
});

describe("TC-UT-PROD-FE-004: 검색어를 초기화함", () => {
  test("X 버튼을 누르면 검색 input에 작성해둔 값이 사라진다", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "지울 검색어");

    expect(searchInput).toHaveValue("지울 검색어");

    const clearBtn = await screen.findByRole("button", {
      name: /검색어 지우기/i,
    });
    await user.click(clearBtn);

    expect(searchInput).toHaveValue("");

    expect(clearBtn).not.toBeInTheDocument();
  });
});

describe("TC-UT-PROD-FE-014: 검색이 끝나면 검색바에 내용이 비워짐", () => {
  test("검색을 진행하고 검색 페이지에 재진입하면 입력값이 초기화되어 있어야 한다", async () => {
    const fakeSearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        products: [],
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          hasNext: false,
          pageSize: 20,
        },
      },
      sendTime: new Date().toISOString(),
    };
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "아디다스");

    expect(searchInput).toHaveValue("아디다스");

    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    const loadingOrEmpty = await screen.findByText(/검색 중|텅 비었어요/i);
    expect(loadingOrEmpty).toBeInTheDocument();

    const headerSearchLink = await screen.findByRole("link", {
      name: /검색 페이지로 이동/i,
    });
    await user.click(headerSearchLink);

    const reloadedInput = await screen.findByPlaceholderText(
      /브랜드, 상품 등/i
    );

    expect(reloadedInput).toHaveValue("");
  });
});

describe("TC-UT-PROD-FE-017: 키보드 네비게이션", () => {
  test("Tab으로 이동하여 검색어를 입력하고, 다시 Tab 후 Enter로 실행한다", async () => {
    const fakeSearchData: SearchRes = {
      status: "success",
      message: "성공",
      data: {
        products: [
          {
            productId: 999,
            productName: "테스트용 아디다스 신발",
            brandId: 1,
            categoryId: 1,
            productDescription: "설명",
            modelNumber: "123",
            productThumbnail: "",
            images: [],
            minPrice: 10000,
            reviewCount: 0,
            favoriteProductCount: 0,
            createdAt: new Date().toISOString(),
            score: 0,
          },
        ],
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          hasNext: false,
          pageSize: 20,
        },
      },
      sendTime: "",
    };
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);

    await user.tab(); // 취소 버튼
    await user.tab(); // Input

    expect(searchInput).toHaveFocus();

    await user.keyboard("키보드검색");
    expect(searchInput).toHaveValue("키보드검색");

    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });

    await user.tab();

    expect(searchBtn).toHaveFocus();

    await user.keyboard("{Enter}");

    const productItem = await screen.findByText("키보드 검색 상품");
    expect(productItem).toBeInTheDocument();
  });
});

describe("TC-UT-PROD-FE-018: 네트워크 오류 예외 처리", () => {
  test("검색 중 네트워크 오류(500)가 발생하면 에러 알림 메시지가 표시된다", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    vi.mocked(getProducts).mockRejectedValue(new Error("Network Error 500"));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // 입력창 찾기 및 입력
    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "에러유발검색어");

    // 검색 버튼 클릭
    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
    expect(alertMock).toHaveBeenCalledWith("검색 중 오류가 발생했습니다.");

    expect(searchInput).toBeInTheDocument();

    alertMock.mockRestore();
  });
});

describe("TC-UT-PROD-FE-005: 검색어를 길게 작성함", () => {
  test("매우 긴 검색어(60자)를 입력하면 최대 길이(50자)까지만 입력되어야 한다", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);

    const longText = "아".repeat(60);

    await user.type(searchInput, longText);

    const expectedText = "아".repeat(50);

    expect(searchInput).toHaveValue(expectedText);

    expect(searchInput).not.toHaveValue(longText);
  });
});

describe("TC-UT-PROD-FE-016: 특수문자 / 이모지 검색", () => {
  test("이모지 혹은 특수문자를 검색하면 검색 결과가 없음을 표시한다", async () => {
    const emptySearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        products: [], // 👈 빈 결과
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          hasNext: false,
          pageSize: 20,
        },
      },
      sendTime: new Date().toISOString(),
    };

    vi.mocked(getProducts).mockResolvedValue(emptySearchData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);

    const specialQuery = "!@#$ %^&*() 😀😎🚀";

    await user.type(searchInput, specialQuery);

    expect(searchInput).toHaveValue(specialQuery);

    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    expect(vi.mocked(getProducts)).toHaveBeenCalledWith(
      expect.objectContaining({
        keyWord: specialQuery,
      })
    );

    const emptyMessage = await screen.findByText(/텅 비었어요/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
