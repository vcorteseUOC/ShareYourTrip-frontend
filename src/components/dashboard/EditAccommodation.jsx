import React, { useState } from 'react'
import { useEditAccommodation } from '../../hooks/useEditAccommodation'
import { useNavigate } from 'react-router-dom'
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import Footer from '../layout/Footer'
import MapModal from '../common/MapModal'
import MapLocationComponent from '../form/MapLocationComponent'
import ServicesSelectorComponent from '../form/ServicesSelectorComponent'
import ImageSelectorComponent from '../form/ImageSelectorComponent'
import RoomTypeSelectorComponent from '../form/RoomTypeSelectorComponent'
import GuestSelectorComponent from '../form/GuestSelectorComponent'
import AvailableDatesSelectorComponent from '../form/AvailableDatesSelectorComponent'

const EditAccommodation = () => {
  const navigate = useNavigate()
  const {
    loading, error, submitting, deleting,
    formData, setFormData,
    images, coverIndex,
    isActive, setIsActive,
    availableDates, setAvailableDates,
    calendarMonth, setCalendarMonth,
    newImageUrl, setNewImageUrl,
    handleChange, handleAddImageUrl, handleRemoveImage, handleSetCover, handleSubmit, handleDelete,
    hasImages
  } = useEditAccommodation()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showToastError, setShowToastError] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    await handleDelete()
    setShowDeleteModal(false)
  }

  const onSubmit = async (e) => {
    const result = await handleSubmit(e)
    if (result?.success) {
      setShowSuccess(true)
      setTimeout(() => { setShowSuccess(false); window.location.reload() }, 2000)
    } else {
      setShowToastError(true)
      setTimeout(() => setShowToastError(false), 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 bg-light">
        <Header />
        <div className="d-flex">
          <Sidebar activeTab="accommodations" />
          <main className="flex-grow-1">
            <div className="container py-5">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light">
        <Header />
        <div className="d-flex">
          <Sidebar activeTab="accommodations" />
          <main className="flex-grow-1">
            <div className="container py-5">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
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
                <li className="breadcrumb-item active" aria-current="page">Editar alojamiento</li>
              </ol>
            </nav>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="fw-bold mb-0">Editar Alojamiento</h2>
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

                      {/* Tarjeta de ubicación con botón mapa */}
                      <MapLocationComponent formData={formData} onOpenMap={() => setShowMap(true)} />

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
                  className="btn btn-outline-secondary me-2"
                  onClick={() => navigate('/dashboard?tab=accommodations')}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger me-2"
                  onClick={openDeleteModal}
                  disabled={deleting || submitting}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar alojamiento'
                  )}
                </button>
                <button
                  type="submit"
                  className="btn btn-action"
                  disabled={submitting || deleting || !hasImages}
                  title={!hasImages ? 'Añade al menos una imagen para guardar' : ''}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Guardando...
                    </>
                  ) : (
                    'Guardar cambios'
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
          Alojamiento guardado correctamente
        </div>
      )}
      {showToastError && (
        <div
          className="alert alert-danger position-fixed m-3"
          style={{ bottom: '0', right: '0', zIndex: 9999, minWidth: '300px' }}
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2"></i>
          Error al guardar el alojamiento
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                  Confirmar eliminación
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-3">¿Estás seguro de que quieres eliminar este alojamiento?</p>
                <div className="alert alert-warning" role="alert">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  <strong>Importante:</strong> Esta acción podría afectar las reservas en curso de este alojamiento.
                </div>
                <p className="text-muted small mb-0">Esta acción no se puede deshacer.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar alojamiento'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default EditAccommodation
