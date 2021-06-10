/// <reference types="cypress" />

describe('Main page', () => {
  it('shows welcome text', () => {
    cy.visit('/');
    cy.contains('Tu powstaje platforma testów online.');
  });
});

export {};
