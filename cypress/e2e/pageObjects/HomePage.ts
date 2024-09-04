import { getSchedulePage } from '../utils/Interceptor';
import 'cypress-xpath';
import testIds from '../../configs/locators';
class HomePage {
    elements = {
        dispatchMenuBtn: () => cy.dataTestId(testIds.pages.navigation.buttons.dispatchMenu),
        dispatchScheduleBtn: () => cy.dataTestId(testIds.pages.navigation.links.dispatchSchedule),
        fleetMenuBtn: () => cy.dataTestId(testIds.pages.navigation.buttons.fleetMenu),
        fleetPlatesPageBtn: () => cy.dataTestId(testIds.pages.navigation.links.fleetPlates),
        fleetTrailersPageBtn: () => cy.dataTestId(testIds.pages.navigation.links.fleetTrailers),
        fleetVendorsPageBtn: () => cy.dataTestId(testIds.pages.navigation.links.fleetVendors),
        fleetDriversPageBtn: () => cy.dataTestId(testIds.pages.navigation.links.fleetDrivers),
        fleetTrucksPageBtn: () => cy.dataTestId(testIds.pages.navigation.links.fleetTrucks),
        settingsMenuBtn: () => cy.dataTestId(testIds.pages.navigation.links.settings),
        settingsPasswordPageBtn: () => cy.xpath(`//a[@href='/settings/password/']`),
        settinsTeamPageBtn: () => cy.xpath(`//a[@href='/settings/team/']`),
        settingsRolesPageBtn: () => cy.xpath(`//a[@href='/settings/roles/']`),
        settingsCompanyPageBtn: () => cy.xpath(`//a[@href='/settings/company/']`),
        settingsSecurityPageBtn: () => cy.xpath(`//a[@href='/settings/security/']`),
        settingsFactoringCompaniesPageBtn: () =>
            cy.xpath(`//a[@href='/settings/invoicing/factoring-companies/']`)
    };

    goToDispatchSchedulePage(): void {
        this.elements.dispatchMenuBtn().click();
        this.elements.dispatchScheduleBtn().click();
        getSchedulePage.wait();
    }
    goToFleetPlatesPage(): void {
        this.elements.fleetMenuBtn().click();
        this.elements.fleetPlatesPageBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/plates').wait(5000);
    }
    goToFleetTrailersPage(): void {
        this.elements.fleetMenuBtn().click();
        this.elements.fleetTrailersPageBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/trailers').wait(5000);
    }
    goToFleetVendorsPage(): void {
        this.elements.fleetMenuBtn().click();
        this.elements.fleetVendorsPageBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/vendors').wait(5000);
    }
    goToFleetDriversPage(): void {
        this.elements.fleetMenuBtn().click();
        this.elements.fleetDriversPageBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/drivers').wait(5000);
    }
    goToFleetTrucksPage(): void {
        this.elements.fleetMenuBtn().click();
        this.elements.fleetTrucksPageBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/trucks').wait(5000);
    }
    gotToSettingsPage(): void {
        this.elements.settingsMenuBtn().click();
        cy.location('pathname', { timeout: 60000 }).should('include', '/settings').wait(5000);
    }

    goToSettingsPasswordPage(): void {
        this.elements.settingsPasswordPageBtn().click();
        cy.location('pathname', { timeout: 60000 })
            .should('include', '/settings/password')
            .wait(5000);
    }

    goToSettingsTeamPage(): void {
        this.elements.settinsTeamPageBtn().click();
    }

    goToSettingsRolesPage(): void {
        this.elements.settingsRolesPageBtn().click();
    }

    goToSettingsCompanyPage(): void {
        this.elements.settingsCompanyPageBtn().click();
    }

    goToSettingsSecurityPage(): void {
        this.elements.settingsSecurityPageBtn().click();
    }

    goToSettingsFactoringCompaniesPage(): void {
        this.elements.settingsFactoringCompaniesPageBtn().click();
    }
}

export default new HomePage();
