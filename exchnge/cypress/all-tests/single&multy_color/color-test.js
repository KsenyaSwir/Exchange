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
            cy.fixture('products').then(products => {
                MainPage.open();
                MainPage.performSearch(name.name);
            })
        })


        it('Find and click Buy', () => {
            cy.fixture('products').then(products => {
                for (let obj of products.products) {
                    if (obj.display_name === name.name) {
                        SearchResultsPage.getProductByDocId(`${obj.doc_id}`).should('exist')
                        SearchResultsPage.clickBuyOnNextPage(obj)
                    }
                }
            })
        })

        it('Find by color ', () => {
            cy.fixture('products').then(products => {
                for (let obj of products.products) {
                    if (name.name === "Bellroy Slim Backpack for Google Pixelbook Go" && obj.display_name === "Bellroy Slim Backpack for Google Pixelbook Go") {
                        cy.log(1)
                        SearchResultsPage.addProductToCard(obj)
                    } else if (name.name === "Google Pixel Buds" && obj.display_name === "Google Pixel Buds") {
                        cy.log(2)
                        SearchResultsPage.addColor(obj)
                    }
                }
            })
        })

        it('Remove', () => {
            cy.contains('Remove').click()
        })

    })

})



