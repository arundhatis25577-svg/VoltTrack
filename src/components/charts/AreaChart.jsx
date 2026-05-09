import { useId } from 'react'
import { areaPath } from '../../utils/chartUtils'

export function AreaChart({ values, accent }) {
  const gradientId = useId()
  const path = areaPath(values)

  return (
    <svg className="chart-svg" viewBox="0 0 420 180" role="img" aria-label="Area chart">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${gradientId})`} stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
