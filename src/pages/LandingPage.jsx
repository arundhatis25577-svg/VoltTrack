import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="landing-shell landing-start">
      <div className="landing-background" />
      <section className="landing-hero">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="hero-badge">ELECTRICITY MONITORING</div>
          <h1>PowerLeak AI</h1>
          <p className="landing-copy">Intelligent Electricity Theft & Loss Detection System</p>
          <div className="landing-actions">
            <button type="button" className="primary-button hero-button" onClick={() => navigate('/dashboard')}>
              GET STARTED
            </button>
            <button type="button" className="secondary-button hero-button" onClick={() => navigate('/analytics')}>
              LEARN MORE
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
