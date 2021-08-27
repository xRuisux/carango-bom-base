export function formatCurrency(currency) {
  const currencyNumbersStr = currency.replace(/[.,]/g, '')

  let currencyNum = Number(currencyNumbersStr)
  let decimalPart = `,${currencyNum % 100}`
  let currencyValue = Math.trunc(currencyNum / 100)
  
  let formattedCurrency = ''
  
  while(currencyValue % 1000 !== currencyValue) {
    formattedCurrency = `.${currencyValue % 1000}${formattedCurrency}`
    currencyValue = Math.trunc(currencyValue / 1000)
  }

  return `${currencyValue}${formattedCurrency}${decimalPart}`
}

export function getOnlyNumbers(currency) {
  return currency.replace(/\D+/g, "")
}