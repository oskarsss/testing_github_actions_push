import LoginPage from '../pageObjects/LoginPage';
import CreateAccountPage from '../pageObjects/CreateAccountPage';

describe('Create Account Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/login');
    });

    it('should create a new user account', () => {
        LoginPage.goToCreateAccountPage();
        CreateAccountPage.createAccount();
    });

    /*it('should redirect user from register page to login page', () => {
        cy.visit('/login');
        LoginPage.goToCreateAccountPage();
        CreateAccountPage.signInInstead();
        cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).to.include('missing required parameters sitekey');
        return false;
        });
    });*/

    it('should redirect to reset password page where the user has to write email', () => {
        LoginPage.forgotPassword();
    });

    it('should redirect from reset password page to the login page', () => {
        LoginPage.backToLoginFromResetPasswordPage();
    });
});
