class SearchResultsPage {
    getProductByDocId(docId) {
        return cy.get(`a[href = "/product/${docId}"]`);
    }

    clickBuyOnNextPage(obj) {
        cy.xpath(`//a[@class = "card-link-target"][@href="/product/${obj.doc_id}"]`).click()
        cy.get('div[class="hidden-xs bar-container background-white"]').contains('Buy').parent().click()
        /* cy.get('div[class="roboto-header-text-9"]').should(($div) => {
             const text = $div.get(0).innerText
         })*/

        if (obj.display_name === "Bellroy Slim Backpack for Google Pixelbook Go") {
            cy.get('div[class="roboto-header-text-9"]').should('exist')
        }
    }

    findElementByColor(obj) {
        let random = chance.pickone(obj.images).color
        cy.wait(2000)
        cy.log(random)
        cy.wait(2000)
        return random.color_name == "Green" ? "Mint" : random.color_name;
    }

    addColor(obj) {
        let color = this.findElementByColor(obj)
        cy.wait(3000)
        cy.contains(color).should('exist').parent().next().next().find('button').click()
        cy.get('button[class="mdc-button mdc-button--unelevated mdc-button--touch GmFillButton GmFillButtonDarkTheme GmTextLabelButton"]').first().click({force: true})
    }

    addProductToCard(obj) {
        cy.get('div[class="roboto-header-text-9"]').invoke('text').then(name => {
            const assert = require('assert');
            name.toString().includes(obj.display_name)
        })
        cy.get('span[class="roboto-header-text-6 float-right"]').invoke('text').then(amount => {
            cy.get('div[class="cart-price-bottom-padding text-right"]').invoke('text').then(prise => {
                assert.deepEqual(amount, prise)
            })
        })
        cy.get('option[selected="true"]').invoke('text').then(count => {
            assert.deepEqual(count, "1")
        })
    }
}

export default new SearchResultsPage()