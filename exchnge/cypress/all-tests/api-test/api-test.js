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

describe('Exhange valute test', () => {
    before(() => {
        cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916').then((response) => {
            cy.writeFile('cypress/fixtures/products.json', response.body)
        })
    })

    it('Info about project', () => {

        cy.fixture('products').then((products) => {
            products.products.length = products.products.length - 1;
            cy.log('Колличество продуктов: ' + products.products.length)
            cy.log('Информация о продукте:')
            cy.log('Имя: ' + products.products[0].display_name)
            cy.log('URL: ' + products.products[0].url)
        })
    })
})


