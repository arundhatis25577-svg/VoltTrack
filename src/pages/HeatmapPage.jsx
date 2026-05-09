import { useNavigate, useSearchParams } from 'react-router-dom'

export function HeatmapPage({ regions, onOpenArea }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const area = searchParams.get('area') || ''
  const stateFilter = searchParams.get('state') || 'all'
  const cityFilter = searchParams.get('city') || 'all'
  const riskFilter = searchParams.get('risk') || 'all'

  const filtered = regions.filter((region) => {
    const matchesArea = !area || region.id === area
    const matchesState = stateFilter === 'all' || region.state === stateFilter
    const matchesCity = cityFilter === 'all' || region.city === cityFilter
    const matchesRisk = riskFilter === 'all' || region.risk === riskFilter || (riskFilter === 'high' && region.risk === 'critical')

    return matchesArea && matchesState && matchesCity && matchesRisk
  })

  const selected = filtered[0] || regions[0]

  function updateParam(key, value) {
    const nextParams = new URLSearchParams(searchParams)
    if (value === 'all' || value === '') {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }
    setSearchParams(nextParams)
  }

  return (
    <div className="page-stack heatmap-layout">
      <section className="panel heatmap-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Geographic loss map</p>
            <h2>Where is the problem happening?</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => navigate(`/analytics?area=${selected.id}`)}>
            Open analytics for selected area
          </button>
        </div>

        <div className="heatmap-shell">
          <aside className="filters-panel">
            <label>
              State
              <select value={stateFilter} onChange={(event) => updateParam('state', event.target.value)}>
                <option value="all">All states</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Telangana">Telangana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </label>
            <label>
              City
              <select value={cityFilter} onChange={(event) => updateParam('city', event.target.value)}>
                <option value="all">All cities</option>
                {regions.map((region) => (
                  <option value={region.city} key={region.city}>
                    {region.city}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Time range
              <select defaultValue="24h">
                <option>24h</option>
                <option>7d</option>
                <option>30d</option>
              </select>
            </label>
            <label>
              Risk level
              <select value={riskFilter} onChange={(event) => updateParam('risk', event.target.value)}>
                <option value="all">All risk levels</option>
                <option value="normal">Normal</option>
                <option value="suspicious">Suspicious</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </label>
            <div className="legend-card">
              <span className="legend normal">Normal</span>
              <span className="legend suspicious">Suspicious</span>
              <span className="legend high">High Risk</span>
              <span className="legend critical">Critical</span>
            </div>
          </aside>

          <div className="map-canvas">
            {filtered.map((region) => (
              <button
                key={region.id}
                type="button"
                className={`map-region ${region.risk}`}
                onClick={() => {
                  onOpenArea(region)
                  navigate(`/analytics?area=${region.id}`)
                }}
              >
                <span>{region.name}</span>
                <strong>{region.loss}%</strong>
                <small>{region.riskHint}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="details-row">
          <article className="detail-card">
            <p className="eyebrow">Selected area</p>
            <h3>{selected.name}</h3>
            <p>{selected.sector}</p>
          </article>
          <article className="detail-card">
            <p className="eyebrow">Risk view</p>
            <h3>{selected.risk}</h3>
            <p>{selected.loss}% loss against expected demand.</p>
          </article>
          <article className="detail-card">
            <p className="eyebrow">Zone</p>
            <h3>{selected.zone}</h3>
            <p>{selected.city} field officers are on watch.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
