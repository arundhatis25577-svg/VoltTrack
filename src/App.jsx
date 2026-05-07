
import { AnimatePresence, motion } from 'framer-motion'
import {
	Activity,
	AlertTriangle,
	ArrowUpRight,
	BarChart3,
	Bell,
	ChartArea,
	CircleGauge,
	FileText,
	LayoutDashboard,
	MapPinned,
	ShieldAlert,
	Settings,
	Sparkles,
	TrendingUp,
	Zap,
} from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import {
	BrowserRouter,
	NavLink,
	Navigate,
	Outlet,
	Route,
	Routes,
	useNavigate,
	useSearchParams,
} from 'react-router-dom'
import './App.css'

void motion

const initialRegions = [
	{
		id: 'delhi',
		name: 'Delhi NCR',
		state: 'Delhi',
		city: 'Delhi',
		sector: 'Sector 21',
		loss: 31,
		usage: 128,
		expected: 97,
		trend: [84, 86, 89, 92, 98, 112, 128],
		nightLoad: [34, 30, 41, 48, 60, 69, 74],
		riskHint: 'Transit and commercial draw remain elevated after midnight.',
		zone: 'North',
	},
	{
		id: 'mumbai',
		name: 'Mumbai Metro',
		state: 'Maharashtra',
		city: 'Mumbai',
		sector: 'Ward 14',
		loss: 18,
		usage: 149,
		expected: 131,
		trend: [108, 111, 115, 121, 129, 136, 149],
		nightLoad: [28, 31, 33, 40, 48, 52, 56],
		riskHint: 'Industrial corridors are stable, but one pocket is drifting.',
		zone: 'West',
	},
	{
		id: 'kolkata',
		name: 'Kolkata Sector',
		state: 'West Bengal',
		city: 'Kolkata',
		sector: 'Sector 9',
		loss: 27,
		usage: 102,
		expected: 75,
		trend: [72, 73, 76, 80, 84, 93, 102],
		nightLoad: [22, 24, 29, 38, 42, 48, 58],
		riskHint: 'Late-night demand spikes match an abnormal feeder pattern.',
		zone: 'East',
	},
	{
		id: 'bengaluru',
		name: 'Bengaluru Ring',
		state: 'Karnataka',
		city: 'Bengaluru',
		sector: 'Sector 18',
		loss: 14,
		usage: 116,
		expected: 102,
		trend: [90, 93, 95, 97, 100, 108, 116],
		nightLoad: [18, 19, 20, 25, 27, 31, 35],
		riskHint: 'Growth is healthy; only one distribution pocket is noisy.',
		zone: 'South',
	},
	{
		id: 'ahmedabad',
		name: 'Ahmedabad Hub',
		state: 'Gujarat',
		city: 'Ahmedabad',
		sector: 'Sector 7',
		loss: 21,
		usage: 88,
		expected: 69,
		trend: [63, 65, 67, 72, 76, 82, 88],
		nightLoad: [16, 17, 20, 24, 29, 31, 35],
		riskHint: 'Midnight use is trending above the regional baseline.',
		zone: 'West',
	},
	{
		id: 'hyderabad',
		name: 'Hyderabad Circle',
		state: 'Telangana',
		city: 'Hyderabad',
		sector: 'Sector 24',
		loss: 16,
		usage: 95,
		expected: 80,
		trend: [72, 74, 77, 81, 85, 90, 95],
		nightLoad: [15, 17, 19, 21, 25, 29, 33],
		riskHint: 'Commercial demand is steady but watch the night surge.',
		zone: 'South',
	},
	{
		id: 'lucknow',
		name: 'Lucknow Belt',
		state: 'Uttar Pradesh',
		city: 'Lucknow',
		sector: 'Sector 3',
		loss: 12,
		usage: 73,
		expected: 61,
		trend: [56, 58, 59, 62, 65, 69, 73],
		nightLoad: [10, 11, 12, 14, 16, 18, 20],
		riskHint: 'A low-loss area, but the recent pattern deserves routine checks.',
		zone: 'North',
	},
	{
		id: 'chennai',
		name: 'Chennai Grid',
		state: 'Tamil Nadu',
		city: 'Chennai',
		sector: 'Sector 17',
		loss: 24,
		usage: 121,
		expected: 96,
		trend: [92, 94, 97, 101, 107, 113, 121],
		nightLoad: [24, 26, 31, 34, 38, 45, 52],
		riskHint: 'A coastal feeder shows repeated after-hours peaks.',
		zone: 'South',
	},
]

