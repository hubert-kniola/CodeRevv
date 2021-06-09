/// <reference types="cypress" />

const PROXY = `http://127.0.0.1:8000/api/v1`;

describe('Login page', () => {
  const typedEmail = 'test@mail.com';
  const typedPassword = 'testpassword';
  const response = {
    expiresAt: 10230192039,
    userInfo: {
      name: 'Test',
      surname: 'User',
      role: 'user',
    },
  };
  const selectors = {
    email: "input[name='email']",
    password: "input[name='password']",
    button: "button[type='submit']",
  };

  it('fills inputs and logs in', () => {
    cy.intercept('POST', `${PROXY}/login/`, { statusCode: 200, body: response });
    cy.visit('http://localhost:3000/signin');

    cy.get(selectors.email).type(typedEmail).should('have.value', typedEmail);
    cy.get(selectors.password).type(typedPassword).should('have.value', typedPassword);

    cy.get(selectors.button).click();
  });
});

export {};
