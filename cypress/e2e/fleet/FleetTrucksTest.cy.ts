import HomePage from '../pageObjects/HomePage';
import LoginPage from '../pageObjects/LoginPage';
import FleetTrucksPage from '../pageObjects/FleetTrucksPage';

describe('Fleet Trucks Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/login');
        LoginPage.login();
        cy.wait(2000);
    });

    it('should verify search field on a fleet trucks page', () => {
        HomePage.goToFleetTrucksPage();
        FleetTrucksPage.verifySearchField();
    });

    it('should verify adding new truck', () => {
        HomePage.goToFleetTrucksPage();
        FleetTrucksPage.verifyAddingNewTruck();
    });
});
