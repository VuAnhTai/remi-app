import { log } from 'console';

describe('Login Page', () => {
  it('At first load, page should has all field enabled', () => {
    cy.visit(`${Cypress.env('host_url')}/${Cypress.env('login_url')}`);
    cy.fixture('login-page.json').then(login => {
      cy.dataCy(login.locator.title).should('be.visible');
      cy.dataCy(login.locator.email).should('be.visible');
      cy.dataCy(login.locator.password).should('be.visible');
      cy.dataCy(login.locator.signin).should('be.visible').should('be.enabled');
      cy.dataCy(login.locator.signup).should('be.visible');
    });
  });

  it('After input correct credential, should go to home page', () => {
    cy.intercept(
      {
        method: 'POST', // Route all GET requests
        url: '**/auth/login', // that have a URL that matches '/users/*'
      },
      {
        fixture: 'api/post_auth_login_success.json',
      }
    ).as('doLogin'); // and assign an alias
    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '**/shared-urls',
      },
      {
        fixture: 'api/get_shared_urls_success.json',
      }
    ).as('getSharedUrls'); // and assign an alias
    cy.visit(`${Cypress.env('host_url')}/${Cypress.env('login_url')}`);
    cy.fixture('login-page.json').then(login => {
      cy.dataCy(login.locator.email).type(login.data_input.email);
      cy.dataCy(login.locator.password).type(login.data_input.password);
      cy.dataCy(login.locator.signin).click();
      cy.wait(['@doLogin', '@getSharedUrls']).then(interception => {
        cy.fixture('home-page.json').then(home => {
          cy.dataCy(home.locator.logo).should('have.text', home.labels.logo);
          cy.dataCy(home.locator.email).should('have.text', `Welcome ${login.data_input.email}`);
          cy.dataCy(home.locator.item).should('have.length', 4);
          cy.dataCy(home.locator.toggle_menu)
            .should('be.visible')
            .then(togger => {
              if (togger) {
                cy.dataCy(home.locator.toggle_menu).click();
                cy.dataCy(home.locator.signout_mb).should('be.visible');
                cy.dataCy(home.locator.share_video_mb).should('be.visible');
              } else {
                cy.dataCy(home.locator.signout).should('be.visible');
                cy.dataCy(home.locator.share_video).should('be.visible');
              }
            });
        });
      });
    });
  });
});
