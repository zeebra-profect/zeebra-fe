import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { getProducts, type SearchRes } from "@/utils/search";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { resetSearchState } from "@/store/searchSlice";

// ======================================================================
// 1. API 모킹 (전역 설정)
// ======================================================================
vi.mock("@/utils/search", async (_importOriginal) => {
  return {
    getProducts: vi.fn(),
  };
});

// ======================================================================
// 2. 테스트 설정 (매 테스트마다 초기화)
// ======================================================================
beforeEach(() => {
  vi.mocked(getProducts).mockReset(); // API 모킹 리셋
  store.dispatch(resetSearchState()); // Redux 상태 리셋
});

// ======================================================================
// 3. 테스트 시나리오
// ======================================================================

describe("UTTC-UT-PROD-FE-002: 이전 화면으로 돌아감", () => {
  test("검색 페이지에서 취소버튼을 클릭하면 이전 화면으로 돌아가야한다.", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/", "/search"]} initialIndex={1}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    const user = userEvent.setup();

    // 1. 취소 버튼 찾기 (Lazy Loading 대기)
    const exitBtn = await screen.findByRole("button", { name: /취소/i });
    expect(exitBtn).toBeInTheDocument();

    // 2. 클릭 및 이동 확인
    await user.click(exitBtn);
    expect(exitBtn).not.toBeInTheDocument();

    // 3. 이전 페이지 요소 확인
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
        productDetailResponses: [
          {
            productId: 999,
            productName: "테스트용 아디다스 신발",
            brandId: 1,
            categoryId: 1,
            productDescription: "설명",
            modelNumber: "123",
            ProductThumbnail: "",
            images: [],
            lowPrice: 10000,
            reviewCount: 0,
            favoriteProductCount: 0,
            createdAt: new Date().toISOString(),
          },
        ],
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          totalPages: 1,
          totalCount: 1,
          pageSize: 20,
        },
      },
      sendTime: new Date().toISOString(),
    };
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    // WHEN: 검색 실행
    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "아디다스");
    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    // THEN: 결과 확인 (실제 데이터 렌더링 대기)
    const productItem = await screen.findByText("테스트용 아디다스 신발");
    expect(productItem).toBeInTheDocument();
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe("UTTC-UT-PROD-FE-017: 검색 결과 지연 확인", () => {
  test("결과 페이지 로드 시 '검색 중...' 텍스트가 표시되어야 한다", async () => {
    // GIVEN: API 응답 지연 모킹
    vi.mocked(getProducts).mockImplementation(() => new Promise(() => {}));

    render(
      <Provider store={store}>
        {/* 검색 결과 페이지로 바로 진입 */}
        <MemoryRouter initialEntries={["/shopPage/results?keyword=아디다스"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    // THEN: 로딩 텍스트 확인
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

    // GIVEN: API 성공 응답 모킹
    const fakeSearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        productDetailResponses: [
          {
            productId: 999,
            productName: "테스트용 아디다스 신발",
            brandId: 1,
            categoryId: 1,
            productDescription: "설명",
            modelNumber: "123",
            ProductThumbnail: "",
            images: [],
            lowPrice: 10000,
            reviewCount: 0,
            favoriteProductCount: 0,
            createdAt: new Date().toISOString(),
          },
        ],
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          totalPages: 1,
          totalCount: 1,
          pageSize: 20,
        },
      },
      sendTime: new Date().toISOString(),
    };
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    // WHEN: 엔터 키 입력
    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "아디다스{Enter}");

    // THEN: 결과 확인
    const productItem = await screen.findByText("테스트용 아디다스 신발");
    expect(productItem).toBeInTheDocument();
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe("TC-UT-PROD-FE-003: 검색 결과가 없음", () => {
  test("데이터에 존재하지 않는 검색어를 입력하면 '텅 비었어요.'가 출력된다", async () => {
    // ======================================================
    // GIVEN: 1. 사용자가 검색 페이지에 접속해있다.
    // ======================================================

    // 테스트 시작 전 Store 초기화 (필수)
    store.dispatch(resetSearchState());

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // ======================================================
    // GIVEN: 2. API가 '빈 결과'를 반환하도록 모킹
    // ======================================================
    const emptySearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        // 💡 [핵심] 검색 결과가 없으므로 빈 배열을 반환합니다.
        productDetailResponses: [],
        categoryResponses: [],
        brandResponses: [],
        // 페이지네이션 정보도 0으로 설정
        pagination: {
          currentPage: 0,
          totalPages: 0,
          totalCount: 0,
          pageSize: 20,
        },
      },
      sendTime: new Date().toISOString(),
    };

    vi.mocked(getProducts).mockResolvedValue(emptySearchData);

    // ======================================================
    // WHEN: 1. 데이터에 존재하지 않는 검색어를 입력한다.
    //       2. 검색 버튼을 누른다.
    // ======================================================

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    // "존재하지않는상품"이라는 키워드 입력
    await user.type(searchInput, "존재하지않는상품");

    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    // ======================================================
    // THEN: 검색 결과 화면으로 넘어가고 '텅 비었어요.' 가 출력된다.
    // ======================================================

    // 1. 결과 페이지(ShopContent)로 이동하여 "텅 비었어요" 텍스트가 뜰 때까지 기다림
    // (SearchResultsList.tsx에 정의된 텍스트)
    const emptyMessage = await screen.findByText(/텅 비었어요/i);
    expect(emptyMessage).toBeInTheDocument();

    // 2. 검색 페이지의 입력창은 사라져야 함 (페이지 이동 확인)
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe("TC-UT-PROD-FE-004: 검색어를 초기화함", () => {
  test("X 버튼을 누르면 검색 input에 작성해둔 값이 사라진다", async () => {
    // ======================================================
    // GIVEN: 1. 검색 페이지에 들어간다.
    // ======================================================
    store.dispatch(resetSearchState()); // 상태 초기화

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // ======================================================
    // GIVEN: 2. 검색어를 입력한다. ("지울 검색어")
    // ======================================================
    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "지울 검색어");

    // (중간 검증) 입력이 잘 되었는지 확인
    expect(searchInput).toHaveValue("지울 검색어");

    // ======================================================
    // WHEN: 3. X 버튼(검색어 지우기)을 누른다.
    // ======================================================

    // Search.tsx에서 X 버튼의 aria-label="검색어 지우기"로 설정되어 있습니다.
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
    // ======================================================
    // GIVEN: 1. 초기 상태 설정 및 렌더링
    // ======================================================

    store.dispatch(resetSearchState()); // Redux 초기화

    // API 성공 모킹 (검색 후 결과 페이지로 이동하기 위함)
    const fakeSearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        productDetailResponses: [], // 데이터가 없어도 이동은 함
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
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // ======================================================
    // WHEN: 2. "아디다스" 검색 후 결과 페이지로 이동
    // ======================================================

    // 1. 입력 및 검색
    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "아디다스");

    // (중간 점검) 입력이 잘 되었는지 확인
    expect(searchInput).toHaveValue("아디다스");

    // 2. 검색 버튼 클릭 -> 결과 페이지로 이동
    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    // 3. 결과 페이지 로드 대기 ("검색 중..." 또는 "텅 비었어요" 등)
    //    (Header가 있는 페이지로 넘어갔음을 확인하는 단계)
    const loadingOrEmpty = await screen.findByText(/검색 중|텅 비었어요/i);
    expect(loadingOrEmpty).toBeInTheDocument();

    // ======================================================
    // WHEN: 3. 검색 페이지로 재진입 (Header의 검색 아이콘 클릭)
    // ======================================================

    // 결과 페이지(Layout1)에는 Header가 있으므로, Header의 '검색' 링크를 찾아 클릭합니다.
    // (Header.tsx에서 설정한 aria-label 사용)
    const headerSearchLink = await screen.findByRole("link", {
      name: /검색 페이지로 이동/i,
    });
    await user.click(headerSearchLink);

    // ======================================================
    // THEN: 4. 검색 input 값이 사라져 있다. ("")
    // ======================================================

    // 다시 나타난 검색 페이지의 입력창을 찾습니다.
    const reloadedInput = await screen.findByPlaceholderText(
      /브랜드, 상품 등/i
    );

    // ✅ [핵심 검증] 값이 비어있는지 확인
    expect(reloadedInput).toHaveValue("");
  });
});

describe("TC-UT-PROD-FE-017: 키보드 네비게이션", () => {
  test("Tab으로 이동하여 검색어를 입력하고, 다시 Tab 후 Enter로 실행한다", async () => {
    // GIVEN: 초기 설정
    store.dispatch(resetSearchState());
    const fakeSearchData: SearchRes = {
      /* ... 데이터 채움 ... */ status: "success",
      message: "성공",
      data: {
        productDetailResponses: [
          {
            productId: 999,
            productName: "키보드 검색 상품", // 👈 결과 확인용
            brandId: 1,
            categoryId: 1,
            productDescription: "",
            modelNumber: "",
            ProductThumbnail: "",
            images: [],
            lowPrice: 1000,
            reviewCount: 0,
            favoriteProductCount: 0,
            createdAt: "",
          },
        ],
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          totalPages: 1,
          totalCount: 1,
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

    // ======================================================
    // WHEN: 1. Tab 키로 Input까지 이동
    // ======================================================

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);

    // 💡 [수정] 아직 검색 버튼은 화면에 없습니다. Input으로 포커스만 이동합니다.
    // (DOM 구조: 취소버튼 -> Input 이므로 Tab을 2번 눌러야 Input에 도달할 수 있음)
    await user.tab(); // 취소 버튼
    await user.tab(); // Input

    // Input에 포커스가 잘 왔는지 확인
    expect(searchInput).toHaveFocus();

    // ======================================================
    // WHEN: 2. 검색어 입력 (이때 버튼이 생겨남!)
    // ======================================================

    await user.keyboard("키보드검색");
    expect(searchInput).toHaveValue("키보드검색");

    // 💡 [중요] 입력이 된 후에야 검색 버튼이 DOM에 나타납니다.
    //    이제 버튼 요소를 찾을 수 있습니다.
    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });

    // ======================================================
    // WHEN: 3. 다시 Tab을 눌러서 (새로 생긴) 검색 버튼으로 이동
    // ======================================================

    await user.tab();

    // [검증] 검색 버튼에 포커스가 갔는지 확인
    expect(searchBtn).toHaveFocus();

    // ======================================================
    // WHEN: 4. Enter 키 입력 (버튼 실행)
    // ======================================================

    // 현재 포커스가 검색 버튼에 있으므로 Enter를 치면 클릭과 같습니다.
    await user.keyboard("{Enter}");

    // ======================================================
    // THEN: 결과 확인
    // ======================================================

    const productItem = await screen.findByText("키보드 검색 상품");
    expect(productItem).toBeInTheDocument();
  });
});

describe("TC-UT-PROD-FE-018: 네트워크 오류 예외 처리", () => {
  test("검색 중 네트워크 오류(500)가 발생하면 에러 알림 메시지가 표시된다", async () => {
    // ======================================================
    // GIVEN: 1. 초기 설정 (Store, Alert Mocking)
    // ======================================================

    store.dispatch(resetSearchState());

    // 💡 [핵심 1] window.alert 함수를 가로채서 감시(Spy)합니다.
    // (실제 얼럿 창은 띄우지 않고, 호출 기록만 남김)
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    // 💡 [핵심 2] API가 에러를 뱉도록(Reject) 설정합니다. (500 에러 시뮬레이션)
    vi.mocked(getProducts).mockRejectedValue(new Error("Network Error 500"));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // ======================================================
    // WHEN: 2. 검색어 입력 후 실행
    // ======================================================

    // 입력창 찾기 및 입력
    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);
    await user.type(searchInput, "에러유발검색어");

    // 검색 버튼 클릭
    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    // ======================================================
    // THEN: 3. 에러 알림 메세지가 표시된다.
    // ======================================================

    // 💡 비동기 작업(API 실패 -> catch 블록 -> alert)을 기다려야 하므로 waitFor 사용
    await waitFor(() => {
      // 1. alert 함수가 1번 호출되었는지 확인
      expect(alertMock).toHaveBeenCalledTimes(1);
    });

    // 2. alert에 전달된 메시지가 예상과 일치하는지 확인
    // (Search.tsx의 catch 블록에 있는 메시지와 정확히 일치해야 함)
    expect(alertMock).toHaveBeenCalledWith("검색 중 오류가 발생했습니다.");

    // 3. (선택 사항) 페이지가 이동하지 않고 그대로인지 확인 (입력창이 여전히 존재함)
    expect(searchInput).toBeInTheDocument();

    // ✅ 테스트 종료 후 alert 모킹 해제 (다른 테스트에 영향 주지 않도록)
    alertMock.mockRestore();
  });
});

describe("TC-UT-PROD-FE-005: 검색어를 길게 작성함", () => {
  test("매우 긴 검색어(60자)를 입력하면 최대 길이(50자)까지만 입력되어야 한다", async () => {
    // ======================================================
    // GIVEN: 1. 검색 페이지에 들어간다.
    // ======================================================
    store.dispatch(resetSearchState());

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // ======================================================
    // WHEN: 2. 매우 긴 검색어를 입력한다. (60자)
    // ======================================================

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);

    // 60글자의 긴 문자열 생성 ("아" * 60)
    const longText = "아".repeat(60);

    // 긴 문자열 타이핑 시도
    await user.type(searchInput, longText);

    // ======================================================
    // THEN: 검색 버튼과 x 버튼을 넘어가지 않도록 제한된다. (50자)
    // ======================================================

    // 1. 입력창의 값이 50자에서 잘렸는지 확인
    const expectedText = "아".repeat(50); // maxLength가 50이므로

    expect(searchInput).toHaveValue(expectedText);

    // 2. (선택 사항) 실제 값이 60자가 아님을 확인
    expect(searchInput).not.toHaveValue(longText);
  });
});

