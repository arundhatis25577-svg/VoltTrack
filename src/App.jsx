import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppShell } from './components/AppShell'
import { AreaModal } from './components/AreaModal'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { HeatmapPage } from './pages/HeatmapPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { AlertsPage } from './pages/AlertsPage'
import { ReportsPage } from './pages/ReportsPage'
import { PredictionsPage } from './pages/PredictionsPage'
import { SettingsPage } from './pages/SettingsPage'
import { initialAlerts, initialFeed, initialRegions } from './data/dashboardData'
import { getRiskLevel } from './utils/chartUtils'

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

    const newAlert = {
      id: `AL-${Date.now().toString().slice(-4)}`,
      area: target.sector,
      city: target.city,
      risk: 'HIGH',
      time: 'just now',
      status: 'Pending',
      regionId: target.id,
      detail: `A simulated theft event raised the live loss signal in ${target.name}.`,
      recommendation: 'Send an inspection team and review the feeder logs immediately.',
    }

    setAlerts((currentAlerts) => [newAlert, ...currentAlerts])

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
            />
          }
        >
          <Route path="/dashboard" element={<DashboardPage metrics={metrics} regions={classifiedRegions} alerts={alerts} onOpenArea={openArea} />} />
          <Route path="/heatmap" element={<HeatmapPage regions={classifiedRegions} onOpenArea={openArea} />} />
          <Route path="/analytics" element={<AnalyticsPage regions={classifiedRegions} />} />
          <Route path="/alerts" element={<AlertsPage alerts={alerts} onOpenArea={openArea} />} />
          <Route path="/reports" element={<ReportsPage reports={reports} onGenerateReport={handleReportGenerate} latestAlert={latestAlert} />} />
          <Route path="/predictions" element={<PredictionsPage regions={classifiedRegions} />} />
          <Route path="/settings" element={<SettingsPage theme={theme} onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))} alertThreshold={alertThreshold} onThresholdChange={setAlertThreshold} notificationsEnabled={notificationsEnabled} onToggleNotifications={() => setNotificationsEnabled((current) => !current)} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      <AnimatePresence>{activeArea ? <AreaModal area={activeArea} onClose={closeArea} /> : null}</AnimatePresence>
    </BrowserRouter>
  )
}

export default App
