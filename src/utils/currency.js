export function formatCurrency(currency) {
  return new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(currency / 100)
}

export function getOnlyNumbers(currency) {
  return currency.replace(/\D+/g, "")
}