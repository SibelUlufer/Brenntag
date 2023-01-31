const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  screenshotsFolder: "cypress/screenshots",
  defaultCommandTimeout: 25000,
  pageLoadTimeout: 25000,
  requestTimeout: 25000,
  watchForFileChanges: false,
  viewportWidth: 1536,
  viewportHeight: 1040,

  env: {
    email: "recruitment+4@digib.com",
    password: "123456",
  },
  e2e: {
    fileServerFolder: "tests/e2e/fixtures",
    responseTimeout: 10000,
    charset: "UTF-8",
    hideXHR: true,
    experimentalSessionAndOrigin: false,
    baseUrl: "https://apac.brenntag.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
