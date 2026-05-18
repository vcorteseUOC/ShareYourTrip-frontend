import React from 'react'

const MapLocationComponent = ({ formData, onOpenMap }) => {
  return (
    <div className="d-flex align-items-center gap-3 p-3 rounded mb-3 map-location-card">
      <div className="d-flex align-items-center justify-content-center flex-shrink-0 map-location-icon color-shareyourtrip">
        <i className="bi bi-geo-alt-fill"></i>
      </div>
      <div className="overflow-hidden flex-grow-1">
        <div className="fw-semibold text-truncate small">{formData.addressLine || 'Dirección no especificada'}</div>
        <div className="text-muted map-location-subtitle">
          {[formData.city, formData.country].filter(Boolean).join(', ')}
          {formData.postalCode && ` · ${formData.postalCode}`}
        </div>
      </div>
      <button
        type="button"
        className="btn btn-sm flex-shrink-0 map-location-btn"
        onClick={onOpenMap}
      >
        <i className="bi bi-map me-1"></i>Ver mapa
      </button>
    </div>
  )
}

export default MapLocationComponent
