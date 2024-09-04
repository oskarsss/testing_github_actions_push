import { createDriver } from '../utils/Interceptor';
import 'cypress-xpath';
import testIds from '../../configs/locators';

class FleetDriversPage {
    elements = {
        fleetDriversSearchField: () => cy.dataTestId(testIds.pages.fleetDrivers.fields.search),
        driversResultTable: () => cy.dataTestId(testIds.components.coreTable),
        addDriverBtn: () => cy.dataTestId(testIds.pages.fleetDrivers.buttons.addDriver),
        driversFirstNameField: () =>
            cy.dataTestId(testIds.pages.fleetDrivers.fields.driversFirstName),
        driversLastNameField: () =>
            cy.dataTestId(testIds.pages.fleetDrivers.fields.driversLastName),
        driversTypeField: () => cy.dataTestId(testIds.pages.fleetDrivers.fields.driversType),
        cancelAddingDriverBtn: () =>
            cy.dataTestId(testIds.pages.fleetDrivers.buttons.cancelAddingDriver),
        confirmAddingDriverBtn: () =>
            cy.dataTestId(testIds.pages.fleetDrivers.buttons.confirmAddingDriver),
        driversMiddleNameField: () => cy.dataTestId(testIds.pages.editDriver.fields.middleName),
        driversLastNameFieldEdit: () => cy.dataTestId(testIds.pages.editDriver.fields.lastName),
        driversBirthDateField: () => cy.dataTestId(testIds.pages.editDriver.fields.birthDate),
        driversPhoneNumberField: () => cy.dataTestId(testIds.pages.editDriver.fields.phoneNumber),
        driversEmailField: () => cy.dataTestId(testIds.pages.editDriver.fields.email),
        driversAddressLine1Field: () => cy.dataTestId(testIds.pages.editDriver.fields.addressLine1),
        driversAddressLine2Field: () => cy.dataTestId(testIds.pages.editDriver.fields.addressLine2),
        driversCityField: () => cy.dataTestId(testIds.pages.editDriver.fields.city),
        driversPostalCodeField: () => cy.dataTestId(testIds.pages.editDriver.fields.postalCode),
        driversStateField: () => cy.dataTestId(testIds.pages.editDriver.fields.state),
        revenueTypeField: () => cy.dataTestId(testIds.pages.editDriver.fields.revenueType),
        cycleTypeField: () => cy.dataTestId(testIds.pages.editDriver.fields.cycle),
        vendorField: () => cy.dataTestId(testIds.pages.editDriver.fields.vendor),
        driversHireDateField: () => cy.dataTestId(testIds.pages.editDriver.fields.hireDate),
        insuranceEndorsedField: () =>
            cy.dataTestId(testIds.pages.editDriver.fields.insuranceEndorsed),
        saveDriverBtn: () => cy.dataTestId(testIds.pages.editDriver.buttons.save),
        messageField: () => cy.dataTestId(testIds.pages.editDriver.fields.message),
        sendMessageBtn: () => cy.dataTestId(testIds.pages.editDriver.buttons.sendMessage),
        messageBox: () => cy.dataTestId(testIds.pages.editDriver.areas.messageBox),
        addDocumentField: () => cy.dataTestId(testIds.pages.editDriver.fields.documentDrop),
        deleteDocumentIconBtn: () =>
            cy.dataTestId(testIds.pages.editDriver.buttons.deleteDocumentIcon),
        deleteDriverBtn: () => cy.dataTestId(testIds.pages.editDriver.buttons.deleteDriver),
        confirmDeleteDriverBtn: () =>
            cy.dataTestId(testIds.pages.editDriver.buttons.confirmDeleteDriver)
    };
    dragAndDropFileToContainer() {
        this.elements.addDocumentField().selectFile('Settlement_3049_DeShawn_Graham.pdf', {
            action: 'drag-drop'
        });
        cy.wait(5000);
    }
    verifySearchField(): void {
        this.elements.fleetDriversSearchField().type('Scott Zalinger');
        cy.wait(2000);
        this.elements.driversResultTable().should('contain.text', 'Scott Zalinger');
    }
    verifyAddingNewDriver(): void {
        this.elements.addDriverBtn().click();
        this.elements.cancelAddingDriverBtn().click();
        this.elements.addDriverBtn().click();
        this.elements.driversFirstNameField().type('Test');
        this.elements.driversFirstNameField().should('have.value', 'Test');
        this.elements.driversLastNameField().type('Test');
        this.elements.driversLastNameField().should('have.value', 'Test');
        this.elements.driversTypeField().click();
        const driverType = cy.get('[data-testid=driver-type-select-option-]').siblings();
        driverType.first().click();
        this.elements.confirmAddingDriverBtn().click();
        createDriver.intercept();
        createDriver.wait();
        this.elements.driversFirstNameField().should('have.value', 'Test');
        this.elements.driversMiddleNameField().type('Driver');
        this.elements.driversMiddleNameField().should('have.value', 'Driver');
        this.elements.driversLastNameFieldEdit().should('have.value', 'Test');
        this.elements.driversBirthDateField().type('01/01/1990');
        this.elements.driversBirthDateField().should('have.value', '01/01/1990');
        this.elements.driversPhoneNumberField().type('2038154561');
        this.elements.driversPhoneNumberField().should('have.value', '(203) 815-4561');
        this.elements.driversEmailField().type('testdriver@vektortms.com');
        this.elements.driversEmailField().should('have.value', 'testdriver@vektortms.com');
        this.elements.driversAddressLine1Field().type('123 Test Street');
        this.elements.driversAddressLine1Field().should('have.value', '123 Test Street');
        this.elements.driversAddressLine2Field().type('Apt 123');
        this.elements.driversAddressLine2Field().should('have.value', 'Apt 123');
        this.elements.driversCityField().type('Chicago');
        this.elements.driversCityField().should('have.value', 'Chicago');
        this.elements.driversPostalCodeField().type('60601');
        this.elements.driversPostalCodeField().should('have.value', '60601');
        this.elements.driversStateField().click();
        const stateSelectors = cy.get('[data-testid=state-select-option-]').siblings();
        stateSelectors.first().click();
        this.elements.revenueTypeField().click();
        const revenueType = cy.get('[data-testid=revenue-type-select-option-]').siblings();
        revenueType.first().click();
        this.elements.cycleTypeField().click();
        const cycleType = cy.get('[data-testid=cycle-select-option-]').siblings();
        cycleType.first().click();
        this.elements.vendorField().click();
        const vendor = cy.get('[data-testid=vendor-select-option-]').siblings();
        vendor.first().click();
        this.elements.driversHireDateField().type('01/01/2023');
        this.elements.driversHireDateField().should('have.value', '01/01/2023');
        this.elements.insuranceEndorsedField().click();
        cy.wait(2000);
        this.elements.saveDriverBtn().click();
        cy.wait(2000);
        this.elements.messageField().type('Driver successfully created');
        this.elements.sendMessageBtn().click();
        this.elements.messageBox().should('contain.text', 'Driver successfully created');
        this.dragAndDropFileToContainer();
        this.elements.deleteDriverBtn().click();
        this.elements.confirmDeleteDriverBtn().click();
    }
}
export default new FleetDriversPage();
