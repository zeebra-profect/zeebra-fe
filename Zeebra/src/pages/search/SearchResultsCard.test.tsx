import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "@/Router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { addFavorite, getFavorites, type FavoriteRes } from "@/utils/favorite";
import { getProducts, type SearchRes } from "@/utils/search";
import {
  getProduct,
  getProductOption,
  type ProductDetail,
  type ProductOption,
} from "@/utils/product";

vi.mock("@/utils/search", async (_importOriginal) => {
  return {
    getProducts: vi.fn(),
  };
});
vi.mock("@/utils/product", async (_importOriginal) => {
  return { getProduct: vi.fn(), getProductOption: vi.fn() };
});

vi.mock("@/utils/favorite", () => ({
  addFavorite: vi.fn(),
  deleteFavorite: vi.fn(),
  getFavorites: vi.fn(),
}));

describe("UTTC-UT-PROD-FE-010: 상품 상세 페이지로 이동", () => {
  const fakeProduct = {
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
    status: "success",
    message: "조회 성공",
    sendTime: new Date().toISOString(),
    data: {
      productId: 123,
      productName: "테스트용 신발 (상세)",
      colorOptionResponses: [{ colorOptionNameId: 1, colorValue: "빨강" }],
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
    status: "success",
    message: "조회 성공",
    data: {
      productDetailResponses: [fakeProduct],
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
describe("UTTC-UT-PROD-FE-013: 관심 버튼 등록", () => {
  const FAKE_PRODUCT_ID = 123;

  const fakeProduct = {
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
        hasNext: false,
        pageSize: 20,
      },
    },
    sendTime: new Date().toISOString(),
  };

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
    vi.mocked(getProducts).mockReset();
    vi.mocked(addFavorite).mockReset();
    vi.mocked(getFavorites).mockReset();

    // 1. 상품 검색 Mock (이건 그대로)
    vi.mocked(getProducts).mockResolvedValue(fakeSearchData);

    // 2. 찜 추가 Mock (이건 그대로)
    vi.mocked(addFavorite).mockResolvedValue(fakeFavoriteResponse);

    // 3. ✅ [수정] 찜 목록 조회 Mock (배열 -> 객체로 변경!)

    // (1) 처음엔 찜 목록이 '비어있는' 상태 (객체로 리턴)
    vi.mocked(getFavorites).mockResolvedValueOnce({
      favoriteProductResponses: [], // 👈 빈 배열은 여기로 들어감
      pagination: {
        currentPage: 0,
        pageSize: 20,
        hasNext: false,
        totalCount: 0,
        totalPages: 0,
      },
    });

    // (2) 두 번째 호출에선 찜이 '추가된' 상태 (객체로 리턴)
    vi.mocked(getFavorites).mockResolvedValueOnce({
      favoriteProductResponses: [fakeFavoriteResponse], // 👈 데이터 있음
      pagination: {
        currentPage: 0,
        pageSize: 20,
        hasNext: false,
        totalCount: 1,
        totalPages: 1,
      },
    });
  });

  test("상품 카드에서 빈 하트(찜하기)를 클릭하면 찜이 등록되고 하트가 채워진다.", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/shopPage/results?keyword=test"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const productCard = await screen.findByText(/테스트용 찜 상품/i);
    expect(productCard).toBeInTheDocument();

    const emptyHeartButton = await screen.findByRole("button", {
      name: /찜하기/i,
    });
    expect(emptyHeartButton).toBeInTheDocument();

    await user.click(emptyHeartButton);

    expect(vi.mocked(addFavorite)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(addFavorite)).toHaveBeenCalledWith(FAKE_PRODUCT_ID);

    expect(vi.mocked(getFavorites)).toHaveBeenCalledTimes(1);

    const filledHeartButton = await screen.findByRole("button", {
      name: /찜 취소/i,
    });
    expect(filledHeartButton).toBeInTheDocument();
  });
});
