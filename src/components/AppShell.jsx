import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, MapPinned, ShieldAlert, BarChart3, FileText, Settings, Zap } from 'lucide-react'

export function AppShell({ theme, onToggleTheme, onSimulateTheft, notificationsEnabled, latestAlert }) {
  const navigate = useNavigate()
  const location = useLocation()
  const hideTopbar = location.pathname === '/dashboard'

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', subtitle: 'What is happening now?', icon: LayoutDashboard },
    { to: '/heatmap', label: 'Heatmap', subtitle: 'Where is the problem?', icon: MapPinned },
    { to: '/alerts', label: 'Alerts', subtitle: 'Immediate action queue', icon: ShieldAlert },
    { to: '/analytics', label: 'Analytics', subtitle: 'Why is this happening?', icon: BarChart3 },
    { to: '/reports', label: 'Reports', subtitle: 'Official investigation packets', icon: FileText },
    { to: '/settings', label: 'Settings', subtitle: 'Control the dashboard', icon: Settings },
  ]

  return (
    <div className={`app-shell ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">PL</span>
          <div>
            <strong>PowerLeak</strong>
            <span>Government Monitoring</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Icon size={18} />
                <div>
                  <span>{item.label}</span>
                  <small>{item.subtitle}</small>
                </div>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="primary-button theft-button" onClick={onSimulateTheft}>
            <Zap size={16} /> Simulate Theft
          </button>
          <div className="status-chip success">{notificationsEnabled ? 'Notifications on' : 'Notifications off'}</div>
          <div className="status-card">
            <p>Latest alert</p>
            <strong>{latestAlert?.area}</strong>
            <span>{latestAlert?.detail}</span>
          </div>
        </div>
      </aside>

      <div className="workspace">
        {!hideTopbar && (
          <header className="topbar">
            <div>
              <p className="eyebrow">National grid oversight</p>
              <h1>PowerLeak Control Room</h1>
              <p className="topbar-caption">Government-grade monitoring with live anomaly response.</p>
            </div>
            <div className="topbar-actions">
              <button type="button" className="ghost-button" onClick={onToggleTheme}>
                Toggle theme
              </button>
              <button type="button" className="primary-button danger-button" onClick={onSimulateTheft}>
                Simulate theft
              </button>
            </div>
          </header>
        )}

        <main className="main-stage">
          <Outlet />
        </main>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.to} type="button" className="mobile-nav-item" onClick={() => navigate(item.to)}>
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
