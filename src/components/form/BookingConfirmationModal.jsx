import React from 'react'

const BookingConfirmationModal = ({ 
  show, 
  onClose, 
  onConfirm, 
  accommodation, 
  checkIn, 
  checkOut, 
  guests, 
  message, 
  totalPrice 
}) => {
  if (!show) return null

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  const formatDate = (date) => {
    if (!date) return 'No seleccionada'
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const nights = checkIn && checkOut 
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Confirmar reserva</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="alert alert-info" role="alert">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Importante:</strong> Esta reserva deberá ser aprobada por el anfitrión antes de confirmarse.
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Detalles de la reserva</h6>
                <div className="bg-light p-3 rounded">
                  <div className="mb-2">
                    <small className="text-muted">Alojamiento</small>
                    <p className="fw-semibold mb-0">{accommodation?.title || 'Alojamiento'}</p>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <small className="text-muted">Check-in</small>
                      <p className="fw-semibold mb-0">{formatDate(checkIn)}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Check-out</small>
                      <p className="fw-semibold mb-0">{formatDate(checkOut)}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <small className="text-muted">Huéspedes</small>
                      <p className="fw-semibold mb-0">{guests}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Noches</small>
                      <p className="fw-semibold mb-0">{nights}</p>
                    </div>
                  </div>
                  {message && (
                    <div className="mb-2">
                      <small className="text-muted">Mensaje</small>
                      <p className="fw-semibold mb-0">{message}</p>
                    </div>
                  )}
                  <div className="border-top pt-2 mt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Total</span>
                      <span className="fw-bold color-shareyourtrip fs-5">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-action"
                onClick={onConfirm}
              >
                Confirmar reserva
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingConfirmationModal
