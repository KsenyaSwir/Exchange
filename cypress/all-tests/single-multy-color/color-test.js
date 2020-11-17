import SearchResultsPage from "../../page-objects/searchResultsPage";
import MainPage from "../../page-objects/mainPage";
import Chance from 'chance';


Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.on('fail', (error, runnable) => {
    throw error // throw error to have test still fail
})

describe('Single and multy color test', () => {
    before(() => {
        cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916').then((response) => {
            cy.writeFile('cypress/fixtures/products.json', response.body)
        })
    })

    let productsToSearch = [
        {name: "Bellroy Slim Backpack for Google Pixelbook Go"},
        {name: "Google Pixel Buds"}
    ]

    productsToSearch.forEach((name) => {
        it('Navigate and search', () => {
            cy.log('GIVEN User is at the main page')
            cy.fixture('products').then(products => {
                MainPage.open();
                cy.log('WHEN User performs search')
                MainPage.performSearch(name.name);
                cy.log('THEN Product is added into the Storage')
            })
        })

        it('Find and click Buy', () => {
            cy.log('GIVEN User is at the page with product')
            cy.fixture('products').then(products => {
                for (let obj of products.products) {
                    if (obj.display_name === name.name) {
                        SearchResultsPage.getProductByDocId(`${obj.doc_id}`).should('exist')
                        cy.log('WHEN User click Buy on the next page')
                        SearchResultsPage.clickBuyOnNextPage(obj)
                        cy.log('THEN page with product open')
                    }
                }
            })
        })

        it('Find by color ', () => {
            cy.log('GIVEN User is at the page product colors')
            cy.fixture('products').then(products => {
                for (let obj of products.products) {
                    if (name.name === "Bellroy Slim Backpack for Google Pixelbook Go" && obj.display_name === "Bellroy Slim Backpack for Google Pixelbook Go") {
                        cy.log('WHEN product has single color')
                        SearchResultsPage.addProductToCard(obj)
                        cy.log('THEN product data is checked')
                    } else if (name.name === "Google Pixel Buds" && obj.display_name === "Google Pixel Buds") {
                        cy.log('WHEN product hac multy color')
                        SearchResultsPage.addColor(obj)
                        SearchResultsPage.addProductToCard(obj)
                        cy.log('THEN product had been added to card')
                    }
                }
            })
        })

        it('Remove', () => {
            cy.contains('Remove').click()
        })
    })
})



