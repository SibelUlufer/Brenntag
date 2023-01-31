///<reference types="cypress"/>
import { locale } from "../support/loginCountries";

describe("Login functionality", () => {
  const urlPartt = "/u/login?";
  beforeEach(() => {
    cy.visit("/");
  });

  it("Check login page", () => {
    cy.checkLoginPageElements(); //checks the login url and elements
  });

  it("Check APAC countries", () => {
    cy.checkApacCountries(".color-gray-500", "English", "en"); //to show we can call a function to check a country login page
    cy.get(".bg-none").then(($locales) => {
      //in this block, I check the country links, click them and verify the URL
      console.log($locales.text());
      for (const index in locale) {
        const a = $locales.text().match(locale[index].name);
        cy.wrap(a).should("contain", locale[index].name);
        cy.contains(locale[index].name).click();
        cy.wait(1000); //I know this is not the best practice, but sometimes it is efficient to use
        cy.url().should("contain", `ui_locales=${locale[index].code}`);
      }
    });
  });

  it("Failed login", () => {
    cy.intercept("POST", `${urlPartt}**`).as("loginRequest");
    cy.get("#username").type(Cypress.env("email")); //types email
    cy.get('[type="password"]').type(Cypress.env("password")); //types password
    cy.contains("button", "Log in").should("be.visible").click(); //clicks login button
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 400); //checks if status returns 400
    cy.contains("#error-element-password", "Wrong email or password").should(
      "be.visible"
    );
    cy.screenshot(); //takes screenshot
  });
});
