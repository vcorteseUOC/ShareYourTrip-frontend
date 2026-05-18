import React from 'react'

const SERVICES = [
  { key: 'wifi', icon: 'bi-wifi', label: 'WiFi' },
  { key: 'washing', icon: 'bi-water', label: 'Lavadora' },
  { key: 'air', icon: 'bi-snow', label: 'Aire acond.' },
  { key: 'kitchen', icon: 'bi-egg-fried', label: 'Cocina' }
]

const ServicesSelectorComponent = ({ formData, setFormData }) => {
  return (
    <>
      <label className="form-label fw-semibold mb-3">Servicios</label>
      <div className="row g-2">
        {SERVICES.map(({ key, icon, label }) => (
          <div className="col-6" key={key}>
            <div
              className={`text-center p-3 rounded border h-100 service-card${formData[key] ? ' active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, [key]: !prev[key] }))}
            >
              <i className={`bi ${icon} service-card-icon`}></i>
              <div className="mt-2 small fw-semibold">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ServicesSelectorComponent
