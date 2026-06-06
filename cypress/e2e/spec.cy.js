describe("user API tests", () => {

  it("should create user", () => {
    const userData = {
      firstName: "Alice",
      surName: "Smith",
    };
    cy.createUser(userData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstName).to.eq("Alice");
      expect(response.body.surName).to.eq("Smith");
    });
  });

  it("should get a user by ID", () => {
    const userData = {
      firstName: "Alice",
      surName: "Smith",
    };
    cy.createUser(userData).then((response) => {
      const userId = response.body.id;

      cy.getUserById(userId).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);

        expect(response.body.id).to.eq(userId);
        expect(response.body.firstName).to.eq("Alice");
        expect(response.body.surName).to.eq("Smith");
      });
    });
  });

  it("should update an existing user", () => {
    const userData = {
      firstName: "Alice",
      surName: "Smith",
    };
    cy.createUser(userData).then((response) => {
      const userId = response.body.id;
      const updatedData = {
        firstName: "Alice",
        surName: "Smoth",
      };

      cy.updateUser(userId, updatedData).then((response) => {
        cy.getUserById(userId).then((response) => {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);

          expect(response.body.id).to.eq(userId);
          expect(response.body.firstName).to.eq("Alice");
          expect(response.body.surName).to.eq("Smoth");
        });
      });
    });
  });

  it("should delete a user", () => {
    const userData = {
      firstName: "Alice",
      surName: "Smeth",
    };
    cy.createUser(userData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstName).to.eq("Alice");
      expect(response.body.surName).to.eq("Smeth");
      const userId = response.body.id;

      cy.deleteUser(userId).then((response) => {
        expect(response.status).to.eq(200);
        cy.log("Пользователь удалён успешно");
        cy.getUserById(userId).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });
});
