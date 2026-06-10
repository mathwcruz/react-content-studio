export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatPercentage(value: number) {
  return `${Math.round(value * 100)}%`
}
