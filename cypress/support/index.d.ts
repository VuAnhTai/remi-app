// describe custom Cypress commands in this file

// load the global Cypress types
/// <reference types="cypress" />
// load the 3rd party command definition for cy.waitUntil()

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element | JQuery<HTMLElement>>;

    /**
     * Custom command that adds two given numbers
     */
    asyncAdd(a: number, b: number): Chainable<number>;

    login(email: string, password: string): Chainable<void>;

    openListCustomSegmentPage(): Chainable<void>;
    openMenuByName(menuName: string): Chainable<void>;
    shouldSelectedOption(value: string, label: string): Chainable<void>;
    selectOptionByLabel(label: string): Chainable<void>;
    openActionReportPage(data?: any[]): Chainable<object[]>;
  }
}
