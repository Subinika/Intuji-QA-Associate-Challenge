import { faker } from "@faker-js/faker";

let LOCAL_STORAGE_MEMORY = {};
Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("registerUser", () => {
  const name = faker.person.firstName();
  const email = faker.internet.email();

  cy.visit("https://automationexercise.com");
  cy.get('a[href="/login"]').click();
  cy.get('[data-qa="signup-name"]').type(name);
  cy.get('[data-qa="signup-email"]').type(email);
  cy.get('[data-qa="signup-button"]').click();

  cy.get("#id_gender1").check();
  cy.get("#password").type("Test1234!");
  cy.get("#days").select("1");
  cy.get("#months").select("January");
  cy.get("#years").select("2000");

  cy.get("#first_name").type(faker.person.firstName());
  cy.get("#last_name").type(faker.person.lastName());
  cy.get("#address1").type(faker.location.streetAddress());
  cy.get("#state").type(faker.location.state());
  cy.get("#city").type(faker.location.city());
  cy.get("#zipcode").type("12345");
  cy.get("#mobile_number").type(faker.phone.number("9#########"));

  cy.get('[data-qa="create-account"]').click();
  cy.contains("Account Created!").should("be.visible");
  cy.get('a[data-qa="continue-button"]').click();
  cy.contains(`Logged in as`).should("be.visible");

  cy.saveLocalStorage();

  cy.wrap({ name, email }).as("userData");
});
