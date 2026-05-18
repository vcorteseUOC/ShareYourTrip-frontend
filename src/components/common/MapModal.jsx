import React from 'react'

const MapModal = ({ show, onClose, location, coordinates, address }) => {
  if (!show) return null

  return (
    <div 
      className="modal fade show" 
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Ubicación del alojamiento</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0">
            <div style={{ height: '500px', width: '100%' }}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
          <div className="modal-footer">
            <p className="text-muted mb-0 flex-grow-1">
              <i className="bi bi-geo-alt me-2"></i>
              {address}
            </p>
            <p className="text-muted mb-0">
              {location}
            </p>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapModal
