/// <reference types="cypress" />

const URL = `http://localhost:3000/`;

describe('Main page', () => {
  cy.visit(URL);
  
  it('shows welcome text', () => {
    cy.contains('Tu powstaje platforma testów online.');
  });
});

export {};
