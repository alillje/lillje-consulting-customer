export const setVatRate = (vatPercentage) => {
    let vatRate
    switch (vatPercentage) {
        case "25%":
        vatRate = 0.25
        break
        case "12%":
        vatRate = 0.12
        break
        case "6%":
        vatRate = 0.06
        break
        default:
        vatRate = 0
    }
    return vatRate
}