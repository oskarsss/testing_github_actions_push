import 'cypress-xpath';
import Helpers from '../utils/Helpers';

class SettingsCompanyPage {
    elements = {
        editCompanyBtn: () =>
            cy.xpath(
                `//label[contains(text(), 'Company Name')]//preceding::button[contains(text(), 'Edit')]`
            ),
        editLoadPrefsBtn: () =>
            cy.xpath(
                `//label[contains(text(), 'Company Name')]//following::button[contains(text(), 'Edit')]`
            ),
        saveBtn: () => cy.xpath(`//button[contains(text(), 'Save')]`),
        companyNameField: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-name']//child::input`),
        DOTField: () => cy.xpath(`//div[@aria-describedby='stepper-linear-dot']//child::input`),
        phoneNumberField: () => cy.xpath(`//input[@name='phone_number']`),
        faxField: () => cy.xpath(`//input[@name='fax']`),
        emailField: () => cy.xpath(`//div[@aria-describedby='stepper-linear-email']//child::input`),
        billingEmailField: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-billing_email']//child::input`),
        currencyField: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-currency']//child::input`),
        addressLine1: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-address_line_1']//child::input`),
        addressLine2: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-address_line_2']//child::input`),
        addressCity: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-address_city']//child::input`),
        postalCode: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-address_postal_code']//child::input`),
        loadIdNumber: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-load_id_start_number']//child::input`)
    };

    generatedBillingEmail = Helpers.randomize(5) + '@testaccount.com';

    editCompanyDetails(): void {
        this.elements.editCompanyBtn().click();
        this.elements.companyNameField().clear().type('Test Full 2');
        this.elements.companyNameField().should('have.value', 'Test Full 2');
        this.elements.DOTField().clear().type('149299');
        this.elements.DOTField().should('have.value', '149299');
        this.elements.phoneNumberField().clear().type('+1 929 271 7711');
        this.elements.phoneNumberField().should('have.value', '+1 929 271 7711');
        this.elements.faxField().clear().type('+1 412 412 2241');
        this.elements.faxField().should('have.value', '+1 412 412 2241');
        this.elements.emailField().clear().type('test@testaccount.com');
        this.elements.emailField().should('have.value', 'test@testaccount.com');
        this.elements.billingEmailField().clear().type(this.generatedBillingEmail);
        this.elements.billingEmailField().should('have.value', this.generatedBillingEmail);
        this.elements.currencyField().clear().type('USD');
        this.elements.currencyField().should('have.value', 'USD');
        this.elements.addressLine1().clear().type('1337 2nd Ave');
        this.elements.addressLine1().should('have.value', '1337 2nd Ave');
        this.elements.addressLine2().clear().type('Apt 2');
        this.elements.addressLine2().should('have.value', 'Apt 2');
        this.elements.addressCity().clear().type('New York');
        this.elements.addressCity().should('have.value', 'New York');
        this.elements.postalCode().clear().type('10016');
        this.elements.postalCode().should('have.value', '10016');
        this.elements.saveBtn().click();
    }

    editLoadPrefs(): void {
        this.elements.editLoadPrefsBtn().click();
        this.elements.loadIdNumber().clear().type('5000');
        this.elements.loadIdNumber().should('have.value', '5000');
        this.elements.saveBtn().click();
    }
}

export default new SettingsCompanyPage();
