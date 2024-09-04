import 'cypress-xpath';
class DashboardPage {
    elements = {
        firstPageBtn: () => cy.get('[aria-label="first page"]'),
        nextPageBtn: () => cy.get('[aria-label="next page"]'),
        previousPageBtn: () => cy.get('[aria-label="previous page"]'),
        lastPageBtn: () => cy.get('[aria-label="last page"]'),
        dashboardFinancialBtn: () => cy.xpath(`//button[@id='10']`),
        dashboardFinancialPage: () => cy.xpath(`//div[@class='css-1t4gmdi']`),
        dashboardLoadsBtn: () => cy.xpath(`//button[@id='11']`),
        dashboardLoadsPage: () => cy.xpath(`//div[@class='css-1t4gmdi']`)
    };

    moveToNextPage(): void {
        cy.wait(3000);
        this.elements.nextPageBtn().click();
    }

    moveToPreviousPage(): void {
        this.elements.previousPageBtn().click();
    }

    moveToLastPage(): void {
        this.elements.lastPageBtn().click();
    }

    moveToFirstPage(): void {
        this.elements.firstPageBtn().click();
    }

    goToLoadsDashboardPage(): void {
        this.elements.dashboardLoadsBtn().click();
        this.elements.dashboardLoadsPage().should('contain.text', 'Active Loads');
    }

    goToFinancialDashboardPage(): void {
        this.elements.dashboardFinancialBtn().click();
        this.elements.dashboardFinancialPage().should('contain.text', 'Total Unpaid');
    }
}

export default new DashboardPage();
