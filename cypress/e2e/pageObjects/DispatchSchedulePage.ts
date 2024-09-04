import { getLoadDraftsPage } from '../utils/Interceptor';
import Helpers from '../utils/Helpers';
import 'cypress-xpath';

class DispatchSchedulePage {
    elements = {
        scheduleSearchField: () => cy.xpath(`[//input[@placeholder='Search']`),
        capListBtn: () => cy.xpath(`//button[contains(text(), 'CAP LIST')]`),
        addTimeOffBtn: () => cy.xpath(`//button[contains(text(), 'Add Time Off')]`),
        loadDraftsBtn: () => cy.xpath(`//button[contains(text(), 'load drafts')]`),
        newLoadBtn: () => cy.xpath(`//button[contains(text(), 'New Load')]`),
        addNewDraftBtn: () => cy.xpath(`//button[@aria-label='add new draft']`),
        deleteDraftSvgBtn: () => cy.xpath(`//span[@aria-label='Delete draft']`),
        clearAllDraftsBtn: () => cy.xpath(`//button[contains(text(), 'Clear All Drafts')]`),
        closeDraftsPageBtn: () => cy.xpath(`//button[contains(text(), 'Close')]`),
        deleteDraftBtn: () => cy.xpath(`//button[contains(text(), 'Delete draft')]`),
        submitLoadBtn: () => cy.xpath(`//button[contains(text(), 'Submit load')]`),
        rateConfirmationDropZoneField: () => cy.xpath(`//div[@class='css-v0fxst']`),
        brokerField: () =>
            cy.xpath(`//label[contains(text(), 'Broker')]//parent::div//child::input`),
        loadRefField: () =>
            cy.xpath(`//label[contains(text(), 'Load Ref')]//parent::div//child::input`),
        clientRepField: () =>
            cy.xpath(`//label[contains(text(), 'Client Rep')]//parent::div//child::input`),
        bookingDispatchField: () =>
            cy.xpath(`//label[contains(text(), 'Booking Dispatch')]//parent::div`),
        equipmentTypeField: () =>
            cy.xpath(`//label[contains(text(), 'Equipment type')]//parent::div`),
        loadTypeField: () => cy.xpath(`//label[contains(text(), 'Load Type')]//parent::div`),
        weightField: () =>
            cy.xpath(`//label[contains(text(), 'Weight')]//parent::div//child::input`),
        commodityField: () =>
            cy.xpath(`//label[contains(text(), 'Commodity')]//parent::div//child::input`),
        loadDetailsNoteField: () => cy.xpath(`//textarea[@placeholder='Note']`),
        stopsField: () => cy.xpath(`//label[contains(text(), 'Stops')]//parent::div//child::input`),
        milesField: () => cy.xpath(`//label[contains(text(), 'Miles')]//parent::div//child::input`),
        emptyMilesField: () =>
            cy.xpath(`//label[contains(text(), 'Empty miles')]//parent::div//child::input`),
        loadedMilesField: () =>
            cy.xpath(`//label[contains(text(), 'Loaded miles')]//parent::div//child::input`),
        timeField: () => cy.xpath(`//label[contains(text(), 'Time')]//parent::div//child::input`),
        pickUpReferenceIDField: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-stops.0.reference_id']`),
        pickUpLocationAddressField: () =>
            cy.xpath(
                `//div[contains(text(), 'Drop Off')]//preceding::input[@placeholder='Enter Address']`
            ),
        pickUpStartAppointmentField: () =>
            cy.xpath(
                `//div[contains(text(), 'Drop Off')]//preceding::label[contains(text(), 'Start Appointment')]//parent::div//child::input`
            ),
        pickUpEndAppointmentField: () =>
            cy.xpath(
                `//div[contains(text(), 'Drop Off')]//preceding::label[contains(text(), 'End Appointment')]//parent::div//child::input`
            ),
        pickUpNotesField: () =>
            cy.xpath(
                `//div[contains(text(), 'Drop Off')]//preceding::textarea[@placeholder='Notes']`
            ),
        dropOffReferenceIDField: () =>
            cy.xpath(`//div[@aria-describedby='stepper-linear-stops.1.reference_id']`),
        dropOffLocationAddressField: () =>
            cy.xpath(
                `//div[contains(text(), 'Drop Off')]//following::input[@placeholder='Enter Address']`
            ),
        dropOffStartAppointmentField: () =>
            cy.xpath(
                `//div[contains(text(), 'Drop Off')]//following::label[contains(text(), 'Start Appointment')]//parent::div//child::input`
            ),
        dropOffEndAppointmentField: () =>
            cy.xpath(
                `//div[contains(text(), 'Drop Off')]//following::label[contains(text(), 'End Appointment')]//parent::div//child::input`
            ),
        dropOffNotesField: () =>
            cy.xpath(
                `//div[contains(text(), 'Drop Off')]//following::textarea[@placeholder='Notes']`
            ),
        invoicingUnitsField: () =>
            cy.xpath(`//tbody[@class='MuiTableBody-root css-1xna0ck']//td[2]//input`),
        invoicingRateField: () =>
            cy.xpath(`//tbody[@class='MuiTableBody-root css-1xna0ck']//td[3]//input`),
        totalSumInvoicingField: () =>
            cy.xpath(`//tbody[@class='MuiTableBody-root css-1xna0ck']//td[4]`),
        deleteInvoicingBtn: () =>
            cy.xpath(`//tbody[@class='MuiTableBody-root css-1xna0ck']//td[5]//button`),
        mainInvoicingTotalField: () =>
            cy.xpath(`//tfoot[@class='MuiTableFooter-root css-uab50h']//td[2]`),
        loadsResultPage: () => cy.xpath(`//div[@class='scrollbar-container ps']`)
    };

