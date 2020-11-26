import GoCardPage from "./goCardPage";

class ChooseColorPage {

    selectProductItemWithColor(obj) {
        let color = this.findElementByColor(obj)
        cy.wait(3000)
        this.getElementWithColor(color).click()
        GoCardPage.getButtonGoToCard().click()
    }

    getElementWithColor(color) {
        return cy.contains(color).should('exist').parent().next().next().find('button')
    }

    findElementByColor(obj) {
        let random = chance.pickone(obj.images).color
        cy.wait(2000)
        cy.log(random)
        cy.wait(2000)
        return random.color_name == "Green" ? "Mint" : random.color_name;
    }
}

export default new ChooseColorPage();