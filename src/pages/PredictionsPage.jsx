import { useNavigate } from 'react-router-dom'

export function PredictionsPage({ regions }) {
  const navigate = useNavigate()
  const predictedSeries = [12, 15, 18, 23, 27, 32, 37]
  const highRisk = regions.slice().sort((left, right) => right.loss - left.loss).slice(0, 4)

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Forecast engine</p>
            <h2>What problems may happen in the future?</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => navigate('/heatmap?risk=high')}>
            Jump to high-risk map
          </button>
        </div>

        <div className="analytics-grid">
          <article className="chart-card">
            <div className="chart-head">
              <div>
                <h3>Predicted loss graph</h3>
                <p>Next 7 days</p>
              </div>
              <span className="status-chip danger">7 day outlook</span>
            </div>
            <div className="chart-placeholder">
              <div className="chart-placeholder-line" />
              <span className="chart-placeholder-label">Forecast graph component</span>
            </div>
          </article>

          <article className="chart-card">
            <div className="chart-head">
              <div>
                <h3>Risk forecast</h3>
                <p>Delhi may face high losses next week</p>
              </div>
              <span className="status-chip warning">Forecast alert</span>
            </div>
            <div className="forecast-card">
              <strong>Delhi NCR</strong>
              <p>
                The model expects the central cluster to continue climbing if night demand is not reduced within the
                next three days.
              </p>
            </div>
          </article>

          <article className="chart-card compare-card">
            <div className="chart-head">
              <div>
                <h3>High-risk ranking</h3>
                <p>Top dangerous areas</p>
              </div>
              <span className="status-chip success">Priority</span>
            </div>
            <div className="ranking-list">
              {highRisk.map((region, index) => (
                <button
                  type="button"
                  className="ranking-item"
                  key={region.id}
                  onClick={() => navigate(`/analytics?area=${region.id}`)}
                >
                  <span>{index + 1}</span>
                  <strong>{region.name}</strong>
                  <small>{region.loss}% loss</small>
                </button>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
