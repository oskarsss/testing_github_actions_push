import 'cypress-xpath';
import testIds from '../../configs/locators';
class LoginPage {
    elements = {
        emailField: () => cy.dataTestId(testIds.pages.login.fields.email),
        passwordField: () => cy.dataTestId(testIds.pages.login.fields.password),
        loginBtn: () => cy.dataTestId(testIds.pages.login.buttons.login),
        forgotPasswordBtn: () => cy.dataTestId(testIds.pages.login.links.forgotPassword),
        createAccountBtn: () => cy.dataTestId(testIds.pages.login.buttons.createAccount),
        emailFieldInForgotPassword: () => cy.dataTestId(testIds.pages.login.fields.forgotPassword),
        sendResetLinkBtn: () => cy.dataTestId(testIds.pages.login.buttons.sendResetLink),
        backToLoginBtn: () => cy.dataTestId(testIds.pages.login.buttons.backToLogin),
        dashboardMenuBtn: () => cy.xpath(testIds.pages.navigation.links.dashboard),
        mainLoginContainer: () => cy.dataTestId(testIds.pages.login.areas.login)
    };

    login(): void {
        this.elements.emailField().type('vitalii@veido.com');
        this.elements.passwordField().type('qwerty1');
        this.elements.loginBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/home');
    }

    goToCreateAccountPage(): void {
        this.elements.createAccountBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/register');
    }

    forgotPassword(): void {
        this.elements.forgotPasswordBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/forgot-password');
        this.elements.emailFieldInForgotPassword().type('vitalii@veido.com');
        this.elements.sendResetLinkBtn().click();
        this.elements.mainLoginContainer().should('contain.text', 'Forgot Password?');
    }

    backToLoginFromResetPasswordPage(): void {
        this.elements.forgotPasswordBtn().click();
        this.elements.backToLoginBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/login');
        this.elements.mainLoginContainer().should('contain.text', 'Welcome Back');
    }
}

export default new LoginPage();
