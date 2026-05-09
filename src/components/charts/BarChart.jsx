export function BarChart({ values, accent }) {
  return (
    <div className="bar-chart">
      {values.map((value, index) => (
        <div className="bar-column" key={`${value}-${index}`}>
          <span>{value}</span>
          <div className="bar-meter">
            <div className="bar-fill vertical" style={{ height: `${Math.min(100, value * 1.2)}%`, background: accent }} />
          </div>
        </div>
      ))}
    </div>
  )
}
