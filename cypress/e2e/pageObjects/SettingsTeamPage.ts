import 'cypress-xpath';
import Helpers from '../utils/Helpers';

class SettingsTeamPage {
    elements = {
        searchField: () => cy.xpath(`//input[@placeholder='Search...']`),
        addNewUserBtn: () => cy.xpath(`//button[contains(text(), 'Add')]`),
        inviteUserBtn: () => cy.xpath(`//button[contains(text(), 'Invite')]`),
        inviteUserEmailField: () => cy.xpath(`//input[@placeholder='john@abctrucking.com']`),
        cancelInviteBtn: () =>
            cy.xpath(
                `//div[@id='select-input-role_id']//following::button[contains(text(), 'Cancel')]`
            ),
        confirmInviteBtn: () =>
            cy.xpath(
                `//div[@id='select-input-role_id']//following::button[contains(text(), 'Invite')]`
            ),
        roleSelector: () => cy.xpath(`//div[@id='select-input-role_id']`),
        updaterRole: () => cy.xpath(`//ul[@role='listbox']/li[contains(text(), 'Updater')]`),
        resultTable: () => cy.xpath(`//table[@class='scrollbar-container ps ps--active-y']`),
        firstNameField: () => cy.xpath(`//input[@placeholder='John']`),
        lastNameField: () => cy.xpath(`//input[@placeholder='Doe']`),
        titleField: () => cy.xpath(`//input[@placeholder='Dispatcher']`),
        phoneNumberField: () => cy.xpath(`//input[@name='phone_number']`),
        emailField: () => cy.xpath(`//input[@placeholder='email@vektortms.com']`),
        passwordField: () => cy.xpath(`//input[@type='password']`),
        addUserRoleSelector: () =>
            cy.xpath(
                `//span[contains(text(), '2FA Enabled')]//preceding::div[@id='select-input-role_id']`
            ),
        secondStepVerificationCheckbox: () => cy.xpath(`//span[contains(text(), '2FA Enabled')]`),
        pwChangeCheckbox: () => cy.xpath(`//span[contains(text(), 'PW Change')]`),
        cancelBtn: () =>
            cy.xpath(
                `//span[contains(text(), 'PW Change')]//following::button[contains(text(), 'Cancel')]`
            ),
        addBtn: () =>
            cy.xpath(
                `//span[contains(text(), 'PW Change')]//following::button[contains(text(), 'Add')]`
            )
    };

    generatedEmail = Helpers.randomize(7).toString();
    random = Helpers.randomize(3).toString();

    verifySearchField(): void {
        this.elements.searchField().type('email@gmail.com');
        this.elements.searchField().should('have.value', 'email@gmail.com');
    }

    inviteUser(): void {
        this.elements.inviteUserBtn().click();
        this.elements.inviteUserEmailField().type(this.generatedEmail + '@gmail.com');
        this.elements.roleSelector().click();
        this.elements.updaterRole().click();
        this.elements.confirmInviteBtn().click();
        cy.wait(4000);
    }

    addUser(): void {
        this.elements.addNewUserBtn().click();
        this.elements.firstNameField().type(this.random);
        this.elements.lastNameField().type(this.random);
        this.elements.titleField().type(this.random);
        this.elements.phoneNumberField().type(this.random);
        this.elements.emailField().type(this.generatedEmail + '@gmail.com');
        this.elements.passwordField().type('qwerty1');
        this.elements.addUserRoleSelector().click();
        this.elements.updaterRole().click();
        this.elements.secondStepVerificationCheckbox().click();
        this.elements.pwChangeCheckbox().click();
        this.elements.secondStepVerificationCheckbox().click();
        this.elements.pwChangeCheckbox().click();
        this.elements.addBtn().click();
    }
}

export default new SettingsTeamPage();
