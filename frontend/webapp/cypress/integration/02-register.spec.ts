/// <reference types="cypress" />

import { ProxyUrl } from '../helpers';

describe('Register page', () => {
  const typed = {
    email: 'test@mail.com',
    name: 'Test',
    surname: 'User',
    password: 'testpassword',
    retyped: 'testpasswordxd',
  };

  const selectors = {
    email: "input[name='email']",
    name: "input[name='name']",
    surname: "input[name='surname']",
    password: "input[name='password']",
    retyped: "input[name='password2']",
    button: "button[type='submit']",
  };

  it('fills inputs', () => {
    cy.visit('/signup');

    cy.get(selectors.email).type(typed.email).should('have.value', typed.email);
    cy.get(selectors.name).type(typed.name).should('have.value', typed.name);
    cy.get(selectors.surname).type(typed.surname).should('have.value', typed.surname);

    cy.get(selectors.password).type(typed.password).should('have.value', typed.password);
    cy.get(selectors.retyped).type(typed.retyped).should('have.value', typed.retyped);
  });

  it('shows invalid retype', () => {
    cy.get(selectors.button).click();

    cy.contains('Hasła muszą się zgadzać');
  });

  it('creates user on valid data', () => {
    cy.intercept('POST', `${ProxyUrl}/recaptcha/`, { statusCode: 200, body: { success: true } });
    cy.intercept('POST', `${ProxyUrl}/register/`, { statusCode: 201, body: { email: typed.email } });

    cy.get(selectors.retyped).clear().type(typed.password);

    cy.get(selectors.button).click();

    if (cy.get('iframe').length > 0) {
      cy.log('Recaptcha opened :C')

    } else {
      cy.contains(typed.email).contains('został wysłany e-mail');
    }
  });
});

export {};
