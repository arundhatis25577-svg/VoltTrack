import { Bell, Search, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LiveMap } from '../components/LiveMap'
import { formatMetric } from '../utils/chartUtils'

export function DashboardPage({ metrics, regions, alerts, onOpenArea }) {
  const navigate = useNavigate()
  const activeAlerts = alerts.filter((alert) => alert.status === 'Pending').length
  const gridHealth = Math.max(88, 100 - metrics.powerLoss).toFixed(1)
  const detectedLoss = metrics.powerLoss.toFixed(1)

  return (
    <div className="page-stack dashboard-page">
      <div className="dashboard-topbar">
        <div className="dashboard-search-card">
          <Search size={18} />
          <input placeholder="Search areas, feeders, transformers..." />
        </div>
        <div className="dashboard-user-actions">
          <button type="button" className="icon-button">
            <Bell size={18} />
            <span className="notification-badge">1</span>
          </button>
          <button type="button" className="profile-button">
            <User size={18} />
            <span>Admin</span>
          </button>
        </div>
      </div>

      <section className="dashboard-hero-grid">
        <article className="dashboard-hero-panel">
          <div className="eyebrow dashboard-badge">AI POWERED</div>
          <h1>Smarter Grids.<br />Lower Losses.<br />Stronger Future.</h1>
          <p className="dashboard-copy">
            Real-time monitoring, AI-driven detection, and actionable insights to eliminate power theft and distribution losses.
          </p>
          <div className="dashboard-actions">
            <button type="button" className="primary-button" onClick={() => navigate('/heatmap')}>
              Live Monitoring
            </button>
            <button type="button" className="secondary-button" onClick={() => navigate('/heatmap')}>
              View Heatmap
            </button>
          </div>
          <p className="scroll-hint">Scroll Down</p>
        </article>

        <article className="dashboard-map-panel">
          <div className="map-panel-head">
            <span>LIVE PROBLEM MAP</span>
            <div className="map-focus">Focus: National Grid</div>
          </div>
          <div className="map-preview">
            <LiveMap regions={regions} />
          </div>
        </article>
      </section>

      <section className="dashboard-summary-grid">
        <article className="summary-card green">
          <p>GRID STATUS</p>
          <strong>{gridHealth}%</strong>
          <small>Healthy</small>
        </article>
        <article className="summary-card orange">
          <p>DETECTED LOSS</p>
          <strong>{detectedLoss}%</strong>
          <small>Total Loss</small>
        </article>
        <article className="summary-card red">
          <p>THEFT ALERT</p>
          <strong>{activeAlerts}</strong>
          <small>Active Cases</small>
        </article>
        <article className="summary-card blue">
          <p>RESPONSE TIME</p>
          <strong>4.2m</strong>
          <small>Avg</small>
        </article>
        <article className="summary-card violet">
          <p>SYSTEM UP</p>
          <strong>99.9%</strong>
          <small>Uptime</small>
        </article>
      </section>
    </div>
  )
}
