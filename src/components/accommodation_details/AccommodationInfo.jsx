import React from 'react'

const AccommodationInfo = ({ 
  accommodation, 
  showTitleTooltip, 
  setShowTitleTooltip, 
  setShowMapModal, 
  scrollToBookingForm, 
  showServicesInfo, 
  setShowServicesInfo,
  isCurrentUserHost = false
}) => {
  return (
    <>
      {/* Title and Location */}
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-2 d-flex align-items-center gap-2">
          Alójate con {accommodation.hostName?.split(' ')[0]}
          <div 
            className="position-relative d-inline-block"
            onMouseEnter={() => setShowTitleTooltip(true)}
            onMouseLeave={() => setShowTitleTooltip(false)}
          >
            <i className="bi bi-info-circle text-muted title-tooltip-icon" style={{ cursor: 'pointer' }}></i>
            {showTitleTooltip && (
              <div 
                className="position-absolute bg-dark text-white p-3 rounded shadow-lg title-tooltip"
                style={{ 
                  top: '100%', 
                  left: '0', 
                  marginTop: '8px',
                  minWidth: '250px',
                  zIndex: 1000
                }}
              >
                <p className="mb-0">
                  La disponibilidad se basa en los filtros de fechas seleccionados. Si no hay filtros, se muestra la disponibilidad actual.
                </p>
              </div>
            )}
          </div>
        </h1>
        <p className="text-muted mb-2 fw-semibold">{accommodation.title}</p>
        <p className="text-muted mb-2">
          <i className="bi bi-geo-alt me-2"></i>
          {accommodation.location}
        </p>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-1">
            <i className="bi bi-star-fill text-warning"></i>
            <span className="fw-semibold">{accommodation.rating}</span>
          </div>
          <span className="text-muted">({accommodation.reviews} reseñas)</span>
        </div>
      </div>

      {/* Quick Info */}
      <div className="card shadow mb-4 border-0">
        <div className="card-body p-4">
          <div className="row g-4 align-items-center">
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0"
                  style={{ 
                    width: '48px', 
                    height: '48px',
                    backgroundColor: accommodation.availableSpots > 1 ? '#198754' : '#ffc107',
                    fontSize: '1.25rem'
                  }}
                >
                  {accommodation.availableSpots}
                </div>
                <div>
                  <div className="fw-semibold">de {accommodation.totalGuests}</div>
                  <div className="text-muted small">plazas libres</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-geo-alt fs-3 text-muted flex-shrink-0"></i>
                <div>
                  <div className="fw-semibold">{accommodation.location}</div>
                  <button 
                    className="btn btn-link p-0 text-muted small"
                    onClick={() => setShowMapModal(true)}
                  >
                    Ver en mapa
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-end gap-3">
                <div className="text-end">
                  <div className="fw-bold color-shareyourtrip" style={{ fontSize: '1.25rem' }}>
                    €{accommodation.price}
                  </div>
                  <div className="text-muted small">/noche</div>
                </div>
                {!isCurrentUserHost && (
                  <button 
                    className="btn btn-action px-4 py-2"
                    onClick={scrollToBookingForm}
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Reservar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="card shadow mb-4 border-0">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <h5 className="fw-bold mb-0">Sobre este alojamiento</h5>
            <button 
              className="btn btn-link p-0"
              style={{ color: '#f95a13' }}
              onClick={() => setShowServicesInfo(!showServicesInfo)}
            >
              <i className="bi bi-info-circle fs-5"></i>
            </button>
          </div>

          {showServicesInfo && (
            <div className="alert alert-info py-2 mb-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-circle-fill" style={{ color: '#f95a13', fontSize: '0.75rem' }}></i>
                <small className="mb-0">Servicio disponible</small>
                <i className="bi bi-circle-fill text-muted ms-3" style={{ fontSize: '0.75rem', opacity: 0.4 }}></i>
                <small className="mb-0">Servicio no disponible</small>
              </div>
            </div>
          )}
          
          <div className="row g-4">
            <div className="col-md-7">
              <p className="text-muted mb-0">{accommodation.description}</p>
            </div>
            
            <div className="col-md-5">
              <div className="row g-3 justify-content-center">
                <div className="col-6">
                  <div className="text-center" title="Wifi">
                    <i 
                      className={`bi bi-wifi ${accommodation.services.wifi ? '' : 'text-muted'}`}
                      style={{ 
                        fontSize: '2.5rem',
                        color: accommodation.services.wifi ? '#f95a13' : '',
                        opacity: accommodation.services.wifi ? 1 : 0.4
                      }}
                    ></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center" title="Lavadora">
                    <i 
                      className={`bi bi-water ${accommodation.services.lavadora ? '' : 'text-muted'}`}
                      style={{ 
                        fontSize: '2.5rem',
                        color: accommodation.services.lavadora ? '#f95a13' : '',
                        opacity: accommodation.services.lavadora ? 1 : 0.4
                      }}
                    ></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center" title="Aire acondicionado">
                    <i 
                      className={`bi bi-snow ${accommodation.services.aireAcondicionado ? '' : 'text-muted'}`}
                      style={{ 
                        fontSize: '2.5rem',
                        color: accommodation.services.aireAcondicionado ? '#f95a13' : '',
                        opacity: accommodation.services.aireAcondicionado ? 1 : 0.4
                      }}
                    ></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center" title="Cocina">
                    <i 
                      className={`bi bi-egg-fried ${accommodation.services.cocina ? '' : 'text-muted'}`}
                      style={{ 
                        fontSize: '2.5rem',
                        color: accommodation.services.cocina ? '#f95a13' : '',
                        opacity: accommodation.services.cocina ? 1 : 0.4
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* House Rules */}
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Normas de la casa</h5>
          <p className="text-muted mb-0">{accommodation.houseRules}</p>
        </div>
      </div>
    </>
  )
}

export default AccommodationInfo
