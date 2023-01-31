Cypress.Commands.add("checkLoginPageElements", () => {
  cy.url().should("include", "login.apac.brenntag.com");
  cy.get("#username").should("be.visible");
  cy.get("#password").should("be.visible");
  cy.contains("button", "Log in").should("be.visible");
  cy.contains("Forgot password?").should("be.visible");
  cy.contains("Sign up request").should("be.visible");
});

Cypress.Commands.add("checkApacCountries", (selector, locale, code) => {
  cy.get(selector).then((el) => {
    //takes the selector
    const text = el.text().match(locale); //matches the locale from selector text
    cy.wrap(text).should("contain", locale); //checks again if it contains the correct data
    cy.contains(locale).click(); //and clicks
  });
  cy.url().should("contain", `ui_locales=${code}`); //checks the url
});
