import testIds from '../../configs/locators';
import 'cypress-xpath';
class FleetTrucksPage {
    elements = {
        fleetTrucksSearchField: () => cy.dataTestId(testIds.pages.fleetTrucks.fields.search),
        addTruckBtn: () => cy.dataTestId(testIds.pages.fleetTrucks.buttons.addTruck),
        addTruckNumberField: () => cy.dataTestId(testIds.pages.fleetTrucks.fields.truckNumber),
        truckVINNumberField: () => cy.dataTestId(testIds.pages.fleetTrucks.fields.truckVINNumber),
        cancelAddingTruckBtn: () =>
            cy.dataTestId(testIds.pages.fleetTrucks.buttons.cancelAddingTruck),
        confirmAddingTruckBtn: () =>
            cy.dataTestId(testIds.pages.fleetTrucks.buttons.confirmAddingTruck),
        truckNumberEdit: () => cy.dataTestId(testIds.pages.editTruck.fields.truckNumber),
        statusField: () => cy.dataTestId(testIds.pages.editTruck.fields.status),
        VINField: () => cy.dataTestId(testIds.pages.editTruck.fields.VIN),
        yearField: () => cy.dataTestId(testIds.pages.editTruck.fields.year),
        makeField: () => cy.dataTestId(testIds.pages.editTruck.fields.make),
        modelField: () => cy.dataTestId(testIds.pages.editTruck.fields.model),
        plateCompanyField: () => cy.dataTestId(testIds.pages.editTruck.fields.plateCompany),
        typeField: () => cy.dataTestId(testIds.pages.editTruck.fields.type),
        tollTransponderNumberField: () =>
            cy.dataTestId(testIds.pages.editTruck.fields.tollTransponder),
        tagsField: () => cy.dataTestId(testIds.pages.editTruck.fields.tags),
        colorField: () => cy.dataTestId(testIds.pages.editTruck.fields.color),
        vendorField: () => cy.dataTestId(testIds.pages.editTruck.fields.vendor),
        fuelDiscountsCheckBox: () => cy.dataTestId(testIds.pages.editTruck.fields.fuelDiscounts),
        insuranceEndorsedCheckBox: () =>
            cy.dataTestId(testIds.pages.editTruck.fields.insuranceEndorsed),
        messageField: () => cy.dataTestId(testIds.pages.editTruck.fields.message),
        sendMessageBtn: () => cy.dataTestId(testIds.pages.editTruck.buttons.sendMessage),
        saveTruckEditingBtn: () => cy.dataTestId(testIds.pages.editTruck.buttons.saveTruckEditing),
        addDocumentBtn: () => cy.dataTestId(testIds.pages.editTruck.buttons.addDocument),
        dropDocumentField: () => cy.dataTestId(testIds.pages.editTruck.fields.dropDocument),
        deleteTruckBtn: () => cy.dataTestId(testIds.pages.editTruck.buttons.deleteTruck),
        trucksResultTable: () => cy.dataTestId(testIds.components.coreTable),
        closeTruckSettingsBtn: () => cy.dataTestId(testIds.pages.editTruck.buttons.close)
    };

    private static readonly characters = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';

    private static generateRandomCharacter(): string {
        const randomIndex = Math.floor(Math.random() * this.characters.length);
        return this.characters[randomIndex];
    }

    static generateVin(): string {
        const countryOfOrigin = '2';
        const manufacturer = 'G';
        const vehicleType = 'C';
        const vehicleAttributes = 'EK';
        const modelYear = '1';
        const assemblyPlant = 'T';

        let vin =
            countryOfOrigin +
            manufacturer +
            vehicleType +
            vehicleAttributes +
            modelYear +
            assemblyPlant;

        // Generate random serial number for the last 10 characters
        for (let i = 0; i < 10; i++) {
            vin += this.generateRandomCharacter();
        }

        return vin;
    }

    verifySearchField(): void {
        this.elements.fleetTrucksSearchField().type('Owned');
        cy.wait(2000);
        this.elements.trucksResultTable().should('contain.text', 'Owned');
    }

    dragAndDropFileToContainer() {
        this.elements.dropDocumentField().selectFile('Settlement_3049_DeShawn_Graham.pdf', {
            action: 'drag-drop'
        });
        cy.wait(5000);
    }

    verifyAddingNewTruck(): void {
        this.elements.addTruckBtn().click();
        this.elements.cancelAddingTruckBtn().click();
        this.elements.addTruckBtn().click();
        this.elements.addTruckNumberField().type('181920');
        this.elements.truckVINNumberField().type(generatedVin);
        cy.wait(2000);
        this.elements.confirmAddingTruckBtn().click();
        cy.wait(3000);
        this.elements.truckNumberEdit().should('have.value', '181920');
        this.elements.statusField().click();
        const statusSelector = cy.get('[data-testid=status-select-option-]').siblings();
        statusSelector.first().click();
        this.elements.VINField().should('have.value', generatedVin);
        this.elements.yearField().clear().type('2021');
        this.elements.yearField().should('have.value', '2021');
        this.elements.makeField().clear().type('Volvo');
        this.elements.makeField().should('have.value', 'Volvo');
        this.elements.modelField().clear().type('VNL 760');
        this.elements.modelField().should('have.value', 'VNL 760');
        this.elements.plateCompanyField().click();
        const companySelector = cy.get('[data-testid=plate-company-select-option-]').siblings();
        companySelector.first().click();
        this.elements.tollTransponderNumberField().clear().type('1234567');
        this.elements.tollTransponderNumberField().should('have.value', '1234567');
        // this.elements.tagsField().click();
        // const tagsSelector = cy.get('[data-testid=tags-select-option-]').siblings();
        // tagsSelector.first().click();
        this.elements.colorField().click();
        const colorSelector = cy.get('[data-testid=colors-select-option-]').siblings();
        colorSelector.first().click();
        this.elements.vendorField().click();
        const vendorSelector = cy.get('[data-testid=vendor-select-option-]').siblings();
        vendorSelector.first().click();
        this.elements.fuelDiscountsCheckBox().click();
        cy.wait(2000);
        this.elements.insuranceEndorsedCheckBox().click();
        cy.wait(2000);
        this.elements.saveTruckEditingBtn().click();
        cy.wait(3000);
        this.elements.messageField().type('Test message');
        this.elements.sendMessageBtn().click();
        // this.elements.deleteTruckBtn().click();
        cy.wait(3000);
    }
}

const generatedVin = FleetTrucksPage.generateVin().toString();
export default new FleetTrucksPage();
