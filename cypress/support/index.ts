import { TestKey } from '../configs/constants';

Cypress.Commands.add('dataTestId', (value) => {
    return cy.get(`[${TestKey}=${value}]`);
});
