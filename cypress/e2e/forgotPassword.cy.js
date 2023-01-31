///<reference types="cypress"/>

describe("Forgot password functionality", () => {
  const resetMessage = `Please check the email address ${Cypress.env(
    "email"
  )} for instructions to reset your password.`;
  const urlPart = "reset-password/request/";
  const generateRandomText = (length) =>
    [...Array(length)].map(() => Math.random().toString(36).charAt(2)).join("");

  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", `**/${urlPart}/**`).as("goResetPage");
    cy.intercept("POST", `**/${urlPart}/**`).as("sendResetRequest");
    cy.contains("Forgot password?").click();
    cy.wait("@goResetPage").its("response.statusCode").should("eq", 200);
    cy.url().should("contain", `${urlPart}`);
  });

  it("Positive forgot password", () => {
    cy.get("#email").type(Cypress.env("email")); //types email
    cy.contains("button", "Continue").should("be.visible").click(); //clicks button
    cy.get(".left-wrapper").should("contain", resetMessage); //checks the text for validation
  });

  it("Forgot password without using the email format", () => {
    cy.get("#email").type(generateRandomText(10)); //types random text in email area
    cy.contains("button", "Continue").should("be.visible").click();
    cy.wait("@sendResetRequest").its("response.statusCode").should("eq", 400); //checks if status returns 400
    cy.contains("#error-element-email", "Email is not valid").should(
      "be.visible"
    ); //error check
  });
});
