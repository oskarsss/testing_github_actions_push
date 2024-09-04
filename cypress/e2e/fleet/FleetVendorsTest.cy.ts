import HomePage from '../pageObjects/HomePage';
import LoginPage from '../pageObjects/LoginPage';
import FleetVendorsPage from '../pageObjects/FleetVendorsPage';

describe('Fleet Vendors Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/login');
        LoginPage.login();
    });

    it('should verify search field on a fleet vendors page', () => {
        HomePage.goToFleetVendorsPage();
        FleetVendorsPage.fleetVendorsSearchField();
    });

    it('should verify adding a vendor on a fleet vendors page', () => {
        HomePage.goToFleetVendorsPage();
        FleetVendorsPage.addVendor();
        FleetVendorsPage.verifyAddingNewVendor();
    });
});
