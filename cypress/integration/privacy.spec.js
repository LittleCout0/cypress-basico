///<reference types="Cypress"/>

describe("URL de privacidade", function () {
  beforeEach(() => {
    cy.visit("./src/privacy.html");
  });

  it("verifica a página de privacidade", () => {
    cy.url().should("contain", "privacy.html");
    cy.get(".privacy").should("contain.text", "Talking About Testing");
  });
});
