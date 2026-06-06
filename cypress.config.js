const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'rkje86',
  retries: 2,
  allowCypressEnv: false,

  e2e: {
    //baseUrl: "http://localhost:8080/users",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
