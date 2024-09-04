// import LoginPage from '../pageObjects/LoginPage';
// import SettingsTeamPage from '../pageObjects/SettingsTeamPage';
// import SettingsRolesPage from '../pageObjects/SettingsRolesPage';
// import SettingsCompanyPage from '../pageObjects/SettingsCompanyPage';
// import SettingsSecurityPage from '../pageObjects/SettingsSecurityPage';
// import HomePage from '../pageObjects/HomePage';

// describe('Organization Tests', () => {
//     beforeEach(() => {
//         cy.clearLocalStorage();
//         cy.visit('/login');
//         LoginPage.login();
//         HomePage.gotToSettingsPage();
//     });

//     it('should verify functionality on a members page', () => {
//         HomePage.goToSettingsTeamPage();
//         SettingsTeamPage.verifySearchField();
//         SettingsTeamPage.inviteUser();
//         SettingsTeamPage.addUser();
//     });

//     it('should verify functionality on a roles page', () => {
//         HomePage.goToSettingsRolesPage();
//         SettingsRolesPage.addRole();
//     });

//     it('should verify functionality on a company page', () => {
//         HomePage.goToSettingsCompanyPage();
//         SettingsCompanyPage.editCompanyDetails();
//         SettingsCompanyPage.editLoadPrefs();
//     });

//     it('should verify functionality on a security page', () => {
//         HomePage.goToSettingsSecurityPage();
//         SettingsSecurityPage.editSecuritySettings();
//     });
// });
