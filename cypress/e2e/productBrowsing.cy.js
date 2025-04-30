describe("Product Browsing and Filtering", () => {
    it("should filter products by Women > Dress and verify product details", () => {
      cy.visit("https://automationexercise.com/products");
  
      cy.contains("a", "Women").click();
  
      cy.contains("a", "Dress").click();
  
      cy.get(".product-image-wrapper", { timeout: 10000 }).should(
        "have.length.greaterThan",
        0
      );
  
      cy.get(".product-overlay").first().invoke("show");
      cy.contains("a", "View Product").first().click();
  
      cy.get(".product-information", { timeout: 10000 })
        .should("be.visible")
        .within(() => {
          cy.get("h2").should("not.be.empty");
  
          cy.get("span > span").should("contain.text", "Rs.");
  
          cy.contains("p", "Availability").should("contain.text", "In Stock");
        });
    });
  });
  