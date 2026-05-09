import { reportTemplates } from '../data/dashboardData'
import { useNavigate } from 'react-router-dom'

export function ReportsPage({ reports, onGenerateReport, latestAlert }) {
  const navigate = useNavigate()

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Reporting system</p>
            <h2>Create official investigation reports</h2>
          </div>
          <span className="status-chip success">Download-ready</span>
        </div>

        <div className="report-actions">
          {reportTemplates.map((template) => (
            <article key={template.id} className="report-card">
              <div>
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </div>
              <div className="report-buttons">
                <button type="button" className="ghost-button" onClick={() => onGenerateReport(template.id, 'area')}>
                  Generate PDF
                </button>
                <button type="button" className="ghost-button" onClick={() => onGenerateReport(template.id, 'monthly')}>
                  Export CSV
                </button>
                <button type="button" className="ghost-button" onClick={() => onGenerateReport(template.id, 'theft')}>
                  Export Excel
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="report-summary-grid">
          <article className="detail-card detail-card-large">
            <p className="eyebrow">AI summary</p>
            <h3>Sector 18 showed 32% abnormal loss patterns.</h3>
            <p>
              The current alert footprint suggests a repeatable night-load anomaly across multiple feeders, with a
              stronger concentration in the central urban ring.
            </p>
            <button type="button" className="primary-button" onClick={() => navigate(`/alerts?focus=${latestAlert.id}`)}>
              Inspect latest alert
            </button>
          </article>

          <article className="detail-card">
            <p className="eyebrow">Generated reports</p>
            <h3>{reports.length}</h3>
            <p>Recent downloads and simulated logs appear here.</p>
          </article>
        </div>

        <div className="generated-list">
          {reports.length === 0 ? (
            <div className="empty-state">No reports generated yet. Use any report card to create one.</div>
          ) : (
            reports.map((report) => (
              <article className="generated-item" key={report.id}>
                <strong>{report.title}</strong>
                <span>{report.description}</span>
                <small>{report.type}</small>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
