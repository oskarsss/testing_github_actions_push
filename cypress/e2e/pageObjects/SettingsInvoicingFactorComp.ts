import 'cypress-xpath';

class SettingsInvociingFactorComp {
    elements = {
        connectedBtn: () => cy.xpath(`//button[contains(text(), 'Connected')]`),
        disconnectedBtn: () => cy.xpath(`//button[contains(text(), 'Disconnected')]`),
        connectRTSBtn: () =>
            cy.xpath(
                `//button[contains(text(), 'Disconnected')]//following::button[contains(text(), 'Connect')][1]`
            ),
        rtsName: () => cy.xpath(`//h6[contains(text(), 'RTS Financial Service, Inc.')]`),
        editFactorCompBtn: () => cy.xpath(`//button[contains(text(), 'Edit')]`),
        feePercentageField: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-fee_percentage']//input`),
        cutOffTimeField: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-cutoff_time']//input`),
        endContractField: () => cy.xpath(`//input[@name='contract_end_at']`),
        noteField: () => cy.xpath(`//textarea[@placeholder='Note']`),
        saveBtn: () => cy.xpath(`//button[contains(text(), 'Save Changes')]`),
        disconnectBtn: () =>
            cy.xpath(
                `//button[contains(text(), 'Edit')]//following-sibling::button[contains(text(), 'Disconnect')]`
            )
    };

    editFactorComp(): void {
        this.elements.disconnectedBtn().click();
        this.elements.connectRTSBtn().click();
        this.elements.connectedBtn().click();
        cy.wait(3000);
        this.elements.editFactorCompBtn().click();
        this.elements.feePercentageField().clear().type('10');
        this.elements.feePercentageField().should('have.value', '10');
        this.elements.cutOffTimeField().clear().type('00:06');
        this.elements.cutOffTimeField().should('have.value', '00:06');
        this.elements.endContractField().type('02-02-2024 10:00 AM');
        this.elements.noteField().click().type('Test note');
        this.elements.noteField().should('have.value', 'Test note');
        this.elements.saveBtn().click();
        this.elements.disconnectBtn().click();
        this.elements.rtsName().should('not.exist');
    }
}

export default new SettingsInvociingFactorComp();
