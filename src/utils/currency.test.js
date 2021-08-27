import { formatCurrency, getOnlyNumbers } from "./currency"

describe('getFormattedMoney', () => {
  it('should return currency with only aditional decimal numbers when string number length is less than 4', () => {
    const currency = formatCurrency('2.34')

    expect(currency).toEqual('2,34')
  })

  it('should return formatted currency when string number is larger than 3', () => {
    const numberOne = formatCurrency('238.9,.89897')
    const numberTwo = formatCurrency('238.9,.898973.')

    expect(numberTwo).toEqual('23.898.989,73')
    expect(numberOne).toEqual('2.389.898,97')
  })
})

describe('getOnlyNumbers', () => {
  it('should return false for invalid currency', () => {
    expect(getOnlyNumbers('123+(53543fjdks*&')).toEqual('12353543')
  })
})