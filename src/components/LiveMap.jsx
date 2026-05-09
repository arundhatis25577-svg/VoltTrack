import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { indiaRegionCoordinates } from '../data/dashboardData'

const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.setIcon(defaultIcon)

export function LiveMap({ regions }) {
  const indiaCenter = [20.5937, 78.9629]

  return (
    <MapContainer center={indiaCenter} zoom={5} className="leaflet-map-container" scrollWheelZoom>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
      {regions.map((region) => {
        const coords = indiaRegionCoordinates[region.id]
        if (!coords) return null

        const riskColor = region.loss >= 25 ? '#dc2626' : region.loss >= 18 ? '#f97316' : '#22c55e'

        return (
          <Marker
            key={region.id}
            position={coords}
            icon={L.icon({
              iconUrl: `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22${riskColor.replace('#', '%23')}%22%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%2210%22/%3E%3C/svg%3E`,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
              popupAnchor: [0, -14],
            })}
          >
            <Popup>
              <div style={{ fontSize: '0.85rem' }}>
                <strong>{region.city}</strong>
                <br />
                {region.sector}
                <br />
                <span style={{ color: riskColor }}>Loss: {region.loss}%</span>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
