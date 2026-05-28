describe("user API tests", () => {
  it("should create user", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/users",
      body: {
        firstName: "Egor",
        surName: "Creed",
      },
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body.firstName).to.eq("Egor");
      expect(response.body.surName).to.eq("Creed");
    });
  });

  it("should get a user by ID", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/users",
      body: {
        firstName: "Egor",
        surName: "Creed",
      },
    }).then((response) => {
      const userId = response.body.id;
      cy.request({
        method: "GET",
        url: `http://localhost:8080/users/${userId}`,
      }).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);

        expect(response.body.id).to.eq(userId);
        expect(response.body.firstName).to.eq("Egor");
        expect(response.body.surName).to.eq("Creed");
      });
    });
  });

  it("should update an existing user (PUT /users/:id)", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/users",
      body: {
        firstName: "Egor",
        surName: "Creed",
      },
    }).then((response) => {
      const userId = response.body.id;
      cy.request({
        method: "PUT",
        url: `http://localhost:8080/users/${userId}`,
        body: {
          firstName: "Egor",
          surName: "Ivanov",
        },
      }).then((response) => {
        cy.log("PUT status: " + response.status);
        cy.log("PUT body: " + JSON.stringify(response.body));
        cy.request({
          method: "GET",
          url: `http://localhost:8080/users/${userId}`,
        }).then((response) => {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);

          expect(response.body.id).to.eq(userId);
          expect(response.body.firstName).to.eq("Egor");
          expect(response.body.surName).to.eq("Ivanov");
        });
      });
    });
  });

  it("should delete a user (DELETE /users/:id)", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/users",
      body: {
        id: 0,
        firstName: "ToBeDeleted",
        surName: "User",
      },
    }).then((response) => {
      const userId = response.body.id;

      cy.request({
        method: "DELETE",
        url: `http://localhost:8080/users/${userId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);

        cy.request({
          method: "GET",
          url: `http://localhost:8080/users/${userId}`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  });
});
