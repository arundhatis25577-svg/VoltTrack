import { useId } from 'react'
import { chartPath } from '../../utils/chartUtils'

export function LineChart({ values, accent }) {
  const gradientId = useId()
  const path = chartPath(values)

  return (
    <svg className="chart-svg" viewBox="0 0 420 180" role="img" aria-label="Line chart">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L 404,164 L 16,164 Z`} fill={`url(#${gradientId})`} />
      <path d={path} fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((value, index) => {
        const step = (420 - 32) / (values.length - 1 || 1)
        const x = 16 + index * step
        const min = Math.min(...values)
        const max = Math.max(...values)
        const range = max - min || 1
        const y = 164 - ((value - min) / range) * 132

        return <circle key={`${value}-${index}`} cx={x} cy={y} r="4.5" fill="#fff" opacity="0.95" />
      })}
    </svg>
  )
}
