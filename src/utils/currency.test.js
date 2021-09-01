import { formatCurrency, getOnlyNumbers } from "./currency"

describe('getFormattedMoney', () => {
  it('should return currency with only aditional decimal numbers when string number length is less than 4', () => {
    const currency = formatCurrency('1235675')

    expect(currency).toEqual('12.356,75')
  })
})

describe('getOnlyNumbers', () => {
  it('should return false for invalid currency', () => {
    expect(getOnlyNumbers('123+(53543fjdks*&')).toEqual('12353543')
  })
})