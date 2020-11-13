import  SearchResultsPage from './searchResultsPage'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.on('fail', (error, runnable) => {

    throw error // throw error to have test still fail
})

class MainPage{
    open(){
        cy.visit('https://store.google.com/us/collection/accessories');
    }
    get searchIcon(){
        return cy.get('.header-search-icon');
    }
    get searchInput(){
        return cy.get('input[aria-label = "Search Google Store"]');
    }
    performSearch(productToSearch){
        this.searchIcon.click();
        this.searchInput.type(`${productToSearch}{enter}`);
    }
}

export default new MainPage();