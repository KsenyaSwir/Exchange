import SearchResultsPage from "./searchResultsPage";

class CheckProductData {
    check(productsToSearch, counter) {
        SearchResultsPage.getFieldsInForm().each(($item, $el) => {
            expect($item.text()).to.have.string(productsToSearch[$el].name.toString().slice(0, 21))
        })
        SearchResultsPage.getProductAmount().invoke('text').then(amount => {
            let pr = 0;
            let am = amount.toString().slice(1) * 1
            SearchResultsPage.getProductCount().each(($item, $el) => {
                expect(this.getProductCounts($item)).to.equal(counter)
            })
            SearchResultsPage.getProductPrice().each(($item, $el) => {
                expect(this.getProductPrices($item)).to.equal(productsToSearch[$el].price)
                pr += this.getProductPrices($item) * counter
                cy.log(pr)
                cy.log(am)
            }).then(() => {
                expect(am).to.equal(pr)
            })
        })
    }

    getProductCounts($item) {
        return $item.text() * 1
    }

    getProductPrices($item) {
        return $item.text().toString().slice(1) * 1
    }
}

export default new CheckProductData()