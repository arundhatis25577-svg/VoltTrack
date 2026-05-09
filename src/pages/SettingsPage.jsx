export function SettingsPage({ theme, onToggleTheme, alertThreshold, onThresholdChange, notificationsEnabled, onToggleNotifications }) {
  return (
    <div className="page-stack">
      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">System controls</p>
            <h2>Control dashboard behavior</h2>
          </div>
          <span className="status-chip neutral">Admin panel</span>
        </div>

        <div className="settings-grid">
          <label className="setting-card toggle-card">
            <div>
              <strong>Dark / light mode</strong>
              <p>Switch the mission control theme.</p>
            </div>
            <button type="button" className="primary-button" onClick={onToggleTheme}>
              {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            </button>
          </label>

          <label className="setting-card">
            <div className="setting-row">
              <strong>Alert threshold</strong>
              <span>{alertThreshold}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={alertThreshold}
              onChange={(event) => onThresholdChange(Number(event.target.value))}
            />
            <p>Moves the line that decides when a region turns suspicious or high risk.</p>
          </label>

          <label className="setting-card toggle-card">
            <div>
              <strong>Notification settings</strong>
              <p>Enable live warnings and response prompts.</p>
            </div>
            <button
              type="button"
              className={`primary-button ${notificationsEnabled ? '' : 'ghost-mode'}`}
              onClick={onToggleNotifications}
            >
              {notificationsEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </label>
        </div>
      </section>
    </div>
  )
}
