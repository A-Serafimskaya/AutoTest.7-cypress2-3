Cypress.Commands.add("createUser", (userData) => {
  return cy.request({
    method: "POST",
    url: "http://localhost:8080/users",
    body: userData,
  });
});

Cypress.Commands.add("getUserById", (userId) => {
  return cy.request({
    method: "GET",
    url: `http://localhost:8080/users/${userId}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("updateUser", (userId, updatedData) => {
  // Формируем URL с query‑параметрами
  const params = new URLSearchParams(updatedData);
  const putUrl = `http://localhost:8080/users/${userId}?${params.toString()}`;

  return cy.request({
    method: "PUT",
    url: putUrl,
  });
});

Cypress.Commands.add("deleteUser", (userId) => {
  return cy.request({
    method: "DELETE",
    url: `http://localhost:8080/users/${userId}`,
  });
});