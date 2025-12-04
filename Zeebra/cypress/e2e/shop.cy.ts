/// <reference types="cypress" />

describe("상품 리스트 및 관심 상품 시나리오 통합 테스트", () => {
  // 1. 공통으로 사용할 가짜 데이터 (Mock Data)
  const mockProducts = [
    {
      productId: 101,
      brandId: 1,
      categoryId: 1,
      productName: "테스트용 멋진 청바지",
      productThumbnail: null,
      lowPrice: 15000, // 15,000원
      favoriteProductCount: 500,
      reviewCount: 12000, // 1.2만
      modelNumber: "TEST-001",
      productDescription: "테스트 상품입니다",
    },
    {
      productId: 102,
      productName: "두 번째 상품",
      lowPrice: 30000,
      favoriteProductCount: 0,
      reviewCount: 0,
      productThumbnail: "http://real-image.com/img.jpg",
    },
  ];

  // 2. 공통 설정 (모든 it 실행 전에 수행)
  beforeEach(() => {
    // 검색(상품 리스트) API 가로채기
    // (두 테스트 모두 상품 리스트 화면에서 시작하므로 공통으로 뺌)
    cy.intercept("GET", "**/products*", {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          productDetailResponses: mockProducts,
          pagination: { currentPage: 0, pageSize: 20, hasNext: false },
        },
      },
    }).as("getProducts");
  });

  // ----------------------------------------------------------------
  // Test 1: 카드 컴포넌트 렌더링 & 기본 동작 (클릭, 이미지 최적화 등)
  // ----------------------------------------------------------------
  it("상품 정보가 올바르게 렌더링되고, 클릭 동작이 정상이어야 한다", () => {
    // 1. 페이지 방문
    cy.visit("/shopPage");
    cy.wait("@getProducts");

    // 2. 렌더링 검증 (가격, 리뷰 수 포맷팅 확인)
    cy.get('[data-testid="product-card"]')
      .first()
      .within(() => {
        cy.contains("테스트용 멋진 청바지").should("be.visible");
        cy.contains("15,000원").should("be.visible");
        cy.contains("리뷰 1.2만").should("be.visible");
      });

    // 3. LCP 최적화 속성(fetchpriority) 검증
    // 첫 번째, 두 번째 이미지는 high여야 함
    cy.get('[data-testid="product-card"]')
      .eq(0)
      .find("img")
      .should("have.attr", "fetchpriority", "high")
      .and("have.attr", "loading", "eager");

    cy.get('[data-testid="product-card"]')
      .eq(1)
      .find("img")
      .should("have.attr", "fetchpriority", "high");

    // 4. 이벤트 버블링 방지 검증 (찜 버튼 누를 때 상세페이지 이동 X)
    cy.get('[data-testid="product-card"]').first().find("button").click();
    cy.url().should("include", "/shopPage"); // URL 유지

    // 5. 카드 클릭 시 상세 페이지 이동 검증
    cy.get('[data-testid="product-card"]').first().click();
    cy.url().should("include", "/products/101");
  });
});
