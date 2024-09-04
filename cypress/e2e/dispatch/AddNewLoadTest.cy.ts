// import HomePage from '../pageObjects/HomePage';
// import LoginPage from '../pageObjects/LoginPage';
// import DispatchSchedulePage from '../pageObjects/DispatchSchedulePage';
// import { getLoadDraftsPage, getLoadsPage, getSchedulePage } from '../utils/Interceptor';

// describe('Dispatch Tests', () => {
//     beforeEach(() => {
//         getSchedulePage.intercept();
//         getLoadsPage.intercept();
//         getLoadDraftsPage.intercept();
//         cy.clearLocalStorage();
//         cy.visit('/login');
//         LoginPage.login();
//         cy.wait(4000);
//     });

//     it('should add a new load', () => {
//         HomePage.goToDispatchSchedulePage();
//         DispatchSchedulePage.addNewLoad();
//     });
// });
