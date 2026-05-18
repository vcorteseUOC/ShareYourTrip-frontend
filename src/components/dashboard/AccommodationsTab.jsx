import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccommodationsTab } from '../../hooks/useAccommodationsTab'
import { useAuth } from '../../context/AuthContext'

const AccommodationsTab = ({ activeTab }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { accommodations, loading, error } = useAccommodationsTab(user, activeTab)
  const [hoveredId, setHoveredId] = useState(null)

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando alojamientos...</p>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>
  }

  return (
    <>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-5">
        <div>
          <h1 className="display-5 fw-bold mb-2">Mis Alojamientos</h1>
          <p className="text-muted mb-0">Gestiona tus alojamientos como anfitrión</p>
        </div>
      </div>

      <div className="row">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="col-md-6 col-lg-4 mb-4">
              <div
                className={`card shadow-sm h-100 accommodation-card${accommodation.status === 'INACTIVE' ? ' accommodation-card-inactive' : ''}`}
                onMouseEnter={() => setHoveredId(accommodation.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Badge estado */}
                {accommodation.status === 'INACTIVE' && (
                  <span className="position-absolute badge bg-secondary accommodation-card-badge">
                    <i className="bi bi-eye-slash me-1"></i>Inactivo
                  </span>
                )}

                {accommodation.coverImage ? (
                  <img
                    src={accommodation.coverImage}
                    alt={accommodation.title}
                    className="card-img-top accommodation-card-img"
                  />
                ) : (
                  <div className="accommodation-card-placeholder">
                    <i className="bi bi-house fs-1 text-muted"></i>
                  </div>
                )}

                {/* Overlay hover */}
                <div className={`accommodation-card-overlay${hoveredId === accommodation.id ? ' visible' : ''}`}>
                  <button
                    onClick={() => navigate(`/accommodation/${accommodation.id}`)}
                    title="Ver alojamiento"
                    className="accommodation-overlay-btn accommodation-overlay-btn-view"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    onClick={() => navigate(`/edit-accommodation/${accommodation.id}`)}
                    title="Editar alojamiento"
                    className="accommodation-overlay-btn accommodation-overlay-btn-edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>

                <div className="card-body">
                  <h5 className="card-title fw-semibold mb-1">{accommodation.title}</h5>
                  <p className="card-text text-muted small mb-2">
                    <i className="bi bi-geo-alt me-1"></i>
                    {accommodation.location}
                  </p>
                  <p className="card-text text-muted small mb-0">
                    {accommodation.description?.substring(0, 100)}...
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Tarjeta añadir nuevo */}
          <div className="col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm h-100 accommodation-add-card"
              onClick={() => navigate('/create-accommodation')}
            >
              <div className="text-center p-4">
                <div className="accommodation-add-icon">
                  <i className="bi bi-plus-lg color-shareyourtrip"></i>
                </div>
                <p className="fw-semibold mb-1 color-shareyourtrip">Nuevo alojamiento</p>
                <p className="text-muted small mb-0">Añade un nuevo piso a tu lista</p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AccommodationsTab