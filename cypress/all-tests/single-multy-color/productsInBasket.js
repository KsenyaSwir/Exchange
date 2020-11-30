
import BasketPage from "../../page-objects/basketPage";
import MainPage from "../../page-objects/mainPage";
import GoCardPage from "../../page-objects/goCardPage";
import SearchResultsPage from "../../page-objects/searchResultsPage";


Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.on('fail', (error, runnable) => {
    throw error // throw error to have test still fail
})

describe('Single and multy color test', () => {
    const firstProductCount = 1
    const productCount = 2
    let productsToSearch = [
        {
            "name": "Bellroy Slim Backpack for Google Pixelbook Go",
            "url": "bellroy_backpack_pixelbook_go",
            "isSingleColor": true,
            "price": 129,
            "doc_id": "bellroy_backpack_pixelbook_go"
        },
        {
            "name": "Pixel USB-C Earbuds White",
            "url": "usb_c_earbuds",
            "isSingleColor": true,
            "price": 29.99,
            "doc_id": "usb_c_earbuds"
        }
    ]
    before(() => {
        cy.log('GIVEN User is at the basket')
        productsToSearch.forEach((productToSearch) => {
            addToBacket(productToSearch)
            add(productToSearch)

            function addToBacket(productToSearch) {
                MainPage.open()
                cy.log('WHEN User performs search')
                MainPage.performSearch(productToSearch.name)
                cy.log('THEN search is done')
                GoCardPage.getProductByDocId(productToSearch.url).should('exist')
            }

            function add(productToSearch) {
                cy.log('WHEN User adds product to card')
                GoCardPage.addProductToCard(productToSearch)
                cy.log('THEN User check products data')
                cy.wait(1000)
                SearchResultsPage.isProductPresentedInStorage(productToSearch)
            }
        })
    });
    it('Check products, add more and check C4', () => {
        cy.log('WHEN User check products')
        BasketPage.check(productsToSearch, firstProductCount)
        cy.log('AND Selects change products count')
        BasketPage.changeProductsCount(productsToSearch, productCount)
        cy.log('THEN User check data after increasing count')
        BasketPage.check(productsToSearch, productCount)
    })
})