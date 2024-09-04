import LoginPage from '../pageObjects/LoginPage';

describe('Login Page Test', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/login');
    });

    it('should login the user and redirect to the home page', () => {
        LoginPage.login();
    });
});
