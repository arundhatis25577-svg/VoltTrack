export function getRiskLevel(loss, threshold) {
  if (loss >= threshold * 1.35) return 'critical'
  if (loss >= threshold) return 'high'
  if (loss >= threshold * 0.7) return 'suspicious'
  return 'normal'
}

export function formatRisk(risk) {
  return risk.replace(/_/g, ' ')
}

export function formatMetric(value) {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function chartPath(values, width = 420, height = 180, padding = 16) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = (width - padding * 2) / (values.length - 1 || 1)

  return values
    .map((value, index) => {
      const x = padding + index * step
      const y = height - padding - ((value - min) / range) * (height - padding * 2)
      return `${x},${y}`
    })
    .reduce((path, point, index) => `${path}${index === 0 ? 'M' : ' L'} ${point}`, '')
}

export function areaPath(values, width = 420, height = 180, padding = 16) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = (width - padding * 2) / (values.length - 1 || 1)
  const points = values.map((value, index) => {
    const x = padding + index * step
    const y = height - padding - ((value - min) / range) * (height - padding * 2)
    return { x, y }
  })

  return `${points
    .map((point, index) => `${index === 0 ? 'M' : ' L'} ${point.x},${point.y}`)
    .join('')} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`
}
