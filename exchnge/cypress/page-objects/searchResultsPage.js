class SearchResultsPage{
    getProductByDocId(docId){
        return cy.get(`a[href = "/product/${docId}"]`);
    }
    clickBuyOnNextPage(obj){
        cy.xpath('//a[@class = "card-link-target"][@href="/product/pixel_buds"]').click()
        cy.get('div[class="hidden-xs bar-container background-white"]').contains('Buy').parent().click()
    }
    findElementByColor(obj){
        let random = chance.pickone(obj.images).color
        cy.log(random.color_name)
        cy.wait(2000)
        cy.contains('White').should('exist').parent().next().next().find('button').click()
        cy.wait(5000)
        cy.get('button[class="mdc-button mdc-button--unelevated mdc-button--touch GmFillButton GmFillButtonDarkTheme GmTextLabelButton"]').first().click({force: true})
        cy.get('div[class="roboto-header-text-9"]').invoke('text').then(name => {
            const assert = require('assert');
            assert.deepEqual(name, obj.display_name+" (White)")
        })
        cy.get('span[class="roboto-header-text-6 float-right"]').invoke('text').then(amount => {
            cy.get('div[class="cart-price-bottom-padding text-right"]').invoke('text').then(prise => {
                assert.deepEqual(amount, prise)
            })
        })
        cy.get('option[selected="true"]').invoke('text').then(count =>{
            assert.deepEqual(count, "1")
        })
    }
}

export default new SearchResultsPage()