describe("TC-UT-PROD-FE-016: 특수문자 / 이모지 검색", () => {
  test("이모지 혹은 특수문자를 검색하면 검색 결과가 없음을 표시한다", async () => {
    // ======================================================
    // GIVEN: 1. 초기 설정 및 빈 결과 모킹
    // ======================================================
    store.dispatch(resetSearchState());

    // 특수문자 검색 시 매칭되는 상품이 없으므로 '빈 배열'을 반환하도록 설정
    const emptySearchData: SearchRes = {
      status: "success",
      message: "조회 성공",
      data: {
        productDetailResponses: [], // 👈 빈 결과
        categoryResponses: [],
        brandResponses: [],
        pagination: {
          currentPage: 0,
          totalPages: 0,
          totalCount: 0,
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

    // ======================================================
    // WHEN: 2. 특수문자와 이모지 입력 후 검색
    // ======================================================

    const searchInput = await screen.findByPlaceholderText(/브랜드, 상품 등/i);

    // 💡 특수문자와 이모지가 섞인 검색어
    const specialQuery = "!@#$ %^&*() 😀😎🚀";

    await user.type(searchInput, specialQuery);

    // (선택) 입력창에 특수문자가 그대로 입력되었는지 확인 (입력 제한이 없다면)
    expect(searchInput).toHaveValue(specialQuery);

    const searchBtn = await screen.findByRole("button", { name: /^검색$/i });
    await user.click(searchBtn);

    // ======================================================
    // THEN: 3. 검색 결과가 없다는 메시지 출력
    // ======================================================

    // 1. API가 특수문자를 포함하여 올바르게 호출되었는지 검증 (필터링 없이 전송되는지 확인)
    //    (Axios params가 올바르게 구성되었는지 확인하는 역할)
    expect(vi.mocked(getProducts)).toHaveBeenCalledWith(
      expect.objectContaining({
        keyWord: specialQuery, // 👈 입력한 특수문자 그대로 요청했는지 확인
      })
    );

    // 2. 결과 페이지로 이동하여 "텅 비었어요" 메시지가 뜨는지 확인
    const emptyMessage = await screen.findByText(/텅 비었어요/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
