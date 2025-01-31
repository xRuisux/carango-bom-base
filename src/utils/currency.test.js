import { formatCurrency, getOnlyNumbers } from "./currency"

test('should format currency', () => {
  jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({
    format: jest.fn(() => '12.356,75')
  }))
  
  const currency = formatCurrency('1235675')

  expect(currency).toEqual('12.356,75')
})

describe('getOnlyNumbers', () => {
  it('should return false for invalid currency', () => {
    expect(getOnlyNumbers('123+(53543fjdks*&')).toEqual('12353543')
  })
})