const initialAlerts = [
	{
		id: 'AL-1001',
		area: 'Sector 21',
		city: 'Delhi',
		risk: 'HIGH',
		time: '2 mins ago',
		status: 'Pending',
		regionId: 'delhi',
		detail: 'Repeated midnight usage spikes are crossing the configured threshold.',
		recommendation: 'Dispatch a field inspection and verify meter integrity.',
	},
	{
		id: 'AL-1002',
		area: 'Sector 9',
		city: 'Kolkata',
		risk: 'HIGH',
		time: '8 mins ago',
		status: 'Pending',
		regionId: 'kolkata',
		detail: 'The area shows a persistent difference between expected and actual demand.',
		recommendation: 'Review transformer logs and cross-check feeder records.',
	},
	{
		id: 'AL-1003',
		area: 'Ward 14',
		city: 'Mumbai',
		risk: 'MEDIUM',
		time: '16 mins ago',
		status: 'Resolved',
		regionId: 'mumbai',
		detail: 'A short-lived spike was matched to a maintenance window.',
		recommendation: 'Keep the region under watch for 24 hours.',
	},
	{
		id: 'AL-1004',
		area: 'Sector 17',
		city: 'Chennai',
		risk: 'HIGH',
		time: '31 mins ago',
		status: 'Pending',
		regionId: 'chennai',
		detail: 'Night load is still above the regional baseline for this corridor.',
		recommendation: 'Use night camera checks around the feeder line.',
	},
]

const initialFeed = [
	'Sector 21 flagged after a midnight draw spike.',
	'Delhi consumption updated from the latest smart meter batch.',
	'Mumbai anomaly detected and forwarded to regional officers.',
	'Kolkata feeder graph shows a rising loss curve.',
]

const reportTemplates = [
	{ id: 'pdf', name: 'Area PDF', description: 'Official field brief with maps and anomaly notes.' },
	{ id: 'monthly', name: 'Monthly Summary', description: 'A clean executive view of losses and trends.' },
	{ id: 'theft', name: 'Theft Summary', description: 'Focused analysis for suspicious clusters and recovery.' },
]

const landingFeatures = [
	{
		title: 'Smart Detection',
		description: 'Spot abnormal draws before they become full-scale losses.',
		icon: Sparkles,
	},
	{
		title: 'Heatmaps',
		description: 'Track suspicious zones by state, city, and sector.',
		icon: MapPinned,
	},
	{
		title: 'AI Prediction',
		description: 'Forecast where loss spikes are likely to spread next.',
		icon: TrendingUp,
	},
	{
		title: 'Real-time Alerts',
		description: 'Send teams immediately when a region turns red.',
		icon: Bell,
	},
]

const dashboardSignals = [
	{ id: 'delhi', label: 'Delhi', x: '18%', y: '30%', status: 'high' },
	{ id: 'mumbai', label: 'Mumbai', x: '23%', y: '64%', status: 'suspicious' },
	{ id: 'chennai', label: 'Chennai', x: '64%', y: '78%', status: 'normal' },
	{ id: 'kolkata', label: 'Kolkata', x: '74%', y: '42%', status: 'high' },
	{ id: 'bengaluru', label: 'Bengaluru', x: '49%', y: '74%', status: 'normal' },
]

function getRiskLevel(loss, threshold) {
	if (loss >= threshold * 1.35) return 'critical'
	if (loss >= threshold) return 'high'
	if (loss >= threshold * 0.7) return 'suspicious'
	return 'normal'
}

function formatRisk(risk) {
	return risk.replace(/_/g, ' ')
}

function formatMetric(value) {
	return new Intl.NumberFormat('en-IN').format(value)
}

function chartPath(values, width = 420, height = 180, padding = 16) {
	const min = Math.min(...values)
	const max = Math.max(...values)
	const range = max - min || 1
	const step = (width - padding * 2) / (values.length - 1 || 1)

	return values
		.map((value, index) => {
			const x = padding + index * step
			const y = height - padding - ((value - min) / range) * (height - padding * 2)
			return `${x},${y}`
		})
		.reduce((path, point, index) => `${path}${index === 0 ? 'M' : ' L'} ${point}`, '')
}

