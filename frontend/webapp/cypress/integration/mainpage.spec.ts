/// <reference types="cypress" />

describe('Main page', () => {
  it('shows welcome text', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Tu powstaje platforma testów online.');
  });
});

export {};
