context("Home Sreen", function() {
  beforeEach(() => {
    cy.visit("localhost:3000");

    // type correct email
    cy.get('[data-test="login-email-input"]').type("test@test.com");

    // type correct password
    cy.get('[data-test="login-password-input"]').type("somepassword");

    // click the submit button
    cy.get('[data-test="login-submit-button"]').click();

    // redirect to /home
    cy.request("localhost:3000/home");
  });

  it("all elements are render correctly", () => {
    // check if email input is rendered
    cy.get('[data-test="home-name-input"]').should("be.visible");
    // check if email input is rendered
    cy.get('[data-test="home-link-input"]').should("be.visible");
    // check if submit button is rendered
    cy.get('[data-test="home-submit-button"]').should("be.visible");
    // check if table is rendered
    cy.get('[data-test="table"]').should("be.visible");
  });

  it("add the link", () => {
    // type name of the page
    cy.get('[data-test="home-name-input"]').type("Medium Test");
    // type url of the page
    cy.get('[data-test="home-link-input"]').type("https://medium.com/");
    // click the submit button
    cy.get('[data-test="home-submit-button"]').click();
    // check if element exists
    cy.get('[data-test="table-row-name"]') // 9.
      .should("contain", "Medium Test");
  });
});
