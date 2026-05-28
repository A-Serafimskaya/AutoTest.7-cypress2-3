const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 2,
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
