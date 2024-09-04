import 'cypress-xpath';
import Helpers from '../utils/Helpers';
import testIds from '../../configs/locators';

class SettingsProfilePage {
    elements = {
        firstNameField: () => cy.dataTestId(testIds.pages.settingsProfile.fields.firstName),
        lastNameField: () => cy.dataTestId(testIds.pages.settingsProfile.fields.lastName),
        phoneNumberField: () => cy.dataTestId(testIds.pages.settingsProfile.fields.phoneNumber),
        emailField: () => cy.dataTestId(testIds.pages.settingsProfile.fields.email),
        secondStepVerificationCheckbox: () =>
            cy.dataTestId(testIds.pages.settingsProfile.fields.secondStepVerification),
        cancelChangesBtn: () => cy.dataTestId(testIds.pages.settingsProfile.buttons.cancel),
        updateBtn: () => cy.dataTestId(testIds.pages.settingsProfile.buttons.update)
    };

    generatedID = Helpers.randomize(3).toString();

    updateProfile(): void {
        this.elements.firstNameField().clear().type('New');
        this.elements.lastNameField().clear().type(this.generatedID);
        this.elements.phoneNumberField().clear().type('+1 513 555 7778');
        this.elements.emailField().clear().type('vitalii@veido.com');
        this.elements.secondStepVerificationCheckbox().click();
        this.elements.secondStepVerificationCheckbox().click();
        this.elements.updateBtn().click();
        this.elements.firstNameField().should('have.value', 'New');
        this.elements.lastNameField().should('have.value', this.generatedID);
        this.elements.phoneNumberField().should('have.value', '+1 513 555 7778');
        this.elements.emailField().should('have.value', 'vitalii@veido.com');
    }
}

export default new SettingsProfilePage();
