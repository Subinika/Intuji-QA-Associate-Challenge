describe("User Registration and Session Handling", () => {
    it("Should register a new user and verify session", () => {
      cy.registerUser();
  
      cy.get("@userData").then((user) => {
        cy.writeFile("cypress/fixtures/user.json", user);
        cy.log(`Registered user: ${user.name}, ${user.email}`);
      });
    });
  });
  