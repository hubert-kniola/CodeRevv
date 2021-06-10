/// <reference types="cypress" />

import { prepareLogIn } from '../helpers';

describe('Login page', () => {
  it('fills inputs', () => {
    const prep = prepareLogIn();

    cy.get(prep.selectors.email).should('have.value', prep.typed.email);
    cy.get(prep.selectors.password).should('have.value', prep.typed.password);
  });

  it('logs in', () => {
    const prep = prepareLogIn();

    prep.doLogin();

    cy.url().should('include', 'dashboard');
  });

  it('keeps user data after login', () => {
    const prep = prepareLogIn();
    prep.doLogin();

    cy.visit('/');
    cy.visit('/dashboard');
    cy.contains(`Cześć, ${prep.userInfo.name}`);
  });
});

export {};
