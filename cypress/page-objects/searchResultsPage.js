class SearchResultsPage {

    getFieldsInForm() {
        return cy.get('div[class="roboto-header-text-9"]')
    }

    getProductCount() {
        return cy.get('option[selected="true"]')
    }

    getProductAmount() {
        return cy.get('span[class="roboto-header-text-6 float-right"]')
    }

    getProductPrice() {
        return cy.get('div[class="cart-price-bottom-padding text-right"]')
    }

    isProductPresentedInStorage(obj) {
        this.getFieldsInForm().should('exist')
        this.getFieldsInForm().invoke('text').then(name => {
            const assert = require('assert');
            name.toString().includes(obj.display_name)
        })
    }

    checkTotalSum(obj, expectedCount, expectedPrice) {
        this.getProductCount().invoke('text').then(count => {
            this.getProductAmount().invoke('text').then(amount => {
                this.getProductPrice().invoke('text').then(price => {
                    amount = amount.toString().slice(1)
                    price = price.toString().slice(1)
                    expect(count * 1).to.deep.equal(expectedCount)
                    expect(price * 1).to.deep.equal(expectedPrice)
                    expect(amount * 1).to.deep.equal(price * count)
                })
            })
        })
    }
}

export default new SearchResultsPage()
