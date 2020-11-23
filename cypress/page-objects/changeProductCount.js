import SearchResultsPage from "./searchResultsPage";

class ChangeProductCount{
    changeProductsCount(productsToSearch) {
        this.changeCount(0);
        this.changeCount(1);
    }

    changeCount(index) {
        cy.get('select').each(($item, $el) => {
            if ($el === index) {
                cy.wrap($item).select("5").then(() => {
                    cy.wait(3000)
                    SearchResultsPage.getProductAmount().as('resultSumName')
                    cy.get('@resultSumName').should('exist')
                    cy.wait(3000)
                })
            }
        })
    }
}

export default new ChangeProductCount()