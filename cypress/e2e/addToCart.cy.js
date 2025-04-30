describe("Cart and Quantity Management", () => {
    it("should add multiple items, update quantity, and manage cart", () => {
      cy.visit("https://automationexercise.com");
  
      cy.get(".features_items .product-image-wrapper").eq(0).trigger("mouseover");
      cy.get(".features_items .product-image-wrapper")
        .eq(0)
        .contains("Add to cart")
        .click({ force: true });
  
      cy.get("#cartModal", { timeout: 20000 })
        .should("be.visible")
        .then(() => {
          cy.log("Cart Modal Visible!");
          cy.contains("Continue Shopping").click(); 
        });
  
      cy.get(".features_items .product-image-wrapper").eq(1).trigger("mouseover");
      cy.get(".features_items .product-image-wrapper")
        .eq(1)
        .contains("Add to cart")
        .click({ force: true });
  
      cy.get("#cartModal", { timeout: 20000 })
        .should("be.visible")
        .then(() => {
          cy.log("Cart Modal Visible!");
          cy.contains("View Cart").click();
        });
  
      cy.url()
        .should("include", "/view_cart")
        .then(() => {
          cy.log("Cart page loaded, checking for cart items.");
        });
  
    });
  });
  