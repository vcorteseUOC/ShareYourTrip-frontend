import React, { useState, useEffect } from 'react'
import { differenceInDays, addDays } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import fondocabecera from '../../assets/fondocabecera.png'
import AuthRequiredModal from '../common/AuthRequiredModal'
import BookingConfirmationModal from '../form/BookingConfirmationModal'
import { useAuth } from '../../context/AuthContext'
import { bookingService } from '../../services/bookingService'

const BookingForm = ({ accommodation, isCurrentUserHost = false, initialCheckIn, initialCheckOut, onDatesChange, availableDates = [] }) => {
  const { user } = useAuth()
  const [checkIn, setCheckIn] = useState(initialCheckIn ? new Date(initialCheckIn) : null)
  const [checkOut, setCheckOut] = useState(initialCheckOut ? new Date(initialCheckOut) : null)
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (isCurrentUserHost) {
    return null
  }

  // Notificar al padre cuando cambian las fechas (solo cuando checkOut cambia)
  useEffect(() => {
    if (onDatesChange && checkOut) {
      const checkInStr = checkIn ? checkIn.toISOString().split('T')[0] : null
      const checkOutStr = checkOut ? checkOut.toISOString().split('T')[0] : null
      
      // Solo notificar si las fechas son diferentes a las props actuales
      if (checkInStr !== initialCheckIn || checkOutStr !== initialCheckOut) {
        onDatesChange(checkInStr, checkOutStr)
      }
    }
  }, [checkOut, onDatesChange, initialCheckIn, initialCheckOut])

  // Custom styles for DatePicker
  const customStyles = `
    .react-datepicker-wrapper {
      width: 100%;
    }
    .react-datepicker__input-container input {
      width: 100%;
      border-radius: 8px;
      border: 2px solid #e0e0e0;
      padding: 0.75rem 1rem;
      font-size: 1.125rem;
      cursor: pointer;
    }
    .react-datepicker__input-container input:focus {
      outline: none;
      border-color: #f95a13;
      box-shadow: 0 0 0 0.2rem rgba(249, 90, 19, 0.15);
    }
    .react-datepicker__day--selected {
      background-color: #f95a13 !important;
      border-radius: 50%;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: #f95a13 !important;
      border-radius: 50%;
    }
    .react-datepicker__day:hover {
      background-color: rgba(249, 90, 19, 0.1) !important;
      border-radius: 50%;
    }
    .react-datepicker__current-month {
      color: #f95a13;
      font-weight: bold;
    }
    .react-datepicker__day--disabled {
      background-color: #f8f9fa !important;
      color: #999 !important;
      opacity: 0.5;
      cursor: not-allowed;
    }
    .react-datepicker__day--disabled:hover {
      background-color: #f8f9fa !important;
      opacity: 0.5;
    }
  `

  const isDateAvailable = (date) => {
    if (!availableDates || availableDates.length === 0) return false
    // Normalizar ambas fechas a medianoche para comparación correcta
    const normalizedDate = new Date(date)
    normalizedDate.setHours(0, 0, 0, 0)
    
    return availableDates.some(availableDate => {
      const normalizedAvailable = new Date(availableDate)
      normalizedAvailable.setHours(0, 0, 0, 0)
      return normalizedAvailable.getTime() === normalizedDate.getTime()
    })
  }

  const getExcludeDates = () => {
    // Si tenemos availableDates, excluimos todas las fechas que NO están en esa lista
    // Pero como no es práctico, usamos dayClassName para marcar visualmente
    return []
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    return differenceInDays(checkOut, checkIn)
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    return nights * accommodation.price
  }

  const handleCheckInChange = (date) => {
    setCheckIn(date)
    if (checkOut && date >= checkOut) {
      setCheckOut(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit ejecutado')
    console.log('user:', user)
    // Verificar si el usuario está autenticado
    if (!user) {
      console.log('Usuario no autenticado, mostrando modal de autenticación')
      setShowAuthModal(true)
      return
    }
    
    console.log('Mostrando modal de confirmación')
    // Mostrar modal de confirmación
    setShowConfirmationModal(true)
  }

  const handleConfirmBooking = async () => {
    setSubmitting(true)
    try {
      // Convertir fechas Date a formato string para el backend
      const startDate = checkIn ? checkIn.toISOString().split('T')[0] : null
      const endDate = checkOut ? checkOut.toISOString().split('T')[0] : null

      const bookingData = {
        accommodationId: accommodation.id,
        travelerId: user.id,
        hostId: accommodation.hostId,
        startDate: startDate,
        endDate: endDate,
        guestsCount: guests,
        message: message || null
      }

      await bookingService.createBooking(bookingData)
      
      setShowConfirmationModal(false)
      setShowSuccess(true)
      
      // Limpiar formulario
      setCheckIn(null)
      setCheckOut(null)
      setGuests(1)
      setMessage('')
      
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error al crear reserva:', error)
      setErrorMessage('Error al crear reserva. Por favor, intenta de nuevo.')
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogin = () => {
    // Redirigir a login
    window.location.href = '/login'
  }

  return (
    <>
      <style>{customStyles}</style>
      <section id="booking-form" className="py-5" style={{ 
        backgroundImage: `url(${fondocabecera})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div className="row g-0">
                {/* Left Column - Form */}
                <div className="col-lg-8 bg-white">
                  <div className="p-5">
                    <h2 className="fw-bold mb-4" style={{ color: '#f95a13' }}>
                      Solicita tu estancia
                    </h2>
                    <p className="text-muted mb-4">
                      Completa el formulario para enviar tu solicitud de reserva al anfitrión.
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-muted small">
                            CHECK-IN
                          </label>
                          <DatePicker
                            selected={checkIn}
                            onChange={handleCheckInChange}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="form-control form-control-lg"
                            placeholderText="Selecciona fecha"
                            excludeDates={getExcludeDates()}
                            dayClassName={(date) => !isDateAvailable(date) ? 'react-datepicker__day--disabled' : undefined}
                            calendarClassName="shadow-lg"
                            style={{ borderRadius: '8px', border: '2px solid #e0e0e0' }}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-muted small">
                            CHECK-OUT
                          </label>
                          <DatePicker
                            selected={checkOut}
                            onChange={setCheckOut}
                            minDate={checkIn ? addDays(checkIn, 1) : new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="form-control form-control-lg"
                            placeholderText="Selecciona fecha"
                            excludeDates={getExcludeDates()}
                            dayClassName={(date) => !isDateAvailable(date) ? 'react-datepicker__day--disabled' : undefined}
                            calendarClassName="shadow-lg"
                            disabled={!checkIn}
                            style={{ borderRadius: '8px', border: '2px solid #e0e0e0' }}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-muted small">
                            HUÉSPEDES
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-white" style={{ border: '2px solid #e0e0e0', borderRight: 'none', borderRadius: '8px 0 0 8px' }}>
                              <i className="bi bi-person text-muted"></i>
                            </span>
                            <select
                              className="form-select form-select-lg"
                              style={{ borderRadius: '0 8px 8px 0', border: '2px solid #e0e0e0', borderLeft: 'none' }}
                              value={guests}
                              onChange={(e) => setGuests(parseInt(e.target.value))}
                              required
                            >
                              {[...Array(Math.min(accommodation.availableSpots, accommodation.totalGuests))].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1} huésped{i !== 0 ? 'es' : ''}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-muted small">
                            NOCHES
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-white" style={{ border: '2px solid #e0e0e0', borderRight: 'none', borderRadius: '8px 0 0 8px' }}>
                              <i className="bi bi-moon text-muted"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              style={{ borderRadius: '0 8px 8px 0', border: '2px solid #e0e0e0', borderLeft: 'none' }}
                              value={calculateNights() > 0 ? calculateNights() : ''}
                              placeholder="0"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-semibold text-muted small">
                            MENSAJE AL ANFITRIÓN (OPCIONAL)
                          </label>
                          <textarea
                            className="form-control"
                            style={{ borderRadius: '8px', border: '2px solid #e0e0e0', resize: 'none' }}
                            rows="3"
                            placeholder="Presenta brevemente a tu grupo y el motivo de tu viaje..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right Column - Price Summary */}
                <div className="col-lg-4 bg-light">
                  <div className="p-5 h-100 d-flex flex-column justify-content-center">
                    <h5 className="fw-bold mb-4">Resumen</h5>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Precio por noche</span>
                        <span className="fw-semibold">€{accommodation.price}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Noches</span>
                        <span className="fw-semibold">{calculateNights()}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Huéspedes</span>
                        <span className="fw-semibold">{guests}</span>
                      </div>
                      <hr className="my-3" />
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold fs-5">Total</span>
                        <span className="fw-bold fs-4" style={{ color: '#f95a13' }}>
                          €{calculateTotal()}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn w-100 py-3 fw-bold mt-auto"
                      style={{ 
                        backgroundColor: '#f95a13', 
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '1.1rem'
                      }}
                      disabled={!checkIn || !checkOut || calculateNights() <= 0 || (accommodation.availableSpots !== undefined && accommodation.availableSpots <= 0)}
                      onClick={handleSubmit}
                    >
                      Solicitar reserva
                    </button>

                    <p className="text-center text-muted small mt-3 mb-0">
                      No se realizará ningún cargo hasta que el anfitrión acepte tu solicitud.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AuthRequiredModal 
      show={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      onLogin={handleLogin}
    />

    <BookingConfirmationModal
      show={showConfirmationModal}
      onClose={() => setShowConfirmationModal(false)}
      onConfirm={handleConfirmBooking}
      accommodation={accommodation}
      checkIn={checkIn}
      checkOut={checkOut}
      guests={guests}
      message={message}
      totalPrice={calculateTotal()}
    />

    {showSuccess && (
      <div 
        className="alert alert-success position-fixed m-3" 
        style={{ 
          bottom: '0', 
          right: '0', 
          zIndex: 9999,
          minWidth: '300px'
        }}
        role="alert"
      >
        <i className="bi bi-check-circle me-2"></i>
        Solicitud de reserva enviada correctamente
      </div>
    )}

    {showError && (
      <div 
        className="alert alert-danger position-fixed m-3" 
        style={{ 
          bottom: '0', 
          right: '0', 
          zIndex: 9999,
          minWidth: '300px'
        }}
        role="alert"
      >
        <i className="bi bi-exclamation-triangle me-2"></i>
        {errorMessage}
      </div>
    )}
    </>
  )
}

export default BookingForm
