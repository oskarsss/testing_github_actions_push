import 'cypress-xpath';
import testIds from '../../configs/locators';
class FleetVendorsPage {
    elements = {
        fleetVendorsSearchField: () => cy.dataTestId(testIds.pages.fleetVendors.fields.search),
        addVendorBtn: () => cy.dataTestId(testIds.pages.fleetVendors.buttons.addVendor),
        vendorsResultPage: () => cy.dataTestId(testIds.components.coreTable),
        previousPageBtn: () => cy.dataTestId(testIds.components.pagination.previousPage),
        nextPageBtn: () => cy.dataTestId(testIds.components.pagination.nextPage),
        vendorsNameField: () => cy.dataTestId(testIds.pages.fleetVendors.fields.vendorsName),
        cancelVendorBtn: () => cy.dataTestId(testIds.pages.fleetVendors.buttons.cancelVendor),
        confirmVendorBtn: () => cy.dataTestId(testIds.pages.fleetVendors.buttons.confirmVendor),
        nameField: () => cy.dataTestId(testIds.pages.editVendor.fields.friendlyName),
        friendlyNameField: () => cy.dataTestId(testIds.pages.editVendor.fields.friendlyName),
        emailField: () => cy.dataTestId(testIds.pages.editVendor.fields.email),
        addressLine1Field: () => cy.dataTestId(testIds.pages.editVendor.fields.addressLine1),
        addressLine2Field: () => cy.dataTestId(testIds.pages.editVendor.fields.addressLine2),
        cityField: () => cy.dataTestId(testIds.pages.editVendor.fields.city),
        postalCodeField: () => cy.dataTestId(testIds.pages.editVendor.fields.postalCode),
        taxIDField: () => cy.dataTestId(testIds.pages.editVendor.fields.taxID),
        contactNameField: () => cy.dataTestId(testIds.pages.editVendor.fields.contactName),
        contactEmailField: () => cy.dataTestId(testIds.pages.editVendor.fields.contactEmail),
        contactPhoneField: () => cy.dataTestId(testIds.pages.editVendor.fields.contactPhone),
        updateVendorBtn: () => cy.dataTestId(testIds.pages.editVendor.buttons.updateVendor),
        closeEditVendorBtn: () => cy.dataTestId(testIds.pages.editVendor.buttons.closeEditVendor)
    };

    fleetVendorsSearchField(): void {
        this.elements.fleetVendorsSearchField().clear().type('Test Vendor');
        cy.wait(3000);
        this.elements.vendorsResultPage().should('contain.text', 'Test Vendor');
    }

    moveToNextPage(): void {
        this.elements.fleetVendorsSearchField().clear();
        this.elements.nextPageBtn().click();
    }

    moveToPreviousPage(): void {
        this.elements.previousPageBtn().click();
    }

    addVendor(): void {
        this.elements.addVendorBtn().click();
        this.elements.cancelVendorBtn().click();
        this.elements.addVendorBtn().click();
        this.elements.vendorsNameField().type('Trucks Inc');
        this.elements.vendorsNameField().should('have.value', 'Trucks Inc');
        this.elements.confirmVendorBtn().click();
        cy.wait(5000);
        this.elements.friendlyNameField().type('New Trucks Vendor');
        this.elements.emailField().type('inctrucks@gmail.com');
        this.elements.addressLine1Field().type('Bertrand Park');
        this.elements.addressLine2Field().type('700 W 3rd St');
        this.elements.cityField().type('Atchison');
        this.elements.postalCodeField().type('66002');
        this.elements.taxIDField().type('111');
        this.elements.contactNameField().type('Mark Smith');
        this.elements.contactEmailField().type('marksmt@gmail.com');
        this.elements.contactPhoneField().type('16464646478');
        this.elements.updateVendorBtn().click();
        this.elements.closeEditVendorBtn().click();
    }

    verifyAddingNewVendor(): void {
        this.elements.fleetVendorsSearchField().type('Trucks Inc');
        this.elements.vendorsResultPage().should('contain.text', 'Trucks Inc');
    }
}

export default new FleetVendorsPage();
