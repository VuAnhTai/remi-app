import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    host_url: 'http://localhost:3000',
    login_url: 'login',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