    dragAndDropFileToContainer() {
        this.elements.rateConfirmationDropZoneField().selectFile('jbhunt_rate_con.pdf', {
            action: 'drag-drop'
        });
        cy.wait(10000);
    }

    addNewLoad() {
        this.elements.newLoadBtn().click();
        getLoadDraftsPage.wait();
        cy.wait(5000);
        this.dragAndDropFileToContainer();
        cy.reload();
        cy.wait(5000);
        this.elements.loadDraftsBtn().click();
        getLoadDraftsPage.wait();
        this.elements.brokerField().should('have.value', 'J B HUNT TRANSPORT INC');
        this.elements.loadRefField().clear().type(this.generatedID);
        this.elements.clientRepField().should('be.visible');
        this.elements.bookingDispatchField().should('contain.text', 'N/A');
        this.elements.equipmentTypeField().should('contain.text', 'V - Van');
        this.elements.loadTypeField().should('contain.text', 'Full Truck Load');
        this.elements.weightField().should('have.value', '2,500');
        this.elements.commodityField().should('have.value', 'FOAM');
        this.elements.loadDetailsNoteField().should('be.empty');
        this.elements.stopsField().should('have.value', 2);
        this.elements.milesField().should('have.value', 370);
        this.elements.emptyMilesField().should('have.value', 0);
        this.elements.loadedMilesField().should('have.value', 370);
        this.elements.timeField().should('have.value', '16 hours');
        this.elements
            .pickUpLocationAddressField()
            .should('contain.value', '122 Parker St, Newburyport, Massachusetts 01950');
        this.elements.pickUpStartAppointmentField().should('have.value', '2022-06-08T16:00');
        this.elements.pickUpEndAppointmentField().should('have.value', '2022-06-08T16:00');
        this.elements.pickUpNotesField().should('be.empty');
        this.elements
            .dropOffLocationAddressField()
            .should('contain.value', '1025 Epler Way, Reading, Pennsylvania 19605');
        this.elements.dropOffStartAppointmentField().should('have.value', '2022-06-09T08:00');
        this.elements.dropOffEndAppointmentField().should('have.value', '2022-06-09T08:00');
        this.elements.dropOffNotesField().should('be.empty');
        this.elements.invoicingUnitsField().should('have.value', 1);
        this.elements.invoicingRateField().should('have.value', '$903');
        this.elements.totalSumInvoicingField().should('contain.text', '$903.00');
        this.elements.mainInvoicingTotalField().should('contain.text', '$903.00');
        this.elements.mainInvoicingTotalField().should('not.be.visible');
        this.elements.submitLoadBtn().click();
        cy.wait(3000);
        this.elements.loadsResultPage().should('contain.text', this.generatedID);
    }

    generatedID = Helpers.randomize(7).toString();
}
export default new DispatchSchedulePage();
