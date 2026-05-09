import { useNavigate, useSearchParams } from 'react-router-dom'
import { LineChart } from '../components/charts/LineChart'
import { AreaChart } from '../components/charts/AreaChart'
import { BarChart } from '../components/charts/BarChart'

export function AnalyticsPage({ regions }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedArea = searchParams.get('area')
  const focusRegion = regions.find((region) => region.id === selectedArea) || regions[0]
  const compareLeft = regions.find((region) => region.id === 'delhi') || regions[0]
  const compareRight = regions.find((region) => region.id === 'mumbai') || regions[1] || regions[0]

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Deep analysis</p>
            <h2>Why is this happening?</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => navigate(`/reports?area=${focusRegion.id}`)}>
            Generate report from this area
          </button>
        </div>

        <div className="analytics-grid">
          <article className="chart-card">
            <div className="chart-head">
              <div>
                <h3>Expected vs actual usage</h3>
                <p>{focusRegion.name}</p>
              </div>
              <span className="status-chip warning">Line graph</span>
            </div>
            <LineChart values={focusRegion.trend} accent="#5eead4" />
          </article>

          <article className="chart-card">
            <div className="chart-head">
              <div>
                <h3>Monthly loss trends</h3>
                <p>Area chart for recurring loss growth</p>
              </div>
              <span className="status-chip danger">Loss growth</span>
            </div>
            <AreaChart values={focusRegion.trend.map((value, index) => value - index * 2)} accent="#fb7185" />
          </article>

          <article className="chart-card">
            <div className="chart-head">
              <div>
                <h3>Night consumption analysis</h3>
                <p>Suspicious midnight spikes</p>
              </div>
              <span className="status-chip neutral">00:00 - 06:00</span>
            </div>
            <BarChart values={focusRegion.nightLoad} accent="#f59e0b" />
          </article>

          <article className="chart-card compare-card">
            <div className="chart-head">
              <div>
                <h3>Compare regions</h3>
                <p>Delhi vs Mumbai</p>
              </div>
              <span className="status-chip success">Benchmark</span>
            </div>
            <div className="compare-grid">
              <button type="button" className="compare-pill" onClick={() => navigate('/analytics?area=delhi')}>
                Delhi
              </button>
              <button type="button" className="compare-pill" onClick={() => navigate('/analytics?area=mumbai')}>
                Mumbai
              </button>
              <button type="button" className="compare-pill" onClick={() => navigate('/analytics?area=kolkata')}>
                Kolkata
              </button>
            </div>
            <div className="compare-bars">
              <div>
                <span>{compareLeft.name}</span>
                <strong>{compareLeft.loss}%</strong>
                <div className="bar-track">
                  <div className="bar-fill left" style={{ width: `${compareLeft.loss * 2.1}%` }} />
                </div>
              </div>
              <div>
                <span>{compareRight.name}</span>
                <strong>{compareRight.loss}%</strong>
                <div className="bar-track">
                  <div className="bar-fill right" style={{ width: `${compareRight.loss * 2.1}%` }} />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
