import React from 'react';
import { ListShared } from './index';

describe('<ListShared />', () => {
  it('renders', () => {
    cy.fixture('api/get_shared_urls_success.json').then(data => {
      cy.mount(<ListShared data={data} />);

      cy.dataCy('item').should('length', data.length);
    });
  });

  it('renders empty', () => {
    cy.mount(<ListShared data={[]} />);

    cy.dataCy('item').should('length', 0);
    cy.dataCy('no-data').should('have.text', 'No data');
  });
});
