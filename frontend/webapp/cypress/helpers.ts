export function nextDay() {
  var result = new Date();
  result.setDate(new Date().getDate() + 1);
  return result.getTime() / 1000;
}

export const ProxyUrl = `http://localhost:8000/api/v1`;

export type LoginPrep = {
  selectors: { [x: string]: string };
  typed: { email: string; password: string };
  userInfo: { name: string; surname: string; role: string };
  doLogin: () => Cypress.Chainable<JQuery<HTMLElement>>;
};

export function prepareLogIn(): LoginPrep {
  const result = {
    typed: {
      email: 'test@mail.com',
      password: 'testpassword',
    },
    userInfo: {
      name: 'Test',
      surname: 'User',
      role: 'user',
    },
    selectors: {
      email: "input[name='email']",
      password: "input[name='password']",
      button: "button[type='submit']",
    },
  };

  const response = {
    state: {
      expiresAt: nextDay(),
      userInfo: result.userInfo,
    },
    success: true,
  };

  cy.intercept('POST', `${ProxyUrl}/login/`, { statusCode: 200, body: response });
  cy.visit('/signin');

  cy.get(result.selectors.email).type(result.typed.email);
  cy.get(result.selectors.password).type(result.typed.password);

  return { ...result, doLogin: () => cy.get(result.selectors.button).click() };
}
