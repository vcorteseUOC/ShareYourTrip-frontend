import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import MessageModal from './MessageModal'
import ReviewModal from './ReviewModal'
import { bookingService } from '../../services/bookingService'

const BookingCard = ({ booking, type = 'host', isHistory = false, onStatusChange }) => {
  const navigate = useNavigate()
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [recipient, setRecipient] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [userToReview, setUserToReview] = useState(null)
  const [reviewType, setReviewType] = useState('')
  const [accepting, setAccepting] = useState(false)
  const [rejecting, setRejecting] = useState(false)
  const [cancelling, setCancelling] = useState(false)

  const handleAccept = async () => {
    setAccepting(true)
    try {
      await bookingService.acceptBooking(booking.id)
      if (onStatusChange) {
        onStatusChange()
      }
    } catch (error) {
      console.error('Error al aceptar reserva:', error)
      alert('Error al aceptar reserva. Por favor, intenta de nuevo.')
    } finally {
      setAccepting(false)
    }
  }

  const handleReject = async () => {
    setRejecting(true)
    try {
      await bookingService.rejectBooking(booking.id)
      if (onStatusChange) {
        onStatusChange()
      }
    } catch (error) {
      console.error('Error al rechazar reserva:', error)
      alert('Error al rechazar reserva. Por favor, intenta de nuevo.')
    } finally {
      setRejecting(false)
    }
  }

  const handleCancel = async () => {
    setCancelling(true)
    try {
      await bookingService.cancelBooking(booking.id)
      if (onStatusChange) {
        onStatusChange()
      }
    } catch (error) {
      console.error('Error al cancelar reserva:', error)
      alert('Error al cancelar reserva. Por favor, intenta de nuevo.')
    } finally {
      setCancelling(false)
    }
  }

  const handleMessageClick = (e) => {
    e.stopPropagation()
    const recipientData = type === 'host' 
      ? {
          id: booking.guestId,
          firstName: booking.guestName?.split(' ')[0] || 'Huésped',
          lastName: booking.guestName?.split(' ').slice(1).join(' ') || '',
          profilePhotoUrl: booking.guestPhotoUrl || '',
          location: ''
        }
      : {
          id: booking.hostId,
          firstName: booking.hostName?.split(' ')[0] || 'Anfitrión',
          lastName: booking.hostName?.split(' ').slice(1).join(' ') || '',
          profilePhotoUrl: booking.hostPhotoUrl || '',
          location: ''
        }
    setRecipient(recipientData)
    setShowMessageModal(true)
  }

  const handleReviewClick = (e) => {
    e.stopPropagation()
    const reviewUserData = type === 'host' 
      ? {
          id: booking.guestId,
          firstName: booking.guestName?.split(' ')[0] || 'Huésped',
          lastName: booking.guestName?.split(' ').slice(1).join(' ') || '',
          profilePhotoUrl: booking.guestPhotoUrl || '',
          email: booking.guestEmail || ''
        }
      : {
          id: booking.hostId,
          firstName: booking.hostName?.split(' ')[0] || 'Anfitrión',
          lastName: booking.hostName?.split(' ').slice(1).join(' ') || '',
          profilePhotoUrl: booking.hostPhotoUrl || '',
          email: booking.hostEmail || ''
        }
    setUserToReview(reviewUserData)
    setReviewType(type)
    setShowReviewModal(true)
  }

  const getStatusDisplay = (status) => {
    const statusConfig = {
      pending: {
        icon: 'bi-clock-history',
        text: 'Pendiente',
        className: 'status-badge-pending'
      },
      accepted: {
        icon: 'bi-check-circle-fill',
        text: 'Confirmada',
        className: 'status-badge-accepted'
      },
      cancelled: {
        icon: 'bi-x-circle-fill',
        text: 'Cancelada',
        className: 'status-badge-cancelled'
      },
      completed: {
        icon: 'bi-star-fill',
        text: 'Completada',
        className: 'status-badge-completed'
      }
    }
    return statusConfig[status] || { icon: 'bi-question-circle', text: status, className: 'status-badge-default' }
  }

  const statusDisplay = getStatusDisplay(booking.status)

  const guestUserData = {
    id: booking.guestId,
    firstName: booking.guestName?.split(' ')[0] || 'Huésped',
    lastName: booking.guestName?.split(' ').slice(1).join(' ') || '',
    email: booking.guestEmail || '',
    profilePhotoUrl: booking.guestPhotoUrl || '',
    bio: booking.guestBio || '',
    birthDate: booking.guestBirthDate || null
  }

  const hostUserData = {
    id: booking.hostId,
    firstName: booking.hostName?.split(' ')[0] || 'Anfitrión',
    lastName: booking.hostName?.split(' ').slice(1).join(' ') || '',
    email: booking.hostEmail || '',
    profilePhotoUrl: booking.hostPhotoUrl || '',
    bio: booking.hostBio || '',
    birthDate: booking.hostBirthDate || null
  }

  const hasReviewed = type === 'host' 
    ? Boolean(booking.hasHostReview)
    : Boolean(booking.hasTravelerReview)

  return (
    <div 
      className="card shadow mb-3"
      style={{ 
        opacity: isHistory ? 0.7 : 1,
        filter: isHistory ? 'grayscale(100%)' : 'none',
        transition: 'opacity 0.2s ease, filter 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (isHistory) {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.filter = 'none'
        }
      }}
      onMouseLeave={(e) => {
        if (isHistory) {
          e.currentTarget.style.opacity = '0.7'
          e.currentTarget.style.filter = 'grayscale(100%)'
        }
      }}
    >
      <div className="card-body p-4">
        <div className="row g-3 align-items-center">
          {/* Accommodation Image */}
          <div className="col-md-3 col-sm-4">
            <img 
              src={booking.accommodationImage} 
              alt={booking.accommodationName}
              className="rounded"
              style={{ 
                width: '100%', 
                height: '120px', 
                objectFit: 'cover',
                filter: isHistory ? 'grayscale(100%)' : 'none'
              }}
            />
          </div>

          {/* Booking Details */}
          <div className="col-md-6 col-sm-8">
            <h6 className="fw-bold mb-2">{booking.accommodationName}</h6>
            <div className="d-flex flex-wrap gap-3 text-muted small mb-2">
              <div>
                <i className="bi bi-calendar me-1"></i>
                {booking.checkIn} - {booking.checkOut}
              </div>
              <div>
                <i className="bi bi-people me-1"></i>
                {booking.guests} huéspedes
              </div>
            </div>
            
            {/* Counterparty Info */}
            {type === 'host' ? (
              <div className="d-flex align-items-center gap-2 mt-2 p-2 bg-light rounded">
                <UserAvatar
                  photoUrl={guestUserData.profilePhotoUrl}
                  name={guestUserData.firstName + ' ' + guestUserData.lastName}
                  size={40}
                  user={guestUserData}
                />
                <div className="flex-grow-1">
                  <div className="small fw-semibold">{guestUserData.firstName + ' ' + guestUserData.lastName}</div>
                  <div className="text-muted small">{guestUserData.email}</div>
                </div>
                {booking.status !== 'completed' && (
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleMessageClick}
                  >
                    <i className="bi bi-chat-dots"></i>
                  </button>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2 mt-2 p-2 bg-light rounded">
                <UserAvatar
                  photoUrl={hostUserData.profilePhotoUrl}
                  name={hostUserData.firstName + ' ' + hostUserData.lastName}
                  size={40}
                  user={hostUserData}
                />
                <div className="flex-grow-1">
                  <div className="small fw-semibold">{hostUserData.firstName + ' ' + hostUserData.lastName}</div>
                  <div className="text-muted small">{hostUserData.email}</div>
                </div>
                {booking.status !== 'completed' && (
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleMessageClick}
                  >
                    <i className="bi bi-chat-dots"></i>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Status and Actions */}
          <div className="col-md-3 col-sm-12">
            <div className="d-flex flex-column gap-2 align-items-center text-center">
              <div className={`status-badge ${statusDisplay.className}`}>
                <i className={`bi ${statusDisplay.icon}`}></i>
                <span className="fw-semibold small">{statusDisplay.text}</span>
              </div>
              {booking.status === 'pending' && type === 'host' && (
                <div className="d-flex gap-2 w-100">
                  <button 
                    className="btn btn-sm btn-success flex-grow-1"
                    onClick={handleAccept}
                    disabled={accepting}
                  >
                    {accepting ? 'Aceptando...' : 'Aceptar'}
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleReject}
                    disabled={rejecting}
                  >
                    {rejecting ? 'Rechazando...' : 'Rechazar'}
                  </button>
                </div>
              )}
              {booking.status === 'accepted' && type === 'host' && (
                <button 
                  className="btn btn-sm btn-outline-danger w-100"
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  {cancelling ? 'Cancelando...' : 'Cancelar reserva'}
                </button>
              )}
              {booking.status === 'pending' && type === 'traveler' && (
                <div className="d-flex gap-2 w-100">
                  <div className="text-muted small flex-grow-1 d-flex align-items-center">
                    Esperando confirmación del anfitrión
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleCancel}
                    disabled={cancelling}
                  >
                    {cancelling ? 'Cancelando...' : 'Cancelar'}
                  </button>
                </div>
              )}
              {booking.status === 'accepted' && type === 'traveler' && (
                <div className="d-flex gap-2 w-100">
                  <button 
                    className="btn btn-sm btn-outline-primary flex-grow-1"
                    onClick={() => navigate(`/accommodation/${booking.accommodationId}`, { state: { checkIn: booking.startDate, checkOut: booking.endDate } })}
                  >
                    Ver detalles
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleCancel}
                    disabled={cancelling}
                  >
                    {cancelling ? 'Cancelando...' : 'Cancelar'}
                  </button>
                </div>
              )}
              {booking.status === 'completed' && !hasReviewed && (
                <button 
                  className="btn btn-sm btn-action w-100"
                  style={{ 
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f95a13'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={handleReviewClick}
                >
                  <i className="bi bi-star me-1"></i>
                  {type === 'host' ? 'Valorar Viajero' : 'Valorar anfitrión'}
                </button>
              )}
              {booking.status === 'completed' && hasReviewed && (
                <div className="text-success small fw-semibold">
                  <i className="bi bi-check-circle me-1"></i>
                  {type === 'host' ? 'Viajero valorado' : 'Anfitrión valorado'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MessageModal 
        show={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        recipient={recipient}
        role="Viajero"
      />
      <ReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        userToReview={userToReview}
        bookingInfo={booking}
        reviewType={reviewType}
        onReviewSubmitted={onStatusChange}
      />
    </div>
  )
}

export default BookingCard
