import testIds from '../../configs/locators';
import 'cypress-xpath';
import Helpers from '../utils/Helpers';
class FleetPlatesPage {
    elements = {
        fleetPlatesSearchField: () => cy.dataTestId(testIds.pages.fleetPlates.fields.search),
        addPlateBtn: () => cy.dataTestId(testIds.pages.fleetPlates.buttons.addPlate),
        platesResultTable: () => cy.dataTestId(testIds.components.coreTable),
        companyNameField: () => cy.dataTestId(testIds.pages.fleetPlates.fields.company),
        companyOption: () => cy.dataTestId(testIds.components.select.plateCompany.optionPrefix),
        ownerNameField: () => cy.dataTestId(testIds.pages.fleetPlates.fields.ownerName),
        stateField: () => cy.dataTestId(testIds.pages.fleetPlates.fields.state),
        californiaState: () => cy.dataTestId(testIds.components.select.state.optionPrefix),
        plateNumberField: () => cy.dataTestId(testIds.pages.fleetPlates.fields.plateNumber),
        annualCostField: () => cy.dataTestId(testIds.pages.fleetPlates.fields.annualCost),
        ownerCheckbox: () => cy.dataTestId(testIds.pages.fleetPlates.fields.ownerCheckbox),
        cancelAddingPlateBtn: () =>
            cy.dataTestId(testIds.pages.fleetPlates.buttons.cancelAddingPlate),
        confirmAddingPlateBtn: () =>
            cy.dataTestId(testIds.pages.fleetPlates.buttons.confirmAddingPlate),
        addPlateModalWindow: () => cy.dataTestId(testIds.pages.fleetPlates.areas.addPlateModal),
        nextPageBtn: () => cy.dataTestId(testIds.components.pagination.nextPage),
        previousPageBtn: () => cy.dataTestId(testIds.components.pagination.previousPage)
    };

    verifySearchField(): void {
        cy.wait(3000);
        this.elements.fleetPlatesSearchField().type('PWU5180');
        this.elements.platesResultTable().should('contain.text', 'PWU5180');
    }

    addPlate(): void {
        this.elements.addPlateBtn().click();
        this.elements.companyNameField().click();
        const companySelectors = cy.get('[data-testid=plate-company-select-option-]').siblings();
        companySelectors.first().click();
        this.elements.ownerNameField().type('Jackson Wild');
        this.elements.stateField().click();
        const stateSelectors = cy.get('[data-testid=state-select-option-]').siblings();
        stateSelectors.first().click();
        this.elements.plateNumberField().type(randomPlateNumber);
        this.elements.annualCostField().type('8000');
        this.elements.ownerCheckbox().click();
        this.elements.confirmAddingPlateBtn().click();
    }

    cancelAddingPlate(): void {
        this.elements.addPlateBtn().click();
        this.elements.cancelAddingPlateBtn().click();
        this.elements.addPlateModalWindow().should('not.exist');
    }

    moveToNextPage(): void {
        this.elements.nextPageBtn().click();
    }

    moveToPreviousPage(): void {
        this.elements.previousPageBtn().click();
    }
}

const randomPlateNumber = Helpers.randomize(5);

export default new FleetPlatesPage();
