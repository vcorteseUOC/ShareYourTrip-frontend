import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import UserAvatar from './UserAvatar'
import { reviewService } from '../../services/reviewService'

const ReviewModal = ({ show, onClose, userToReview, bookingInfo, reviewType, onReviewSubmitted }) => {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (!show || !userToReview || !bookingInfo) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (rating === 0 || !comment.trim()) {
      setErrorMessage('Por favor, selecciona una valoración y escribe un comentario.')
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setSubmitting(true)
    try {
      let reviewData
      if (reviewType === 'traveler') {
        // Viajero valora al anfitrión
        reviewData = {
          bookingRequestId: bookingInfo.id,
          reviewerTravelerId: user.id,
          reviewedHostId: userToReview.id,
          rating,
          comment: comment.trim()
        }
      } else {
        // Host valora al viajero
        reviewData = {
          bookingRequestId: bookingInfo.id,
          reviewerHostId: user.id,
          reviewedTravelerId: userToReview.id,
          accommodationId: bookingInfo.accommodationId,
          rating,
          comment: comment.trim()
        }
      }

      if (reviewType === 'traveler') {
        await reviewService.createTravelerReview(reviewData)
      } else {
        await reviewService.createHostReview(reviewData)
      }

      setRating(0)
      setComment('')
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        if (onReviewSubmitted) {
          onReviewSubmitted()
        }
      }, 2000)
    } catch (error) {
      console.error('Error al enviar valoración:', error)
      if (error.message && error.message.includes('already exists')) {
        setErrorMessage('Ya has valorado esta reserva.')
      } else {
        setErrorMessage('Error al enviar valoración. Por favor, intenta de nuevo.')
      }
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } finally {
      setSubmitting(false)
    }
  }

  const handleStarClick = (starValue) => {
    setRating(starValue)
  }

  const handleStarHover = (starValue) => {
    setHoverRating(starValue)
  }

  const handleStarLeave = () => {
    setHoverRating(0)
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || rating)
      stars.push(
        <i
          key={i}
          className={`bi ${isFilled ? 'bi-star-fill' : 'bi-star'} fs-3`}
          style={{
            color: isFilled ? '#f95a13' : '#e9ecef',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: isFilled ? 'scale(1.1)' : 'scale(1)'
          }}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        />
      )
    }
    return stars
  }

  const getRatingText = () => {
    const currentRating = hoverRating || rating
    if (currentRating === 0) return 'Selecciona una valoración'
    if (currentRating === 1) return 'Muy insatisfecho'
    if (currentRating === 2) return 'Insatisfecho'
    if (currentRating === 3) return 'Normal'
    if (currentRating === 4) return 'Satisfecho'
    if (currentRating === 5) return 'Muy satisfecho'
    return ''
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const calculateNights = () => {
    if (!bookingInfo.startDate || !bookingInfo.endDate) return 0
    const start = new Date(bookingInfo.startDate)
    const end = new Date(bookingInfo.endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <>
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
          Valoración enviada correctamente
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

      <div 
        className="modal show d-block" 
        tabIndex="-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      >
      <div 
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">
              {reviewType === 'host' ? 'Valorar viajero' : 'Valorar anfitrión'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            {/* User Info */}
            <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded">
              <UserAvatar
                photoUrl={userToReview.profilePhotoUrl}
                name={`${userToReview.firstName} ${userToReview.lastName}`}
                size={60}
              />
              <div>
                <h6 className="fw-bold mb-1">{userToReview.firstName} {userToReview.lastName}</h6>
                <p className="text-muted small mb-0">
                  {reviewType === 'host' ? 'Viajero' : 'Anfitrión'} en ShareYourTrip
                </p>
              </div>
            </div>

            {/* Stay Summary */}
            <div className="mb-4 p-3 bg-light rounded">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-calendar-check me-2 text-muted"></i>
                Resumen de tu estancia
              </h6>
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted d-block">Check-in</small>
                  <span className="fw-semibold">{formatDate(bookingInfo.startDate)}</span>
                </div>
                <div className="text-center">
                  <small className="text-muted d-block">Duración</small>
                  <span className="fw-semibold">{calculateNights()} noche{calculateNights() !== 1 ? 's' : ''}</span>
                </div>
                <div className="text-end">
                  <small className="text-muted d-block">Check-out</small>
                  <span className="fw-semibold">{formatDate(bookingInfo.endDate)}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div className="mb-4 text-center">
                <label className="form-label fw-semibold mb-2">
                  Tu valoración
                </label>
                <div className="d-flex justify-content-center gap-2 mb-2">
                  {renderStars()}
                </div>
                <p className="text-muted small mb-0" style={{ minHeight: '20px' }}>
                  {getRatingText()}
                </p>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <label htmlFor="comment" className="form-label fw-semibold">
                  Comentario
                </label>
                <textarea 
                  className="form-control" 
                  id="comment"
                  rows="5"
                  placeholder={`Comparte tu experiencia con ${userToReview.firstName}...`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{ resize: 'none' }}
                ></textarea>
                <div className="text-end mt-1">
                  <small className="text-muted">{comment.length} caracteres</small>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary flex-grow-1"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-action flex-grow-1"
                  disabled={rating === 0 || !comment.trim() || submitting}
                >
                  {submitting ? 'Enviando...' : 'Enviar valoración'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ReviewModal
