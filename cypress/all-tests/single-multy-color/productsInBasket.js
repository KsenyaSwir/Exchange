import MainPage from "../../page-objects/mainPage";
import SearchElements from "../../page-objects/searchElements";
import SearchResultsPage from "../../page-objects/searchResultsPage";
import Preparations from "../../page-objects/preparations";
import CheckProductData from "../../page-objects/checkProductData";
import ChangeProductCount from "../../page-objects/changeProductCount";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.on('fail', (error, runnable) => {
    throw error // throw error to have test still fail
})

describe('Single and multy color test', () => {
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

        productsToSearch.forEach((productToSearch) => {
            Preparations.addToBacket(productToSearch)
        })
    });
    it('Check products, add more and check', () => {
        CheckProductData.check(productsToSearch, 1)
        ChangeProductCount.changeProductsCount(productsToSearch)
        CheckProductData.check(productsToSearch, 5)
    })
})