function areaPath(values, width = 420, height = 180, padding = 16) {
	const min = Math.min(...values)
	const max = Math.max(...values)
	const range = max - min || 1
	const step = (width - padding * 2) / (values.length - 1 || 1)
	const points = values.map((value, index) => {
		const x = padding + index * step
		const y = height - padding - ((value - min) / range) * (height - padding * 2)
		return { x, y }
	})

	return `${points
		.map((point) => `${point.x},${point.y}`)
		.reduce((path, point, index) => `${path}${index === 0 ? 'M' : ' L'} ${point}`, '')} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`
}

function App() {
	const [theme, setTheme] = useState('dark')
	const [alertThreshold, setAlertThreshold] = useState(18)
	const [notificationsEnabled, setNotificationsEnabled] = useState(true)
	const [regions, setRegions] = useState(initialRegions)
	const [alerts, setAlerts] = useState(initialAlerts)
	const [, setFeed] = useState(initialFeed)
	const [reports, setReports] = useState([])
	const [activeArea, setActiveArea] = useState(null)

	useEffect(() => {
		document.documentElement.dataset.theme = theme
	}, [theme])

	const classifiedRegions = regions.map((region) => ({
		...region,
		risk: getRiskLevel(region.loss, alertThreshold),
	}))

	const metrics = {
		totalConsumption: classifiedRegions.reduce((sum, region) => sum + region.usage, 0),
		powerLoss: Math.round(
			classifiedRegions.reduce((sum, region) => sum + region.loss, 0) / classifiedRegions.length,
		),
		activeAlerts: alerts.filter((alert) => alert.status === 'Pending').length,
		highRiskAreas: classifiedRegions.filter((region) => region.risk === 'high' || region.risk === 'critical').length,
	}

	const latestAlert = alerts[0]

	function openArea(area) {
		setActiveArea(area)
	}

	function closeArea() {
		setActiveArea(null)
	}

	function handleSimulateTheft() {
		const target = classifiedRegions.slice().sort((left, right) => right.loss - left.loss)[0]

		setRegions((currentRegions) =>
			currentRegions.map((region) =>
				region.id === target.id
					? {
							...region,
							loss: region.loss + 7,
							usage: region.usage + 11,
							expected: Math.max(45, region.expected - 2),
							trend: region.trend.map((value, index) => (index === region.trend.length - 1 ? value + 13 : value)),
							nightLoad: region.nightLoad.map((value, index) =>
								index === region.nightLoad.length - 1 ? value + 15 : value,
							),
						}
					: region,
			),
		)

		setAlerts((currentAlerts) => [
			{
				id: `AL-${Date.now().toString().slice(-4)}`,
				area: target.sector,
				city: target.city,
				risk: 'HIGH',
				time: 'just now',
				status: 'Pending',
				regionId: target.id,
				detail: `A simulated theft event raised the live loss signal in ${target.name}.`,
				recommendation: 'Send an inspection team and review the feeder logs immediately.',
			},
			...currentAlerts,
		])

		setFeed((currentFeed) => [
			`Simulated theft injected into ${target.sector} and marked RED.`,
			`Alert generated for ${target.city} with expanded anomaly traces.`,
			...currentFeed,
		])

		if (notificationsEnabled) {
			setReports((currentReports) => [
				{
					id: Date.now(),
					title: 'Simulation log',
					description: `${target.name} crossed the live threshold and pushed the region into high risk.`,
					type: 'Theft summary',
				},
				...currentReports,
			])
		}
	}

	function handleReportGenerate(templateId, scope) {
		const label = templateId === 'pdf' ? 'PDF' : templateId === 'monthly' ? 'Monthly' : 'Theft'
		const summary =
			scope === 'area'
				? 'Area report compiled with spatial loss markers and inspection notes.'
				: templateId === 'monthly'
					? 'Monthly report compiled with loss trends and anomaly clusters.'
					: 'Theft summary compiled with suspicious-loss evidence and follow-up actions.'

		setReports((currentReports) => [
			{
				id: Date.now(),
				title: `${scope === 'area' ? 'Area' : 'Monthly'} ${label}`,
				description: summary,
				type: scope === 'area' ? 'Area report' : label,
			},
			...currentReports,
		])
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route
					element={
						<AppShell
							theme={theme}
							onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
							onSimulateTheft={handleSimulateTheft}
							notificationsEnabled={notificationsEnabled}
							latestAlert={latestAlert}
							onOpenAlerts={() => setActiveArea(alerts[0] ? regions.find((region) => region.id === alerts[0].regionId) || null : null)}
						/>
					}
				>
					<Route
						path="/dashboard"
						element={
							<DashboardPage
								metrics={metrics}
								regions={classifiedRegions}
								alerts={alerts}
								onOpenArea={openArea}
							/>
						}
					/>
					<Route path="/heatmap" element={<HeatmapPage regions={classifiedRegions} onOpenArea={openArea} />} />
					<Route path="/analytics" element={<AnalyticsPage regions={classifiedRegions} />} />
					<Route path="/alerts" element={<AlertsPage alerts={alerts} onOpenArea={openArea} />} />
					<Route
						path="/reports"
						element={
							<ReportsPage
								reports={reports}
								onGenerateReport={handleReportGenerate}
								latestAlert={latestAlert}
							/>
						}
					/>
					<Route path="/predictions" element={<PredictionsPage regions={classifiedRegions} />} />
					<Route
						path="/settings"
						element={
							<SettingsPage
								theme={theme}
								onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
								alertThreshold={alertThreshold}
								onThresholdChange={setAlertThreshold}
								notificationsEnabled={notificationsEnabled}
								onToggleNotifications={() => setNotificationsEnabled((current) => !current)}
							/>
						}
					/>
					<Route path="*" element={<Navigate to="/dashboard" replace />} />
				</Route>
			</Routes>
			<AnimatePresence>
				{activeArea ? <AreaModal area={activeArea} onClose={closeArea} /> : null}
			</AnimatePresence>
		</BrowserRouter>
	)
}

