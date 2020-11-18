
export const getAllProducts = (body, autoControl = true) => {
    return cy.request({
        method: 'GET',
        url: `https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json`,
        failOnStatusCode: autoControl,
    })
}
