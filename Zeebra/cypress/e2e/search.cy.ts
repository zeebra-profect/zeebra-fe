describe("검색 시나리오 테스트", () => {
  it("검색 -> 상세페이지 이동이 원활해야한다.", () => {
    const searchKeyword = "테스트";

    const testProduct = {
      productId: 101,
      brandId: 1,
      categoryId: 1,
      productName: "테스트용 상품",
      productThumbnail: null,
      lowPrice: 15000,
      favoriteProductCount: 500,
      reviewCount: 12000,
      modelNumber: "TEST-001",
      productDescription: "테스트 상품입니다",
    };

    cy.intercept("GET", `**/products*`, {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          productDetailResponses: [testProduct], 
          pagination: { 
            currentPage: 0, 
            pageSize: 20, 
            hasNext: false 
          }
        },
      },
    }).as("searchApi");

    cy.visit("/search");
    
    
    cy.get('input[placeholder="브랜드, 상품 등"]')
      .type(searchKeyword)
      .type("{enter}");

    // 4. 요청 기다림 및 검증
    cy.wait("@searchApi").then((interception) => {
      
      expect(interception.request.url).to.include(`keyWord=${encodeURIComponent(searchKeyword)}`);
    });

    
    cy.contains("테스트용 상품").should("be.visible").click();
    cy.url().should("include", `/products/${testProduct.productId}`);
    
    
  });
});