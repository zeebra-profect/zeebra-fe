/// <reference types="cypress" />

describe("로그인 시나리오 테스트", () => {
  it("회원가입부터 로그인, 로그아웃까지 정상적으로 동작해야 한다", () => {
    const timestamp = new Date().getTime().toString().slice(-5); // 중복 방지를 위한 타임스탬프, 최대 글자수 제한에 맞게 조정
    const tUser = {
      userLoginId: `neum_${timestamp}`,
      memberName: "neum",
      memberEmail: `neum_${timestamp}@test.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      nickname: `neum_${timestamp}`,
      memberBirth: "1999-01-01",
      memberGender: "MAN",
    };

    cy.intercept("POST", "**/auth/signup").as("signupApi");
    cy.intercept("POST", "**/auth/login").as("loginApi");

    cy.visit("/signup");

    cy.get('input[name="userLoginId"]').type(tUser.userLoginId);
    cy.get('input[name="memberName"]').type(tUser.memberName);
    cy.get('input[name="memberEmail"]').type(tUser.memberEmail);
    cy.get('input[name="password"]').type(tUser.password);
    cy.get('input[name="confirmPassword"]').type(tUser.confirmPassword);
    cy.get('input[name="nickname"]').type(tUser.nickname);
    cy.get('input[name="memberBirth"]').type(tUser.memberBirth);
    cy.get('input[name="memberGender"][value="MAN"]').click();

    cy.get('button[type="submit"]').click();

    cy.wait("@signupApi", { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
    });
    cy.url().should("include", "/login");

    cy.contains("로그인").should("be.visible");

    cy.get('input[name="identifier"]').type(tUser.userLoginId);

    cy.get('input[name="password"]').type(tUser.password);

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");

    cy.wait("@loginApi").its("response.statusCode").should("eq", 200);
    cy.contains("로그아웃").should("be.visible");

    cy.contains("로그아웃").click();
    cy.contains("로그인").should("be.visible");
  });
});
