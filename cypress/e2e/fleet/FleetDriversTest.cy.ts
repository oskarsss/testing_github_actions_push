import HomePage from '../pageObjects/HomePage';
import LoginPage from '../pageObjects/LoginPage';
import FleetDriversPage from '../pageObjects/FleetDriversPage';

describe('Fleet Drivers Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/login');
        LoginPage.login();
        cy.wait(4000);
    });

    it('should verify search field on a fleet drivers page', () => {
        HomePage.goToFleetDriversPage();
        FleetDriversPage.verifySearchField();
    });

    it('should verify adding new driver', () => {
        HomePage.goToFleetDriversPage();
        FleetDriversPage.verifyAddingNewDriver();
    });
});
