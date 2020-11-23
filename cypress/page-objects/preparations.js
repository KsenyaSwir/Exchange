import MainPage from "./mainPage";
import SearchElements from "./searchElements";
import SearchResultsPage from "./searchResultsPage";

class Preparations {
    addToBacket(productToSearch) {
        cy.fixture('productsInBasket').then(product => {
            MainPage.open()
            cy.log('WHEN User performs search')
            MainPage.performSearch(productToSearch.name)
            cy.log('THEN search is done')
            SearchElements.getProductByDocId(productToSearch.url).should('exist')
            this.add(productToSearch)
        })
    }

    add(productToSearch) {
        cy.log('WHEN User adds product to card')
        SearchElements.addProductToCard(productToSearch)
        cy.log('THEN User check products data')
        cy.wait(1000)
        SearchResultsPage.isProductPresentedInStorage(productToSearch)
    }
}

export default new Preparations()