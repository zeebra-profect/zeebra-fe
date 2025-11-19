import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { vi, describe, test, expect, beforeEach } from "vitest";
import {
  addFavorite,
  getFavorites,
  type FavoriteRes,
} from "@/utils/favorite";
// 1. 🔽 API 모킹: 필요한 API 함수들을 모두 임포트
import { getProducts, type SearchRes } from "@/utils/search";
import {
  getProduct,
  getProductOption,
  type ProductDetail,
  type ProductOption,
} from "@/utils/product";
import { resetSearchState } from "@/store/searchSlice";

vi.mock("@/utils/search", async (_importOriginal) => {
  return {
    getProducts: vi.fn(),
  };
});
vi.mock("@/utils/product", async (_importOriginal) => {
  return { getProduct: vi.fn(), getProductOption: vi.fn() }; // 💡 2개 함수 모킹
});

vi.mock("@/utils/favorite", () => ({
  addFavorite: vi.fn(),
  deleteFavorite: vi.fn(),
  getFavorites: vi.fn(),
}));

// ======================================================================
// 테스트 시나리오: 상품 상세 페이지로 이동
// ======================================================================
describe("UTTC-UT-PROD-FE-010: 상품 상세 페이지로 이동", () => {
  // 3. 🔽 가짜 데이터 정의 (API 명세 기반)
  const fakeProduct = {
    // (getProducts의 응답 중 일부)
    productId: 123,
    productName: "테스트용 신발",
    ProductThumbnail: "image.jpg",
    brandId: 1,
    categoryId: 1,
    productDescription: "",
    modelNumber: "",
    images: [],
    lowPrice: 0,
    reviewCount: 0,
    favoriteProductCount: 0,
    createdAt: "",
  };

  const fakeProductDetail: ProductDetail = {
    // (getProduct의 응답)
    status: "success",
    message: "조회 성공",
    sendTime: new Date().toISOString(),
    data: {
      productId: 123,
      productName: "테스트용 신발 (상세)",
      colorOptionResponses: [{ colorOptionNameId: 1, colorValue: "빨강" }],
      // ... (ProductDetail DTO에 필요한 나머지 필드들)
      brandId: 1,
      categoryId: 1,
      productDescription: "상세설명",
      modelNumber: "ABC",
      productThumbnail: "image.jpg",
      images: [],
      lowPrice: 10000,
      reviewCount: 5,
      favoriteProductCount: 10,
      createdAt: new Date().toISOString(),
      colorValue: "빨강",
    },
  };

  const fakeProductOptions: ProductOption = {
    // (getProductOption의 응답)
    status: "success",
    message: "조회 성공",
    sendTime: new Date().toISOString(),
    data: {
      sizeOptionResponses: [
        {
          optionCombinationId: 1,
          sizeValue: "250",
          productOptionId: 1,
          lowPriceOfSize: 10000,
        },
      ],
    },
  };

  const fakeSearchData: SearchRes = {
    // (getProducts의 전체 응답)
    status: "success",
    message: "조회 성공",
    data: {
      productDetailResponses: [fakeProduct],
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

  // 4. 🔽 API 모킹 초기화
  beforeEach(() => {
    vi.mocked(getProducts).mockReset();
    vi.mocked(getProduct).mockReset();
    vi.mocked(getProductOption).mockReset();

    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);
    vi.mocked(getProduct).mockResolvedValue(fakeProductDetail);
    vi.mocked(getProductOption).mockResolvedValue(fakeProductOptions);
  });

  test("상품 카드를 클릭하면 해당 상품의 상세 페이지로 이동해야 한다.", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/shopPage/results?keyword=test"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const productCard = await screen.findByText(/테스트용 신발/i);
    expect(productCard).toBeInTheDocument();
    await user.click(productCard);

    const purchaseButton = await screen.findByRole("button", {
      name: /구매/i,
    });

    expect(purchaseButton).toBeInTheDocument();
  });
});

