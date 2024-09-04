import 'cypress-xpath';
import testIds from '../../configs/locators';

class SettingsPasswordPage {
    elements = {
        currentPasswordField: () =>
            cy.dataTestId(testIds.pages.settingsPassword.fields.currentPassword),
        newPasswordField: () => cy.dataTestId(testIds.pages.settingsPassword.fields.newPassword),
        confirmPasswordField: () =>
            cy.dataTestId(testIds.pages.settingsPassword.fields.confirmPassword),
        changePasswordBtn: () =>
            cy.dataTestId(testIds.pages.settingsPassword.buttons.changePassword)
    };

    changePassword(): void {
        this.elements.currentPasswordField().clear().type('qwerty1');
        this.elements.currentPasswordField().should('have.value', 'qwerty1');
        this.elements.newPasswordField().clear().type('qwerty1');
        this.elements.newPasswordField().should('have.value', 'qwerty1');
        this.elements.confirmPasswordField().clear().type('qwerty1');
        this.elements.confirmPasswordField().should('have.value', 'qwerty1');
        this.elements.changePasswordBtn().click();
    }
}

export default new SettingsPasswordPage();