function LandingPage() {
	const navigate = useNavigate()

	function handleEnter(event) {
		event.preventDefault()
		navigate('/dashboard')
	}

	return (
		<main className="landing-shell">
			<section className="landing-hero">
				<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
					<div className="brand-badge">POWERLEAK AI / GOVERNMENT MONITORING</div>
					<h1>Intelligent Electricity Loss Detection Platform</h1>
					<p className="landing-copy">
						Detect, predict, and visualize electricity theft and transmission losses in real time with a futuristic
						control-room interface.
					</p>
					<div className="landing-actions">
						<button type="button" className="primary-button" onClick={() => navigate('/dashboard')}>
							Launch Dashboard
						</button>
						<button type="button" className="secondary-button" onClick={() => navigate('/heatmap')}>
							View Demo
						</button>
					</div>
					<div className="landing-stats">
						<article>
							<span>Active Regions</span>
							<strong>124</strong>
						</article>
						<article>
							<span>Theft Alerts</span>
							<strong>43</strong>
						</article>
						<article>
							<span>Energy Saved</span>
							<strong>2.1M kWh</strong>
						</article>
					</div>
				</motion.div>

				<div className="landing-login-card">
					<div className="panel-head">
						<div>
							<p className="eyebrow">Officer access</p>
							<h2>Secure login</h2>
						</div>
						<span className="status-chip success">Demo ready</span>
					</div>
					<form className="login-form" onSubmit={handleEnter}>
						<label>
							Officer ID
							<input defaultValue="OFFICER-07" />
						</label>
						<label>
							Access token
							<input defaultValue="POWER-SECURE-2026" type="password" />
						</label>
						<button type="submit" className="primary-button wide-button">
							Enter Control Room
						</button>
					</form>
					<div className="landing-note">
						Dashboard cards, alerts, analytics, reports, and predictions are all linked for a smooth investigation flow.
					</div>
				</div>
			</section>

			<section className="landing-visual-panel">
				<div className="panel-head">
					<div>
						<p className="eyebrow">Live overview</p>
						<h2>India map glowing with active routing lines</h2>
					</div>
					<span className="status-chip warning">Blinking anomalies</span>
				</div>
				<div className="landing-visual-map">
					<div className="map-silhouette" />
					{dashboardSignals.map((signal) => (
						<motion.button
							key={signal.id}
							type="button"
							className={`signal-node ${signal.status}`}
							style={{ left: signal.x, top: signal.y }}
							animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
							transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
							onClick={() => navigate(`/heatmap?area=${signal.id}`)}
						>
							<span />
							{signal.label}
						</motion.button>
					))}
				</div>
				<div className="landing-feature-grid">
					{landingFeatures.map((feature) => {
						const Icon = feature.icon

						return (
							<article key={feature.title} className="feature-card">
								<Icon size={18} />
								<h3>{feature.title}</h3>
								<p>{feature.description}</p>
							</article>
						)
					})}
				</div>
			</section>
		</main>
	)
}

