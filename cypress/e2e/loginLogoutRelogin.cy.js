///<reference types="cypress" />

// Fixed User Credentials for Login
const name = "Bennie";
const lastName = "Idella"; 
const email = "Osvaldo.Rolfson-Ondricka@yahoo.com"; 
const password = "Test1234!"; 


// Selectors
const selectors = {
  loginEmail: '[data-qa="login-email"]',
  loginPassword: '[data-qa="login-password"]',
  loginButton: '[data-qa="login-button"]',
  registerLoginLink: 'a[href="/login"]', // Register/Login link
  loggedInUser: "ul.nav", // Nav bar to check logged-in user
  logoutLink: ".logout-link", // Assuming this is the class for logout button (update accordingly)
};

class LoginPage {
  fillLoginData(email, password) {
    cy.get(selectors.loginEmail).type(email);
    cy.get(selectors.loginPassword).type(password);
    cy.get(selectors.loginButton).click();
  }
}

const loginPage = new LoginPage();

describe("Login, Logout, and Re-login", () => {
  it("Login, Logout, and Re-login with the same credentials", () => {
    cy.visit("https://automationexercise.com/");
    cy.get(selectors.registerLoginLink).click();

    cy.get(selectors.loginEmail).should("be.visible");

    loginPage.fillLoginData(email, password);

    cy.get(selectors.loggedInUser).should("contain", `Logged in as ${name}`);

    cy.contains("Logout").click(); 

    cy.get(selectors.registerLoginLink).should("be.visible");

    cy.get(selectors.registerLoginLink).click(); 
    cy.get(selectors.loginEmail).should("be.visible");
    loginPage.fillLoginData(email, password);

    cy.get(selectors.loggedInUser).should("contain", `Logged in as ${name}`);
  });
});
