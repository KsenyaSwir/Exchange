import Chance from 'chance';

describe('Exhange valute test', () => {

    it('Change valute', () => {
        cy.fixture('valutes_data').then(valutes_data => {
            let valutes = randomase(valutes_data);
                cy.log('--------' + valutes.shortName)
                cy.visit('https://www.xe.com/currencyconverter/')
                cy.get('label').contains('To').parent().find('.css-1pcexqc-container').click(); // cy.xpath('//label[text()=\'To\']/../div').click()

                cy.xpath('//div[@class=\'css-kj6f9i-menu converterform-dropdown__menu\']')
                cy.get('input[id="to"]').type(`${valutes.shortName}{enter}`) //cy.xpath('//input[@id="to"]').type(valutes_data.shortname)

                cy.get('button[data-test-id = "converter-submit-button"]').click() //cy.xpath('//button[@data-test-id="converter-submit-button"]').click();

                cy.get('span.converterresult-toAmount').invoke('text').then(amount => {
                    amount = Math.floor(amount) // округлила до меньшего целого, тк курс меняется каждый час, и тесты будут падать, если каждый раз не изменять json
                    valutes.rate = Math.floor(valutes.rate)
                    console.assert(amount == valutes.rate)
                    const assert = require('assert');
                    assert.deepEqual(amount, valutes.rate)
            })
        })

        function randomase(valute){
            let rates = valute.rates;
            let randomChangeValute = chance.pickone(rates);
            return randomChangeValute;
        }

    })

})
