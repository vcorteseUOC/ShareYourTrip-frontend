import React, { useState } from 'react'
import { useCreateAccommodation } from '../../hooks/useCreateAccommodation'
import { useNavigate } from 'react-router-dom'
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import Footer from '../layout/Footer'
import MapModal from '../common/MapModal'
import LocationSelectorComponent from '../form/LocationSelectorComponent'
import ServicesSelectorComponent from '../form/ServicesSelectorComponent'
import ImageSelectorComponent from '../form/ImageSelectorComponent'
import RoomTypeSelectorComponent from '../form/RoomTypeSelectorComponent'
import GuestSelectorComponent from '../form/GuestSelectorComponent'
import AvailableDatesSelectorComponent from '../form/AvailableDatesSelectorComponent'

const CreateAccommodation = () => {
  const navigate = useNavigate()
  const {
    error, submitting,
    formData, setFormData,
    images, coverIndex,
    isActive, setIsActive,
    availableDates, setAvailableDates,
    calendarMonth, setCalendarMonth,
    newImageUrl, setNewImageUrl,
    handleChange, handleAddImageUrl, handleRemoveImage, handleSetCover, handleSubmit,
    hasImages
  } = useCreateAccommodation()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showToastError, setShowToastError] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const onSubmit = async (e) => {
    const result = await handleSubmit(e)
    if (result?.success) {
      setShowSuccess(true)
      setTimeout(() => navigate('/dashboard?tab=accommodations'), 2000)
    } else {
      setShowToastError(true)
      setTimeout(() => setShowToastError(false), 3000)
    }
  }

  if (error && !submitting) {
    return (
      <div className="min-vh-100 bg-light">
        <Header />
        <div className="d-flex">
          <Sidebar activeTab="accommodations" />
          <main className="flex-grow-1">
            <div className="container py-5">
              <div className="alert alert-danger" role="alert">{error}</div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-vh-100 bg-light">
      <Header />
      <div className="d-flex">
        <Sidebar activeTab="accommodations" />
        <main className="flex-grow-1">
          <div className="container py-5">

            {/* Nav de vuelta */}
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <button
                    className="btn btn-link p-0 text-decoration-none color-shareyourtrip"
                    onClick={() => navigate('/dashboard?tab=accommodations')}
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    Mis alojamientos
                  </button>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Nuevo alojamiento</li>
              </ol>
            </nav>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="fw-bold mb-0">Nuevo Alojamiento</h2>
              <div
                className={`status-toggle${isActive ? ' active' : ''}`}
                onClick={() => setIsActive(prev => !prev)}
                title={isActive ? 'Clic para desactivar' : 'Clic para activar'}
              >
                <div className="status-toggle__track">
                  <div className="status-toggle__thumb"></div>
                </div>
                <span className="status-toggle__label">
                  {isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit}>

              {/* Bloque 1: Información básica */}
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-white border-bottom py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="bi bi-info-circle me-2 color-shareyourtrip"></i>
                    Información básica
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-4">

                    {/* Columna izquierda: título, ubicación, precio */}
                    <div className="col-lg-7">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-semibold">Título *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Selector de ubicación */}
                      <LocationSelectorComponent formData={formData} setFormData={setFormData} onOpenMap={() => setShowMap(true)} />

                      <div className="mb-1">
                        <label htmlFor="pricePerNight" className="form-label fw-semibold">Precio por noche (€) *</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="pricePerNight"
                          name="pricePerNight"
                          value={formData.pricePerNight}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Columna derecha: servicios */}
                    <div className="col-lg-5">
                      <ServicesSelectorComponent formData={formData} setFormData={setFormData} />
                    </div>

                  </div>
                </div>
              </div>

              {/* Bloque 2: Detalles */}
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-white border-bottom py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="bi bi-card-text me-2 color-shareyourtrip"></i>
                    Detalles
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-4">

                    {/* Columna izquierda: Galería de imágenes */}
                    <div className="col-lg-6">
                      <ImageSelectorComponent
                        images={images}
                        coverIndex={coverIndex}
                        newImageUrl={newImageUrl}
                        setNewImageUrl={setNewImageUrl}
                        onSetCover={handleSetCover}
                        onRemoveImage={handleRemoveImage}
                        onAddImageUrl={handleAddImageUrl}
                      />
                    </div>

                    {/* Columna derecha: Descripción, tipo y reglas */}
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-semibold">Descripción *</label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          rows="5"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <RoomTypeSelectorComponent formData={formData} setFormData={setFormData} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="rules" className="form-label fw-semibold">Reglas de la casa</label>
                        <textarea
                          className="form-control"
                          id="rules"
                          name="rules"
                          rows="4"
                          value={formData.rules}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Bloque 3: Configuración de reservas */}
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-white border-bottom py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="bi bi-calendar3 me-2 color-shareyourtrip"></i>
                    Configuración de reservas
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-4">

                    {/* Columna izquierda: max huéspedes + leyenda */}
                    <div className="col-lg-4">
                      <GuestSelectorComponent formData={formData} setFormData={setFormData} />

                      {/* Leyenda */}
                      <div className="mt-2">
                        <p className="fw-semibold mb-2 small">Leyenda</p>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="calendar-legend-dot calendar-legend-dot-available"></div>
                          <span className="small text-muted">Disponible</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="calendar-legend-dot calendar-legend-dot-unavailable"></div>
                          <span className="small text-muted">No disponible</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="calendar-legend-dot calendar-legend-dot-today"></div>
                          <span className="small text-muted">Hoy</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <div className="calendar-legend-dot calendar-legend-dot-past"></div>
                          <span className="small text-muted">Pasado</span>
                        </div>
                        <p className="text-muted small mt-3 mb-0">
                          <i className="bi bi-hand-index me-1"></i>
                          Clic para alternar disponibilidad
                        </p>
                      </div>
                    </div>

                    {/* Columna derecha: Calendario */}
                    <div className="col-lg-8">
                      <AvailableDatesSelectorComponent
                        availableDates={availableDates}
                        setAvailableDates={setAvailableDates}
                        calendarMonth={calendarMonth}
                        setCalendarMonth={setCalendarMonth}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/dashboard?tab=accommodations')}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-action"
                  disabled={submitting || !hasImages}
                  title={!hasImages ? 'Añade al menos una imagen para publicar' : ''}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Publicando...
                    </>
                  ) : (
                    'Publicar alojamiento'
                  )}
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>

      {/* Toasts */}
      {showSuccess && (
        <div
          className="alert alert-success position-fixed m-3"
          style={{ bottom: '0', right: '0', zIndex: 9999, minWidth: '300px' }}
          role="alert"
        >
          <i className="bi bi-check-circle me-2"></i>
          Alojamiento publicado correctamente
        </div>
      )}
      {showToastError && (
        <div
          className="alert alert-danger position-fixed m-3"
          style={{ bottom: '0', right: '0', zIndex: 9999, minWidth: '300px' }}
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2"></i>
          Error al publicar el alojamiento
        </div>
      )}

      {/* MapModal */}
      {showMap && (
        <MapModal
          show={showMap}
          onClose={() => setShowMap(false)}
          location={`${formData.city}, ${formData.country}`}
          coordinates={{ lat: formData.latitude || 0, lng: formData.longitude || 0 }}
          address={formData.addressLine}
        />
      )}

      <Footer />
    </div>
  )
}

export default CreateAccommodation
