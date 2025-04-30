///<reference types="cypress" />
import { faker } from "@faker-js/faker";

// Fixed User Credentials for Login
const name = "Bennie";
const lastName = "Idella"; 
const email = "Osvaldo.Rolfson-Ondricka@yahoo.com"; 
const password = "Test1234!"; 

const companyName = faker.company.name();
const address1 = faker.location.streetAddress();
const address2 = faker.location.secondaryAddress();
const country = "India";
const state = faker.location.state();
const city = faker.location.city();
const zipCode = faker.location.zipCode();
const phoneNumber = faker.phone.number("9#########");
const cardNumber = faker.finance.creditCardNumber();
const cvc = faker.finance.creditCardCVV();
const cardMonth = "12";
const cardYear = "2026"; 
const gender = "Mr"; 


const selectors = {
  loginEmail: '[data-qa="login-email"]',
  loginPassword: '[data-qa="login-password"]',
  loginButton: '[data-qa="login-button"]',
  cartModal: "#cartModal",
  proceedToCheckout: 'a[href="/checkout"]',
  registerLoginLink: 'a[href="/login"]',
  registerNameInput: '[data-qa="signup-name"]',
  registerEmailInput: '[data-qa="signup-email"]',
  signupButton: '[data-qa="signup-button"]',
  createAccountButton: '[data-qa="create-account"]',
  addressDelivery: "#address_delivery",
  addressInvoice: "#address_invoice",
  placeOrderButton: '[data-qa="place-order"]',
  paymentNameOnCard: '[data-qa="name-on-card"]',
  paymentCardNumber: '[data-qa="card-number"]',
  paymentCvc: '[data-qa="cvc"]',
  paymentExpiryMonth: '[data-qa="expiry-month"]',
  paymentExpiryYear: '[data-qa="expiry-year"]',
  payButton: '[data-qa="pay-button"]',
  orderSuccessMessage: "Congratulations! Your order has been confirmed!",
};

class LoginPage {
  fillLoginData(email, password) {
    cy.get(selectors.loginEmail).type(email);
    cy.get(selectors.loginPassword).type(password);
    cy.get(selectors.loginButton).click();
  }
}

const loginPage = new LoginPage();

describe("Test Case 14: Place Order: Register while Checkout", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com/");
    cy.get('div[class="carousel-inner"]').should("be.visible");
  });

  it("Place Order after Register/Login from Checkout page", () => {
    cy.contains("Products").click();
    cy.get(".features_items .product-image-wrapper")
      .first()
      .contains("Add to cart")
      .click({ force: true });

    cy.get(selectors.cartModal).should("be.visible");
    cy.contains("Continue Shopping").click();

    cy.contains("Cart").click();
    cy.url().should("include", "/view_cart");
    cy.get("#cart_info_table").should("be.visible");

    cy.contains("Proceed To Checkout").click();

    cy.get(selectors.registerLoginLink).contains("Register / Login").click(); 

    cy.get(selectors.loginEmail).should("be.visible");

    loginPage.fillLoginData(email, password);

    cy.get("ul.nav").should("contain", `Logged in as ${name}`);

    cy.contains("Cart").click();
    cy.contains("Proceed To Checkout").click();

    cy.get('textarea[name="message"]').type("Order placed after login");
    cy.contains("Place Order").click();

    cy.get(selectors.paymentNameOnCard).type(`${name} ${lastName}`);
    cy.get(selectors.paymentCardNumber).type(cardNumber);
    cy.get(selectors.paymentCvc).type(cvc);
    cy.get(selectors.paymentExpiryMonth).type(cardMonth);
    cy.get(selectors.paymentExpiryYear).type(cardYear);
    cy.get(selectors.payButton).click();

    cy.contains(selectors.orderSuccessMessage).should("be.visible");
  });
});
