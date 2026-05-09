import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LineChart } from './charts/LineChart'
import { formatRisk } from '../utils/chartUtils'

export function AreaModal({ area, onClose }) {
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
