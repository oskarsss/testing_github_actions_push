import HomePage from '../pageObjects/HomePage';
import LoginPage from '../pageObjects/LoginPage';
import FleetPlatesPage from '../pageObjects/FleetPlatesPage';

describe('Fleet Plates Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/login');
        LoginPage.login();
        HomePage.goToFleetPlatesPage();
    });

    it('should verify functionality on a fleet plates page', () => {
        FleetPlatesPage.verifySearchField();
        FleetPlatesPage.cancelAddingPlate();
        FleetPlatesPage.addPlate();
    });

    it('should verify moving via table pages', () => {
        FleetPlatesPage.moveToNextPage();
        FleetPlatesPage.moveToPreviousPage();
    });
});