// ======================================================================
// 테스트 시나리오 013: 관심 버튼 등록
// ======================================================================
describe("UTTC-UT-PROD-FE-013: 관심 버튼 등록", () => {
  // 3. 🔽 가짜 데이터 정의
  const FAKE_PRODUCT_ID = 123;

  // 3-1. (GIVEN 1) 검색 결과 목록 데이터
  const fakeProduct = {
    // 💡 ProductDetailResponse 타입에 맞춰야 함
    productId: FAKE_PRODUCT_ID,
    productName: "테스트용 찜 상품",
    ProductThumbnail: "image.jpg",
    brandId: 1,
    categoryId: 1,
    productDescription: "",
    modelNumber: "",
    images: [],
    lowPrice: 10000,
    reviewCount: 5,
    favoriteProductCount: 10,
    createdAt: "",
  };
  const fakeSearchData: SearchRes = {
    status: "success",
    message: "조회 성공",
    data: {
      productDetailResponses: [fakeProduct],
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

  // 3-2. (GIVEN 2) 찜하기 API 응답 데이터 (FavoriteRes 타입)
  const fakeFavoriteResponse: FavoriteRes = {
    favoriteProductId: 1,
    productId: FAKE_PRODUCT_ID,
    productName: "테스트용 찜 상품",
    productThumbnail: "image.jpg",
    productDescription: "",
    memberId: 1,
    createdAt: new Date().toISOString(),
  };

  // 4. 🔽 API 모킹 초기화
  beforeEach(() => {
    store.dispatch(resetSearchState());
    vi.mocked(getProducts).mockReset();
    vi.mocked(addFavorite).mockReset();
    vi.mocked(getFavorites).mockReset();

    // GIVEN 1: 검색 목록 API 모킹
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    // GIVEN 2: 찜 추가 API 모킹 (성공 반환)
    vi.mocked(addFavorite).mockResolvedValue(fakeFavoriteResponse);

    // GIVEN 3: 찜 목록 API 모킹 (중요)
    // 1. 앱 초기 로드 시: 빈 목록 반환
    vi.mocked(getFavorites).mockResolvedValueOnce([]);
    // 2. 찜 추가 후(fetchFavorites) : 추가된 목록 반환
    vi.mocked(getFavorites).mockResolvedValueOnce([fakeFavoriteResponse]);
  });

  test("상품 카드에서 빈 하트(찜하기)를 클릭하면 찜이 등록되고 하트가 채워진다.", async () => {
    // GIVEN: 사용자가 검색 결과 페이지에 접속해있다.
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/shopPage/results?keyword=test"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    // 1. (GIVEN) 찜하지 않은 상품("테스트용 찜 상품")이 렌더링될 때까지 기다림
    const productCard = await screen.findByText(/테스트용 찜 상품/i);
    expect(productCard).toBeInTheDocument();

    // 2. (GIVEN) 해당 상품의 "찜하기"(빈 하트) 버튼을 찾음
    // FavoriteBtn.tsx의 aria-label이 "찜하기" 또는 "찜 취소"라고 가정
    const emptyHeartButton = await screen.findByRole("button", {
      name: /찜하기/i,
    });
    expect(emptyHeartButton).toBeInTheDocument();

    // -----------------------------------------------------------
    // WHEN: 사용자가 "찜하기"(빈 하트) 버튼을 클릭한다.
    // -----------------------------------------------------------
    await user.click(emptyHeartButton);

    // -----------------------------------------------------------
    // THEN: "찜하기" 버튼이 "찜 취소"(채워진 하트) 버튼으로 변경된다.
    // -----------------------------------------------------------

    // 1. (THEN-1) addFavorite API가 정확한 ID로 호출되었는지 확인
    expect(vi.mocked(addFavorite)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(addFavorite)).toHaveBeenCalledWith(FAKE_PRODUCT_ID);

    // 2. (THEN-2) getFavorites API가 (초기 로드 포함) 총 2번 호출되었는지 확인
    // 💡 (참고) App.tsx의 초기 1회 + FavoriteBtn의 1회 = 총 2회
    expect(vi.mocked(getFavorites)).toHaveBeenCalledTimes(1);

    // 3. (THEN-3) 버튼의 ARIA 레이블이 "찜 취소"로 변경될 때까지 기다림
    //    (FavoriteBtn이 fetchFavorites를 await하므로, findBy...로 기다려야 합니다.)
    const filledHeartButton = await screen.findByRole("button", {
      name: /찜 취소/i,
    });
    expect(filledHeartButton).toBeInTheDocument();
  });
});
