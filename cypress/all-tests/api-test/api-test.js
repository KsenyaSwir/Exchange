// ДВА ВАРИАНТА РЕАЛИЗАЦИИ

/*describe('Exhange valute test', () => {

    it('Info about project', () => {
        cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916').then((response) => {
            cy.writeFile('cypress/fixtures/products.json', response.body)
        })

        cy.fixture('products').then((products) => {
            products.products.length = products.products.length - 1;
            cy.log('Колличество продуктов: ' + products.products.length)
            cy.log('Информация о продукте:')
            cy.log('Имя: ' + products.products[0].display_name)
            cy.log('URL: ' + products.products[0].url)
        })
    })
})*/

import {getAllProducts} from "../../service/productService";

describe('Exhange valute test', () => {
    before(() => {
        getAllProducts().then((response) => {
            cy.writeFile('cypress/fixtures/products.json', response.body)
            cy.wrap(response.body).as('products')
        })
    })

    it('Info about project C7', () => {

        cy.fixture('products').then((products) => {
            cy.log('Колличество продуктов: ' + products.products.length)
            cy.log('Информация о продукте:')
            cy.log('Имя: ' + products.products[0].display_name)
            cy.log('URL: ' + products.products[0].url)
        })

        cy.get('@products').then((products) => {
            cy.log('Колличество продуктов: ' + products.products.length)
            cy.log('Информация о продукте:')
            cy.log('Имя: ' + products.products[0].display_name)
            cy.log('URL: ' + products.products[0].url)
        })
    })
})


