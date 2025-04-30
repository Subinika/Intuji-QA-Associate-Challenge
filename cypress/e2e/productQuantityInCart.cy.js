/// <reference types="cypress" />

describe("Verify Product quantity in Cart", () => {
    const selectors = {
      homeIdentifier: ".carousel-inner",
    };
  
    const productSelectors = {
      viewProduct: '.features_items .col-sm-4 a:contains("View Product")',
      detailQuantity: '[name="quantity"]',
      btnAddToCart: 'button:contains("Add to cart")',
      modalContent: "#cartModal",
      viewCart: 'a:contains("View Cart")',
      product: "#cart_info_table tbody tr",
      cartPrice: "#cart_info_table tbody tr .cart_price",
      cartQuantity: "#cart_info_table tbody tr .cart_quantity",
      cartTotal: "#cart_info_table tbody tr .cart_total",
    };
  
    const goToProductPage = () => {
      cy.get('a[href="/products"]').click();
    };
  
    it("should verify quantity and total price in cart", () => {
      cy.visit("https://automationexercise.com");
  
      cy.url().should("eq", "https://automationexercise.com/");
      cy.get(selectors.homeIdentifier).should("be.visible");
  
      goToProductPage();
      cy.get(productSelectors.viewProduct).eq(0).click();
      cy.url().should("include", "/product_details/");
  
      cy.get(productSelectors.detailQuantity).clear().type("4");
      cy.get(productSelectors.btnAddToCart).click();
      cy.get(productSelectors.modalContent).should("be.visible");
      cy.contains("View Cart").click();
  
      cy.url().should("include", "/view_cart");
      cy.get(productSelectors.product).should("exist");
  
      cy.get(productSelectors.cartQuantity).first().should("contain.text", "4");
  
      cy.get(productSelectors.cartPrice)
        .first()
        .invoke("text")
        .then((priceText) => {
          const unitPrice = parseFloat(priceText.replace(/[^\d]/g, ""));
          cy.get(productSelectors.cartTotal)
            .first()
            .invoke("text")
            .then((totalText) => {
              const totalPrice = parseFloat(totalText.replace(/[^\d]/g, ""));
              expect(totalPrice).to.eq(unitPrice * 4);
            });
        });
    });
  });
  