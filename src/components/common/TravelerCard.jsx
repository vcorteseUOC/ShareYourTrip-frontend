import React from 'react'
import UserAvatar from './UserAvatar'
import { getLanguageFlag, getLanguageName } from '../../utils/languageUtils'

const TravelerCard = ({ traveler, onClick }) => {
  const userData = {
    id: traveler.id,
    firstName: traveler.name?.split(' ')[0] || 'Viajero',
    lastName: traveler.name?.split(' ').slice(1).join(' ') || '',
    email: traveler.email || '',
    profilePhotoUrl: traveler.image || '',
    bio: traveler.description || '',
    language: traveler.language || '',
    birthDate: traveler.birthDate || null
  }
  return (
    <div className="card h-100 border-0 bg-light">
      <div className="card-body p-3">
        <div className="d-flex align-items-center gap-3 mb-3">
          <UserAvatar
            photoUrl={traveler.image}
            name={traveler.name}
            size={48}
            user={userData}
          />
          <div className="flex-grow-1">
            <h6 className="fw-bold mb-1">{traveler.name}</h6>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-1">
                <i className="bi bi-star-fill text-warning"></i>
                <span className="small fw-semibold">{traveler.rating || 0}</span>
                <span className="small text-muted">({traveler.reviewCount || 0})</span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-1 mb-2">
          <img 
            src={getLanguageFlag(traveler.language)} 
            alt={traveler.language}
            style={{ width: '20px', height: 'auto' }}
          />
          <span className="small text-muted">Habla {getLanguageName(traveler.language)}</span>
        </div>
        <p className="text-muted small mb-0">{traveler.description}</p>
      </div>
    </div>
  )
}

export default TravelerCard