function AppShell({ theme, onToggleTheme, onSimulateTheft, notificationsEnabled, latestAlert }) {
	const navigate = useNavigate()
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

function DashboardPage({ metrics, regions, alerts, onOpenArea }) {
	const navigate = useNavigate()
	const topRegions = regions.slice().sort((left, right) => right.loss - left.loss).slice(0, 6)
	const usageTrend = [72, 80, 76, 90, 94, 101, 117]
	const hourlyLoad = [16, 18, 21, 24, 28, 36, 41, 48, 52, 57, 49, 43]

	return (
		<div className="page-stack">
			<section className="dashboard-stats-grid">
				{[
					{ label: 'Total Consumption', value: `${formatMetric(metrics.totalConsumption)} GW`, icon: CircleGauge, trend: '↑ 6.4%' },
					{ label: 'Power Loss', value: `${metrics.powerLoss}%`, icon: Activity, trend: '↓ 2.1%' },
					{ label: 'Theft Cases', value: alerts.length.toString(), icon: AlertTriangle, trend: '↑ 8' },
					{ label: 'High Risk Areas', value: metrics.highRiskAreas.toString(), icon: ShieldAlert, trend: '↑ 3' },
				].map((card, index) => {
					const Icon = card.icon

					return (
						<motion.button
							key={card.label}
							type="button"
							className="metric-card metric-card-compact"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							onClick={() => navigate(index === 0 ? '/heatmap' : index === 1 ? '/analytics' : index === 2 ? '/alerts' : '/heatmap?risk=high')}
						>
							<div className="metric-topline">
								<span>{card.label}</span>
								<Icon size={18} />
							</div>
							<strong>{card.value}</strong>
							<small>{card.trend}</small>
						</motion.button>
					)
				})}
			</section>

			<section className="dashboard-main-grid">
				<article className="panel heatmap-panel-large">
					<div className="panel-head">
						<div>
							<p className="eyebrow">India heatmap</p>
							<h2>Large interactive loss map</h2>
						</div>
						<span className="status-chip danger">Delhi in red</span>
					</div>
					<div className="heatmap-stage">
						<div className="heatmap-glow" />
						{dashboardSignals.map((signal) => (
							<motion.button
								key={signal.id}
								type="button"
								className={`signal-node dashboard-node ${signal.status}`}
								style={{ left: signal.x, top: signal.y }}
								whileHover={{ scale: 1.08 }}
								onClick={() => onOpenArea(regions.find((region) => region.id === signal.id) || regions[0])}
							>
								<span />
								{signal.label}
							</motion.button>
						))}
					</div>
					<div className="heatmap-legend">
						<span className="legend normal">Normal</span>
						<span className="legend suspicious">Suspicious</span>
						<span className="legend high">High Risk</span>
					</div>
				</article>

				<article className="panel chart-panel">
					<div className="panel-head">
						<div>
							<p className="eyebrow">Expected vs actual</p>
							<h2>Usage drift over time</h2>
						</div>
						<span className="status-chip warning">Line chart</span>
					</div>
					<LineChart values={usageTrend} accent="#3B82F6" />
				</article>

				<article className="panel chart-panel">
					<div className="panel-head">
						<div>
							<p className="eyebrow">Hourly consumption</p>
							<h2>Night anomaly detection</h2>
						</div>
						<span className="status-chip success">Bar chart</span>
					</div>
					<BarChart values={hourlyLoad} accent="#FACC15" />
				</article>
			</section>

			<section className="dashboard-bottom-grid">
				<article className="panel alerts-panel">
					<div className="panel-head">
						<div>
							<p className="eyebrow">Alert panel</p>
							<h2>Suspicious areas</h2>
						</div>
						<button type="button" className="ghost-button" onClick={() => navigate('/alerts')}>
							View all alerts
						</button>
					</div>
					<div className="alert-stack">
						{alerts.slice(0, 3).map((alert) => (
							<button type="button" key={alert.id} className="alert-card" onClick={() => navigate(`/alerts?focus=${alert.id}`)}>
								<div>
									<strong>{alert.area}</strong>
									<span>{alert.detail}</span>
								</div>
								<span className={`status-chip ${alert.status === 'Pending' ? 'danger' : 'success'}`}>
									{alert.risk}
								</span>
							</button>
						))}
					</div>
				</article>

				<article className="panel suspicious-panel">
					<div className="panel-head">
						<div>
							<p className="eyebrow">High risk areas</p>
							<h2>Geo hotspots</h2>
						</div>
						<span className="status-chip neutral">Sector watch</span>
					</div>
					<div className="top-area-grid">
						{topRegions.map((region) => (
							<button type="button" key={region.id} className={`top-area-card ${region.risk}`} onClick={() => onOpenArea(region)}>
								<strong>{region.city}</strong>
								<span>{region.sector}</span>
								<small>{region.loss}% loss</small>
							</button>
						))}
					</div>
				</article>
			</section>
		</div>
	)
}

function HeatmapPage({ regions, onOpenArea }) {
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
						<h3>{formatRisk(selected.risk)}</h3>
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

function AnalyticsPage({ regions }) {
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

function AlertsPage({ alerts, onOpenArea }) {
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

function ReportsPage({ reports, onGenerateReport, latestAlert }) {
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

function PredictionsPage({ regions }) {
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
						<LineChart values={predictedSeries} accent="#f472b6" />
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

function SettingsPage({ theme, onToggleTheme, alertThreshold, onThresholdChange, notificationsEnabled, onToggleNotifications }) {
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

					<article className="setting-card">
						<div className="setting-row">
							<strong>User management</strong>
							<span>3 roles</span>
						</div>
						<p>Supervisors, analysts, and field officers can be assigned to different page flows.</p>
						<div className="role-row">
							<span>Supervisor</span>
							<span>Analyst</span>
							<span>Field officer</span>
						</div>
					</article>
				</div>
			</section>
		</div>
	)
}

function LineChart({ values, accent }) {
	const gradientId = useId()
	const path = chartPath(values)

	return (
		<svg className="chart-svg" viewBox="0 0 420 180" role="img" aria-label="Line chart">
			<defs>
				<linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor={accent} stopOpacity="0.45" />
					<stop offset="100%" stopColor={accent} stopOpacity="0" />
				</linearGradient>
			</defs>
			<path d={`${path} L 404,164 L 16,164 Z`} fill={`url(#${gradientId})`} />
			<path d={path} fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
			{values.map((value, index) => {
				const step = (420 - 32) / (values.length - 1 || 1)
				const x = 16 + index * step
				const min = Math.min(...values)
				const max = Math.max(...values)
				const range = max - min || 1
				const y = 164 - ((value - min) / range) * 132

				return <circle key={`${value}-${index}`} cx={x} cy={y} r="4.5" fill="#fff" opacity="0.95" />
			})}
		</svg>
	)
}

function AreaChart({ values, accent }) {
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

function BarChart({ values, accent }) {
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

function AreaModal({ area, onClose }) {
	const navigate = useNavigate()

	return (
		<motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<motion.div
				className="modal-card"
				initial={{ y: 24, opacity: 0, scale: 0.98 }}
				animate={{ y: 0, opacity: 1, scale: 1 }}
				exit={{ y: 16, opacity: 0, scale: 0.98 }}
				transition={{ type: 'spring', stiffness: 260, damping: 24 }}
			>
				<div className="panel-head">
					<div>
						<p className="eyebrow">Area details</p>
						<h2>{area.name}</h2>
					</div>
					<button type="button" className="ghost-button" onClick={onClose}>
						Close
					</button>
				</div>

				<div className="modal-metrics">
					<div>
						<span>Expected usage</span>
						<strong>{area.expected} MW</strong>
					</div>
					<div>
						<span>Actual usage</span>
						<strong>{area.usage} MW</strong>
					</div>
					<div>
						<span>Loss %</span>
						<strong>{area.loss}%</strong>
					</div>
					<div>
						<span>Risk level</span>
						<strong>{formatRisk(area.risk)}</strong>
					</div>
				</div>

				<div className="modal-graph">
					<LineChart values={area.trend} accent="#ef4444" />
				</div>

				<div className="detail-actions modal-actions">
					<button type="button" className="primary-button" onClick={() => navigate('/reports')}>
						Generate Report
					</button>
					<button type="button" className="secondary-button" onClick={() => navigate('/alerts')}>
						Send Inspection Team
					</button>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default App
