/**
 * Calculate VAT module
 * Takes a percentage string and returns he decimal number.
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

/**
 * Sets the vatRate as a decimal number from a string.
 *
 * @param {string} vatPercentage - The VAT percentage string to set the percentage in Number from.
 * @returns {number} - The percentage as a decimal number.
 */
export const setVatRate = (vatPercentage) => {
  let vatRate
  switch (vatPercentage) {
    case '25%':
      vatRate = 0.25
      break
    case '12%':
      vatRate = 0.12
      break
    case '6%':
      vatRate = 0.06
      break
    default:
      vatRate = 0
  }
  return vatRate
}
