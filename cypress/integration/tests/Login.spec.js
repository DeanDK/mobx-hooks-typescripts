context("Login Sreen", function() {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("all elements are rendered correctly", function() {
    // check if email input is rendered
    cy.get('[data-test="login-email-input"]').should("be.visible");

    // check if password input is rendered
    cy.get('[data-test="login-password-input"]').should("be.visible");

    // check if submit button is rendered
    cy.get('[data-test="login-submit-button"]').should("be.visible");
  });

  it("redirect to home page if credentials are correct", function() {
    // type correct email address
    cy.get('[data-test="login-email-input"]').type("test@test.com");

    // type correct password
    cy.get('[data-test="login-password-input"]').type("somepassword");

    // click the submit button
    cy.get('[data-test="login-submit-button"]').click();

    // check whether home screen has been displayed
    cy.get('[data-test="home-screen"]').should("be.visible");
  });
});
