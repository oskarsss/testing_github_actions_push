import 'cypress-xpath';

class SettingsRolesPage {
    elements = {
        addRoleBtn: () => cy.xpath(`//button[contains(text(),'Add')]`),
        nameField: () => cy.xpath(`//input[@placeholder='Name']`),
        cancelAddingRoleBtn: () =>
            cy.xpath(`//input[@placeholder='Name']//following::button[contains(text(), 'Cancel')]`),
        confirmAddingRoleBtn: () =>
            cy.xpath(`//input[@placeholder='Name']//following::button[contains(text(), 'ADD')]`),
        editRoleBtn: () =>
            cy.xpath(`//tbody[@class='MuiTableBody-root css-1xna0ck']/tr[1]//button`),
        viewHomeCheckbox: () => cy.xpath(`//span[contains(text(), 'View Home')]`),
        viewLoadsCheckbox: () => cy.xpath(`//span[contains(text(), 'View Loads')]`),
        editInvoiceStatusCheckbox: () =>
            cy.xpath(`//span[contains(text(), 'Edit Invoice Status')]`),
        editLoadInvoicingCheckbox: () =>
            cy.xpath(`//span[contains(text(), 'Edit Load Invoicing')]`),
        editLoadDriverPayCheckbox: () =>
            cy.xpath(`//span[contains(text(), 'Edit Load Driver Pay')]`),
        editLoadInvoicePaymentsCheckbox: () =>
            cy.xpath(`//span[contains(text(), 'Edit Load Invoice Payments')]`),
        viewSchedulingCheckbox: () => cy.xpath(`//span[contains(text(), 'View Scheduling')]`),
        viewStatsCheckbox: () => cy.xpath(`//span[contains(text(), 'View Stats')]`),
        viewBrokersCheckbox: () => cy.xpath(`//span[contains(text(), 'View Brokers')]`),
        viewCustomersCheckbox: () => cy.xpath(`//span[contains(text(), 'View Customers')]`),
        viewPlatesCheckbox: () => cy.xpath(`//span[contains(text(), 'View Plates')]`),
        viewTrucksCheckbox: () => cy.xpath(`//span[contains(text(), 'View Trucks')]`),
        viewTrailersCheckbox: () => cy.xpath(`//span[contains(text(), 'View Trailers')]`),
        viewDriversCheckbox: () => cy.xpath(`//span[contains(text(), 'View Drivers')]`),
        viewVendorsCheckbox: () => cy.xpath(`//span[contains(text(), 'View Vendors')]`),
        viewInvoicesCheckbox: () => cy.xpath(`//span[contains(text(), 'View Invoices')]`),
        viewSettlementsCheckbox: () => cy.xpath(`//span[contains(text(), 'View Settlements')]`),
        viewRecurringTransactionsCheckbox: () =>
            cy.xpath(`//span[contains(text(), 'View Recurring transactions')]`),
        viewTollsCheckbox: () => cy.xpath(`//span[contains(text(), 'View Tolls')]`),
        viewFuelCheckbox: () => cy.xpath(`//span[contains(text(), 'View Fuel')]`),
        viewIFTACheckbox: () => cy.xpath(`//span[contains(text(), 'View IFTA')]`),
        viewSettingsCheckbox: () => cy.xpath(`//span[contains(text(), 'View Settings')]`),
        viewSettingBillingCheckbox: () =>
            cy.xpath(`//span[contains(text(), 'View Settings Billing')]`),
        saveBtn: () => cy.xpath(`//button[contains(text(), 'SAVE')]`),
        deleteRoleBtn: () => cy.xpath(`//button[contains(text(), 'Delete')]`)
    };

    addRole(): void {
        this.elements.addRoleBtn().click();
        this.elements.cancelAddingRoleBtn().click();
        this.elements.addRoleBtn().click();
        this.elements.nameField().type('Test');
        this.elements.confirmAddingRoleBtn().click();
        this.elements.editRoleBtn().first().click();
        this.elements.viewHomeCheckbox().click();
        this.elements.viewLoadsCheckbox().click();
        this.elements.editInvoiceStatusCheckbox().click();
        this.elements.editLoadInvoicingCheckbox().click();
        this.elements.editLoadDriverPayCheckbox().click();
        this.elements.editLoadInvoicePaymentsCheckbox().click();
        this.elements.viewSchedulingCheckbox().click();
        this.elements.viewStatsCheckbox().click();
        this.elements.viewBrokersCheckbox().click();
        this.elements.viewCustomersCheckbox().click();
        this.elements.viewPlatesCheckbox().click();
        this.elements.viewTrucksCheckbox().click();
        this.elements.viewTrailersCheckbox().click();
        this.elements.viewDriversCheckbox().click();
        this.elements.viewVendorsCheckbox().click();
        this.elements.viewInvoicesCheckbox().click();
        this.elements.viewSettlementsCheckbox().click();
        this.elements.viewRecurringTransactionsCheckbox().click();
        this.elements.viewTollsCheckbox().click();
        this.elements.viewFuelCheckbox().click();
        this.elements.viewIFTACheckbox().click();
        this.elements.saveBtn().click();
        this.elements.editRoleBtn().click();
        this.elements.deleteRoleBtn().click();
    }
}

export default new SettingsRolesPage();
