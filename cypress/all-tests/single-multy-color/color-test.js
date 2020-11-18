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
        {name: "Bellroy Slim Backpack for Google Pixelbook Go", url: "bellroy_backpack_pixelbook_go"},
        {name: "Google Pixel Buds", url: "pixel_buds"}
    ]

    productsToSearch.forEach((name) => {
        it('Navigate and search', () => {
            cy.log('GIVEN User is at the main page')
            cy.fixture('products').then(product => {
                MainPage.open();
                cy.log('WHEN User performs search')
                MainPage.performSearch(name.name);
                cy.log('THEN search is done')
                SearchResultsPage.getProductByDocId(name.url).should('exist')
            })
        })

        it('Find and click Buy', () => {
            cy.log('GIVEN User is at the page with product')
            cy.fixture('products').then(products => {
                for (let obj of products.products) {
                    if (obj.display_name === name.name) {
                        cy.log('WHEN User click Buy on the next page')
                        SearchResultsPage.getProductByDocId(`${obj.doc_id}`).should('exist')
                        SearchResultsPage.clickBuyOnNextPage(obj)
                        if (name.name === 'Bellroy Slim Backpack for Google Pixelbook Go') {
                            cy.log('THEN page with product open')
                            cy.get('div[class="roboto-header-text-9"]').should('exist')
                        } else if (name.name === 'Google Pixel Buds') {
                            cy.log('THEN page with product will loading after clicking Buy')
                            cy.get('div[class="hidden-xs bar-container background-white"]').contains('Buy').should('exist')
                        }
                    }
                }
            })
        })

        it('Find by color ', () => {
            cy.log('GIVEN User is at the page product colors')
            cy.fixture('products').then(products => {
                cy.log('WHEN product exist')
                for (let obj of products.products) {
                    if (name.name === "Bellroy Slim Backpack for Google Pixelbook Go" && obj.display_name === "Bellroy Slim Backpack for Google Pixelbook Go") {
                        cy.log('THEN product data is checked')
                        SearchResultsPage.addProductToCard(obj)
                    } else if (name.name === "Google Pixel Buds" && obj.display_name === "Google Pixel Buds") {
                        cy.log('THEN product had been added to card')
                        SearchResultsPage.addColor(obj)
                        cy.get('button[class="mdc-button mdc-button--unelevated mdc-button--touch GmFillButton GmFillButtonDarkTheme GmTextLabelButton"]').should('exist')
                        SearchResultsPage.addProductToCard(obj)
                    }
                }
            })
        })

        it('Remove', () => {
            cy.contains('Remove').click()
        })
    })
})



