import '@testing-library/cypress/add-commands';
import '@ult/shared/test/cypress';

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
  }
}
