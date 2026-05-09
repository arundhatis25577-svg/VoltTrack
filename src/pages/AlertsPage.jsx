import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function AlertsPage({ alerts, onOpenArea }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState('All')
  const focusedAlertId = searchParams.get('focus')
  const selectedAlert = alerts.find((alert) => alert.id === focusedAlertId) || alerts[0]

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'All') return true
    if (filter === 'Pending') return alert.status === 'Pending'
    if (filter === 'Resolved') return alert.status === 'Resolved'
    return alert.risk === filter
  })

  useEffect(() => {
    if (!selectedAlert && alerts.length) {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.set('focus', alerts[0].id)
      setSearchParams(nextParams)
    }
  }, [alerts, searchParams, selectedAlert, setSearchParams])

  function openAlert(alert) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('focus', alert.id)
    setSearchParams(nextParams)
    const matchedRegion = alerts.find((item) => item.regionId === alert.regionId)
    if (matchedRegion) {
      onOpenArea(matchedRegion)
    }
  }

  return (
    <div className="page-stack">
      <section className="panel alerts-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Alert management</p>
            <h2>What needs immediate action?</h2>
          </div>
          <div className="filter-pills">
            {['All', 'HIGH', 'MEDIUM', 'Pending', 'Resolved'].map((value) => (
              <button
                key={value}
                type="button"
                className={`filter-pill ${filter === value ? 'active' : ''}`}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Area</th>
                <th>Risk</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} onClick={() => openAlert(alert)}>
                  <td>
                    <strong>{alert.area}</strong>
                    <span>{alert.city}</span>
                  </td>
                  <td>
                    <span className={`risk-badge ${alert.risk.toLowerCase()}`}>{alert.risk}</span>
                  </td>
                  <td>{alert.time}</td>
                  <td>
                    <span className={`status-chip ${alert.status === 'Pending' ? 'danger' : 'success'}`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="alert-detail-grid">
          <article className="detail-card detail-card-large">
            <p className="eyebrow">Alert detail modal</p>
            <h3>{selectedAlert.area}</h3>
            <p>{selectedAlert.detail}</p>
            <p>{selectedAlert.recommendation}</p>
            <div className="detail-actions">
              <button type="button" className="primary-button" onClick={() => navigate(`/analytics?area=${selectedAlert.regionId}`)}>
                Open analytics
              </button>
              <button type="button" className="secondary-button" onClick={() => navigate(`/heatmap?area=${selectedAlert.regionId}`)}>
                Open heatmap
              </button>
            </div>
          </article>
          <article className="detail-card">
            <p className="eyebrow">Status breakdown</p>
            <h3>Pending queue</h3>
            <p>{alerts.filter((alert) => alert.status === 'Pending').length} unresolved alerts are waiting for review.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
