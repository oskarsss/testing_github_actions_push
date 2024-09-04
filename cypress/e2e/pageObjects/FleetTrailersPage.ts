import 'cypress-xpath';
import testIds from '../../configs/locators';
class FleetTrailersPage {
    elements = {
        fleetTrailersSearchField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.search),
        companiesBtn: () => cy.dataTestId(testIds.pages.fleetTrailers.buttons.companies),
        addTrailerBtn: () => cy.dataTestId(testIds.pages.fleetTrailers.buttons.addTrailer),
        companyField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.company),
        ownershipField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.ownership),
        plateCompanyField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.plateCompany),
        typeField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.type),
        trailerNumberField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.number),
        VINNumberField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.VIN),
        rentMonthlyField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.rentMonthly),
        depositField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.deposit),
        driverRentField: () => cy.dataTestId(testIds.pages.fleetTrailers.fields.driverRent),
        cancelAddingTrailerBtn: () =>
            cy.dataTestId(testIds.pages.fleetTrailers.buttons.cancelAddingTrailer),
        confirmAddingTrailerBtn: () =>
            cy.dataTestId(testIds.pages.fleetTrailers.buttons.confirmAddingTrailer),
        editNumberField: () => cy.dataTestId(testIds.pages.editTrailer.fields.number),
        statusField: () => cy.dataTestId(testIds.pages.editTrailer.fields.status),
        editVINField: () => cy.dataTestId(testIds.pages.editTrailer.fields.VIN),
        yearField: () => cy.dataTestId(testIds.pages.editTrailer.fields.year),
        makeField: () => cy.dataTestId(testIds.pages.editTrailer.fields.make),
        modelField: () => cy.dataTestId(testIds.pages.editTrailer.fields.model),
        plateCompanyEditField: () => cy.dataTestId(testIds.pages.editTrailer.fields.plateCompany),
        companyEditField: () => cy.dataTestId(testIds.pages.editTrailer.fields.company),
        ownershipEditField: () => cy.dataTestId(testIds.pages.editTrailer.fields.ownership),
        typeEditField: () => cy.dataTestId(testIds.pages.editTrailer.fields.type),
        rentAmountField: () => cy.dataTestId(testIds.pages.editTrailer.fields.rentMonthly),
        depositAmountField: () => cy.dataTestId(testIds.pages.editTrailer.fields.deposit),
        driverRentEditField: () => cy.dataTestId(testIds.pages.editTrailer.fields.driverRent),
        saveEditTrailerBtn: () =>
            cy.dataTestId(testIds.pages.editTrailer.buttons.saveTrailerEditing),
        messageField: () => cy.dataTestId(testIds.pages.editTrailer.fields.message),
        sendMessageBtn: () => cy.dataTestId(testIds.pages.editTrailer.buttons.sendMessage),
        messageContainer: () => cy.dataTestId(testIds.pages.editTrailer.areas.messageBox),
        importBtn: () => cy.dataTestId(testIds.pages.fleetTrailers.buttons.import),
        resultTable: () => cy.dataTestId(testIds.components.coreTable),
        companiesSearchField: () => cy.dataTestId(testIds.pages.trailersCompanies.fields.search),
        addCompanyBtn: () => cy.dataTestId(testIds.pages.trailersCompanies.buttons.addCompany),
        companyNameField: () => cy.dataTestId(testIds.pages.trailersCompanies.fields.companyName),
        companyPhoneField: () => cy.dataTestId(testIds.pages.trailersCompanies.fields.companyPhone),
        companyEmailField: () => cy.dataTestId(testIds.pages.trailersCompanies.fields.companyEmail),
        cancelAddingCompanyBtn: () =>
            cy.dataTestId(testIds.pages.trailersCompanies.buttons.cancelCompany),
        saveAddingCompanyBtn: () =>
            cy.dataTestId(testIds.pages.trailersCompanies.buttons.saveCompany),
        deleteTrailerBtn: () => cy.dataTestId(testIds.pages.editTrailer.buttons.deleteTrailer),
        confirmDeleteTrailerBtn: () =>
            cy.dataTestId(testIds.pages.editTrailer.buttons.confirmDeleteTrailer)
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
        this.elements.fleetTrailersSearchField().type('Owned');
        cy.wait(2000);
        cy.reload();
    }
    addTrailer(): void {
        this.elements.addTrailerBtn().click();
        this.elements.cancelAddingTrailerBtn().click();
        this.elements.addTrailerBtn().click();
        this.elements.companyField().click();
        const companySelector = cy.get('[data-testid=trailer-company-select-option-]').siblings();
        companySelector.first().click();
        this.elements.ownershipField().click();
        const ownershipSelector = cy
            .get('[data-testid=trailer-ownership-select-option-]')
            .siblings();
        ownershipSelector.first().click();
        this.elements.plateCompanyField().click();
        const plateCompanySelector = cy
            .get('[data-testid=plate-company-select-option-]')
            .siblings();
        plateCompanySelector.first().click();
        this.elements.typeField().click();
        const typeSelector = cy.get('[data-testid=trailer-type-select-option-]').siblings();
        typeSelector.first().click();
        this.elements.trailerNumberField().type('112233');
        this.elements.trailerNumberField().should('have.value', '112233');
        this.elements.VINNumberField().type(generatedVin);
        this.elements.VINNumberField().should('have.value', generatedVin);
        this.elements.rentMonthlyField().type('1000');
        this.elements.rentMonthlyField().should('have.value', '1000');
        this.elements.depositField().type('100');
        this.elements.depositField().should('have.value', '100');
        this.elements.driverRentField().type('100');
        this.elements.driverRentField().should('have.value', '100');
        this.elements.confirmAddingTrailerBtn().click();
        cy.wait(4000);
        this.elements.editNumberField().should('have.value', '112233');
        this.elements.statusField().click();
        const statusSelector = cy.get('[data-testid=status-select-option-]').siblings();
        statusSelector.first().click();
        this.elements.editVINField().should('have.value', generatedVin);
        this.elements.yearField().clear().type('2021');
        this.elements.yearField().should('have.value', '2021');
        this.elements.makeField().clear().type('Volvo');
        this.elements.makeField().should('have.value', 'Volvo');
        this.elements.modelField().clear().type('VNL 860');
        this.elements.modelField().should('have.value', 'VNL 860');
        this.elements.plateCompanyEditField().click();
        const plateCompanyEditSelector = cy
            .get('[data-testid=plate-company-select-option-]')
            .siblings();
        plateCompanyEditSelector.first().click();
        this.elements.companyEditField().click();
        const companyEditSelector = cy
            .get('[data-testid=trailer-company-select-option-]')
            .siblings();
        companyEditSelector.first().click();
        this.elements.ownershipEditField().click();
        const ownershipEditSelector = cy
            .get('[data-testid=trailer-ownership-select-option-]')
            .siblings();
        ownershipEditSelector.first().click();
        this.elements.typeEditField().click();
        const typeEditSelector = cy.get('[data-testid=trailer-type-select-option-]').siblings();
        typeEditSelector.first().click();
        this.elements.rentAmountField().clear().type('2000');
        this.elements.rentAmountField().should('have.value', '2000');
        this.elements.depositAmountField().clear().type('200');
        this.elements.depositAmountField().should('have.value', '200');
        this.elements.driverRentEditField().clear().type('200');
        this.elements.driverRentEditField().should('have.value', '200');
        this.elements.saveEditTrailerBtn().click();
        this.elements.messageField().type('Test Message');
        this.elements.sendMessageBtn().click();
        cy.wait(3000);
        this.elements.messageContainer().should('contain.text', 'Test Message');
        this.elements.deleteTrailerBtn().click();
        this.elements.confirmDeleteTrailerBtn().click();
    }
    goToCompaniesPage(): void {
        this.elements.companiesBtn().click();
        cy.location('pathname', { timeout: 60000 })
            .should('include', '/trailers/companies')
            .wait(5000);
    }
    verifyCompaniesSearchField(): void {
        this.elements.companiesSearchField().type('demo@veido.com');
        cy.wait(2000);
        this.elements.resultTable().should('contain.text', 'demo@veido.com');
    }
    addCompany(): void {
        this.elements.addCompanyBtn().click();
        this.elements.cancelAddingCompanyBtn().click();
        this.elements.addCompanyBtn().click();
        this.elements.companyNameField().type('New Test Company');
        this.elements.companyNameField().should('have.value', 'New Test Company');
        this.elements.companyPhoneField().type('5136667778');
        this.elements.companyEmailField().type('company@test.vektor.app');
        this.elements.companyEmailField().should('have.value', 'company@test.vektor.app');
        this.elements.saveAddingCompanyBtn().click();
        this.elements.resultTable().should('contain.text', 'company@test.vektor.app');
    }
}
const generatedVin = FleetTrailersPage.generateVin().toString();
export default new FleetTrailersPage();
