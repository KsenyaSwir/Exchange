class SearchResultsPage {
    getProductByDocId(docId) {
        return cy.get(`a[href = "/product/${docId}"]`);
    }

    clickBuyOnNextPage(obj) {
        this.getProductByDocId(`${obj.doc_id}`).should('exist')
        cy.xpath(`//a[@class = "card-link-target"][@href="/product/${obj.doc_id}"]`).click()
        cy.get('div[class="hidden-xs bar-container background-white"]').contains('Buy').parent().click()
    }

    findElementByColor(obj) {
        let random = chance.pickone(obj.images).color
        cy.wait(2000)
        cy.log(random)
        cy.wait(2000)
        return random.color_name == "Green" ? "Mint" : random.color_name;
    }

    selectProductItemWithColor(obj) {
        let color = this.findElementByColor(obj)
        cy.wait(3000)
        cy.get('div[class="hidden-xs bar-container background-white"]').contains('Buy').should('exist')
        cy.contains(color).should('exist').parent().next().next().find('button').click()
        cy.get('button[class="mdc-button mdc-button--unelevated mdc-button--touch GmFillButton GmFillButtonDarkTheme GmTextLabelButton"]').first().click({force: true})
    }

    isProductPresentedInStorage(obj) {
        cy.get('div[class="roboto-header-text-9"]').should('exist')
        cy.get('div[class="roboto-header-text-9"]').invoke('text').then(name => {
            const assert = require('assert');
            name.toString().includes(obj.display_name)
        })
    }

    addProductToCard(product) {
        this.clickBuyOnNextPage(product)
        if (!product.isSingleColor) {
            this.selectProductItemWithColor(product)
        }
    }

    checkTotalSum(obj, expectedCount, expectedPrice) {
        // check that expected amount === fact amount
        // check that expected price === fact price
        // check that expected count === fact count
        cy.get('option[selected="true"]').invoke('text').then(count => {
            //assert.deepEqual(count, "1")
            cy.get('span[class="roboto-header-text-6 float-right"]').invoke('text').then(amount => {
                cy.get('div[class="cart-price-bottom-padding text-right"]').invoke('text').then(price => {
                    amount = amount.toString().slice(1)
                    price = price.toString().slice(1)
                    expect(amount*1).to.deep.equal(price * count)
                })
            })
        })
    }


}

export default new SearchResultsPage()
