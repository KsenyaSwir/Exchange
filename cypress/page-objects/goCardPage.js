import ChooseColorPage from "./chooseColorPage";


class GoCardPage {
    getProductByDocId(docId) {
        return cy.get(`a[href = "/product/${docId}"]`);
    }

    getLinkToProduct(obj) {
        return cy.xpath(`//a[@class = "card-link-target"][@href="/product/${obj.doc_id}"]`)
    }

    getButtonBuy() {
        return cy.get('div[class="hidden-xs bar-container background-white"]').contains('Buy').parent()
    }

    getButtonGoToCard() {
        //cy.get('button[class="mdc-button mdc-button--unelevated mdc-button--touch GmFillButton GmFillButtonDarkTheme GmTextLabelButton"]').first().should('exist')
        cy.wait(1000)
        cy.contains('Go to cart').should('exist')
        return cy.get('button').contains('Go to cart').parent().parent()
    }

    clickBuyOnNextPage(obj) {
        this.getLinkToProduct(obj).click()
        cy.wait(2000)
        this.getButtonBuy().click()
    }

    addProductToCard(product) {
        this.clickBuyOnNextPage(product)
        if (!product.isSingleColor) {
            ChooseColorPage.selectProductItemWithColor(product)
        }
    }
}

export default new GoCardPage();