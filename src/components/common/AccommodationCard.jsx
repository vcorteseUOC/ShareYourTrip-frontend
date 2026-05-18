import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import { getLanguageFlag, getLanguageName } from '../../utils/languageUtils'
import { getRoomTypeInfo } from '../../utils/roomTypeUtils'

const AccommodationCard = ({ accommodation, index, searchParams }) => {
  const navigate = useNavigate()

  const userData = {
    id: accommodation.hostId,
    firstName: accommodation.hostName?.split(' ')[0] || 'Anfitrión',
    lastName: accommodation.hostName?.split(' ').slice(1).join(' ') || '',
    email: accommodation.hostEmail || '',
    profilePhotoUrl: accommodation.hostImage || '',
    bio: accommodation.hostBio || '',
    language: accommodation.hostLanguage || '',
    birthDate: accommodation.hostBirthDate || null
  }

  return (
    <div 
      className="card shadow h-100 border-0 card-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div 
        className="position-relative" 
        style={{ 
          height: '200px',
          backgroundImage: `url(${accommodation.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <span className="room-type-badge">
            <i className={`bi ${getRoomTypeInfo(accommodation.roomType).icon} me-1`}></i>
            {getRoomTypeInfo(accommodation.roomType).text}
          </span>
        </div>
      </div>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title fw-bold mb-1" style={{ fontSize: '1rem' }}>
              {accommodation.title}
            </h5>
            {accommodation.originalTitle && (
              <p className="card-text text-muted small mb-0">
                en {accommodation.originalTitle}
              </p>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <UserAvatar
              photoUrl={accommodation.hostImage}
              name={accommodation.hostName || accommodation.title.replace('Alójate con ', '')}
              size={48}
              user={userData}
            />
          </div>
        </div>
        <div className="d-flex gap-3 mb-3 align-items-center">
          <p className="text-muted small mb-0">
            <i className="bi bi-geo-alt me-1"></i>
            {accommodation.location}
          </p>
          {accommodation.rating !== null && accommodation.rating !== undefined && (
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-star-fill text-warning"></i>
              <span className="small fw-semibold">{accommodation.rating}</span>
            </div>
          )}
          <div className="d-flex align-items-center gap-1">
            <div 
              className="availability-badge"
              style={{ 
                backgroundColor: accommodation.availableSpots > 1 ? '#198754' : '#ffc107'
              }}
            >
              {accommodation.availableSpots}
            </div>
            <span className="small text-muted">/{accommodation.totalGuests}</span>
          </div>
          {accommodation.hostLanguage && ['es', 'en', 'fr', 'de', 'it'].includes(accommodation.hostLanguage) && (
            <span className="small text-muted d-flex align-items-center gap-1">
              <i className="bi bi-translate me-1"></i>
              <img 
                src={getLanguageFlag(accommodation.hostLanguage)} 
                alt={getLanguageName(accommodation.hostLanguage)}
                style={{ width: '20px', height: 'auto' }}
                title={getLanguageName(accommodation.hostLanguage)}
              />
            </span>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-bold color-shareyourtrip" style={{ fontSize: '1.25rem' }}>
              €{accommodation.price}
            </span>
            <span className="text-muted small">/noche</span>
          </div>
          <button className="btn btn-action btn-sm" onClick={() => navigate(`/accommodation/${accommodation.id}`, { state: { checkIn: searchParams?.checkIn, checkOut: searchParams?.checkOut } })}>
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccommodationCard
