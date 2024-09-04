import 'cypress-xpath';

class SettingsSecurityPage {
    elements = {
        editBtn: () => cy.xpath(`//button[contains(text(), 'Edit')]`),
        saveBtn: () => cy.xpath(`//button[contains(text(), 'Save')]`),
        secondStepAuthCheckbox: () =>
            cy.xpath(`//span[contains(text(), 'Enforce Second Step Auth')]`),
        strongPasswordCheckbox: () =>
            cy.xpath(`//span[contains(text(), 'Enforce Strong Password')]`)
    };

    editSecuritySettings(): void {
        this.elements.editBtn().click();
        this.elements.secondStepAuthCheckbox().click();
        this.elements.secondStepAuthCheckbox().click();
        this.elements.strongPasswordCheckbox().click();
        this.elements.strongPasswordCheckbox().click();
        this.elements.saveBtn().click();
    }
}

export default new SettingsSecurityPage();
