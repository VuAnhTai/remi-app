// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
require('cypress-wait-until');
import '@testing-library/cypress/add-commands';
// Import commands.js using ES2015 syntax:
import './commands';
import './utils';
// Alternatively you can use CommonJS syntax:
// require('./commands')
/**
 * Adds custom command "cy.dataCy" to the global "cy" object
 *
 * @example cy.dataCy('greeting')
 */
Cypress.Commands.add('dataCy', value => cy.get(`[data-testid=${value}]`));
