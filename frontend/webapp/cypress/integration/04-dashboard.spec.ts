/// <reference types="cypress" />

import { prepareLogIn } from '../helpers';

describe('User dashboard', () => {
  it('contains new test menu option TODO', () => {
    const prep = prepareLogIn();
    
    prep.doLogin();

    cy.contains('Ups');
  });
});

export {};
