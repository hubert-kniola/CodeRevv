/// <reference types="cypress" />

describe('Main page', () => {
  const selectors = {
    register: "a[href='/signup']",
    login: "a[href='/signin']",
  };

  it('shows dev welcome text', () => {
    cy.visit('/');
    cy.contains('Tu powstaje platforma testów online.');
  });

  it('shows contact info', () => {
    cy.contains('coderevv@gmail.com');
  });

  it('shows login and signup buttons', () => {
    cy.get(selectors.register).should('have.text', 'Zarejestruj się');
    cy.get(selectors.login).should('have.text', 'Zaloguj się');
  });

  it('redirects to signup on click', () => {
    cy.visit('/');
    cy.get(selectors.register).click();
    cy.contains('Stwórz konto');
  });

  it('redirects to login on click', () => {
    cy.visit('/');
    cy.get(selectors.login).click();
    cy.contains('Masz już konto?');
  });
});

export {};
