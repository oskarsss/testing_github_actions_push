import testIds from '../../configs/locators';
import 'cypress-xpath';
class CreateAccountPage {
    elements = {
        firstNameField: () => cy.dataTestId(testIds.pages.createAccount.fields.firstName),
        lastNameField: () => cy.dataTestId(testIds.pages.createAccount.fields.lastName),
        phoneNumberField: () => cy.dataTestId(testIds.pages.createAccount.fields.phoneNumber),
        emailField: () => cy.dataTestId(testIds.pages.createAccount.fields.email),
        passwordField: () => cy.dataTestId(testIds.pages.createAccount.fields.password),
        dotField: () => cy.dataTestId(testIds.pages.createAccount.fields.dot),
        referralCodeField: () => cy.dataTestId(testIds.pages.createAccount.fields.referalCode),
        createAccountBtn: () => cy.dataTestId(testIds.pages.createAccount.buttons.createAccount),
        signInInsteadBtn: () => cy.dataTestId(testIds.pages.createAccount.links.backToLogin),
        mainLoginContainer: () => cy.dataTestId(testIds.pages.login.areas.login)
    };

    createAccount(): void {
        this.elements.firstNameField().type('Andy');
        this.elements.lastNameField().type('Jones');
        this.elements.phoneNumberField().type('5135557777');
        this.elements.emailField().type('ajones@testmail.com');
        this.elements.passwordField().type('qwerty');
        this.elements.dotField().type('1');
        this.elements.referralCodeField().type('2580');
        this.elements.createAccountBtn().click();
    }

    signInInstead(): void {
        this.elements.signInInsteadBtn().click();
        this.elements.mainLoginContainer().should('contain.text', 'Welcome Back');
    }
}

export default new CreateAccountPage();
