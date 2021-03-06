import SearchResultsPage from "../../page-objects/searchResultsPage";
import MainPage from "../../page-objects/mainPage";
import GoCardPage from "../../page-objects/goCardPage";
import {getAllProducts} from "../../service/productService";
import Chance from 'chance';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.on('fail', (error, runnable) => {
    throw error // throw error to have test still fail
})

describe('Single and multy color test', () => {
    before(() => {
        getAllProducts().then((response) => {
            cy.writeFile('cypress/fixtures/products.json', response.body)
        })
    })

    let productsToSearch = [
        {
            name: "Bellroy Slim Backpack for Google Pixelbook Go",
            url: "bellroy_backpack_pixelbook_go",
            isSingleColor: true,
            price: 129
        },
        {
            name: "Google Pixel Buds",
            url: "pixel_buds",
            isSingleColor: false,
            price: 179
        }
    ]

    productsToSearch.forEach((productToSearch) => {
        it('Navigate and search C5', () => {
            cy.log('GIVEN User is at the main page')
            cy.fixture('products').then(product => {
                MainPage.open();
                cy.log('WHEN User performs search')
                MainPage.performSearch(productToSearch.name);
                cy.log('THEN search is done')
                GoCardPage.getProductByDocId(productToSearch.url).should('exist')

                const productDetails = product.products.filter(product => product.display_name === productToSearch.name);
                let productUnderTest = productDetails[0];
                productUnderTest.url = productToSearch.url;
                productUnderTest.isSingleColor = productToSearch.isSingleColor;
                productUnderTest.price = productToSearch.price;

                cy.log('WHEN User adds product to card');
                GoCardPage.addProductToCard(productUnderTest);
                cy.log('THEN User check products data');
                SearchResultsPage.isProductPresentedInStorage(productUnderTest)
                SearchResultsPage.checkTotalSum(productUnderTest, 1, productUnderTest.price)

            })
        })

        after(() => {
            cy.get('body').then(($body) => {
                if ($body.text().includes('Remove')) {
                    cy.contains('Remove').click()
                } else {
                    cy.log('No such element')
                }
            })
        })
    })
})



