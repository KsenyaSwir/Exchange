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

    it('Navigate and search', () => {
        cy.fixture('products').then(products => {
            MainPage.open();
            MainPage.performSearch('Google Pixel Buds');
        })
    })

    it('Click to buy', () => {
        cy.fixture('products').then(products => {
            for (let  obj of products.products) {
                if(obj.display_name === "Google Pixel Buds") {
                    SearchResultsPage.getProductByDocId(`${obj.doc_id}`).should('exist')
                    SearchResultsPage.clickBuyOnNextPage(obj)
                }
            }
        })
    })

    it('Click to bu', () => {
        cy.fixture('products').then(products => {
            for (let  obj of products.products) {
                if(obj.display_name === "Google Pixel Buds") {
                    SearchResultsPage.findElementByColor(obj)
                }
            }
        })
    })

    it('Remove', () => {
        cy.contains('Remove').click()
    })
})
