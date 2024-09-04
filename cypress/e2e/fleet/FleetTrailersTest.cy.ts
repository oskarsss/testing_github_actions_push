import HomePage from '../pageObjects/HomePage';
import LoginPage from '../pageObjects/LoginPage';
import FleetTrailersPage from '../pageObjects/FleetTrailersPage';

describe('Fleet Trailers Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/login');
        LoginPage.login();
    });

    it('should verify search field on a fleet trailers page', () => {
        HomePage.goToFleetTrailersPage();
        FleetTrailersPage.verifySearchField();
    });

    it('should verify search field on a fleet trailers (companies) page', () => {
        HomePage.goToFleetTrailersPage();
        FleetTrailersPage.goToCompaniesPage();
        FleetTrailersPage.verifyCompaniesSearchField();
    });

    it('should verify adding a new company on a fleet trailers (companies) page', () => {
        HomePage.goToFleetTrailersPage();
        FleetTrailersPage.goToCompaniesPage();
        FleetTrailersPage.addCompany();
    });

    it('should verify editing a trailer on a fleet trailers page', () => {
        HomePage.goToFleetTrailersPage();
        FleetTrailersPage.addTrailer();
    });
});
