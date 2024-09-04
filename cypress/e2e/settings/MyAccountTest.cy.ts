import LoginPage from '../pageObjects/LoginPage';
import SettingsProfilePage from '../pageObjects/SettingsProfilePage';
import SettingsPasswordPage from '../pageObjects/SettingsPasswordPage';
import HomePage from '../pageObjects/HomePage';

describe('My Account Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/login');
        LoginPage.login();
        HomePage.gotToSettingsPage();
    });

    it('should verify functionality on a users profile page', () => {
        SettingsProfilePage.updateProfile();
    });

    it('should change users password', () => {
        HomePage.goToSettingsPasswordPage();
        SettingsPasswordPage.changePassword();
    });
});
