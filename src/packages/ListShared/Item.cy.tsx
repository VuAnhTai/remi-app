import React from 'react';
import { Item } from './Item';

describe('<Item />', () => {
  it('renders', () => {
    cy.fixture('api/get_shared_urls_success.json').then(data => {
      const item = data[0];
      cy.mount(<Item data={item} />);

      cy.dataCy('video').should('be.visible');
      cy.dataCy('title').should('have.text', item.title);
      cy.dataCy('desc').should('have.text', item.description);
      cy.dataCy('shared-by').should('have.text', 'Shared by: ' + item.user.email);
    });
  });
});
