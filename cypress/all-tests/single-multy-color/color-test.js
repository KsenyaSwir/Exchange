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
        {
            name: "Bellroy Slim Backpack for Google Pixelbook Go",
            url: "bellroy_backpack_pixelbook_go",
            isSingleColor: true // add price
        },
        {name: "Google Pixel Buds", url: "pixel_buds", isSingleColor: false}
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
                const productDetails = products.products.filter(product => product.display_name === name.name);
                let productUnderTest = productDetails[0];
                productUnderTest.url = name.url;
                productUnderTest.isSingleColor = name.isSingleColor;
                productUnderTest.price = name.price;

                cy.log('WHEN User adds product to card');
                SearchResultsPage.addProductToCard(productUnderTest);

                SearchResultsPage.isProductPresentedInStorage(productUnderTest)
                SearchResultsPage.checkTotalSum(productUnderTest, 1, 10) // modify
            })
        })

        xit('Remove', () => {
            cy.contains('Remove').click()
            // *:contains('Remove')
        })
    })
})



