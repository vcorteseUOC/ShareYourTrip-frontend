import React from 'react'
import UserAvatar from '../common/UserAvatar'
import { getLanguageFlag, getLanguageName } from '../../utils/languageUtils'

const HostInfo = ({ accommodation, openMessageModal, isCurrentUserHost = false }) => {
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
    <div className="card shadow border-0">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4">Sobre tu Anfitrión</h5>
        <div className="d-flex align-items-center gap-3 mb-4">
          <UserAvatar
            photoUrl={accommodation.hostImage}
            name={accommodation.hostName}
            size={64}
            user={userData}
          />
          <div>
            <h6 className="fw-bold mb-1">{accommodation.hostName}</h6>
            <div className="d-flex align-items-center gap-1">
              <img 
                src={getLanguageFlag(accommodation.hostLanguage)} 
                alt={getLanguageName(accommodation.hostLanguage)}
                style={{ width: '20px', height: 'auto' }}
              />
              <span className="small text-muted">Habla {getLanguageName(accommodation.hostLanguage)}</span>
            </div>
          </div>
        </div>

        <p className="text-muted small mb-4">{accommodation.hostBio}</p>

        {!isCurrentUserHost && (
          <button className="btn btn-action w-100 py-2" onClick={openMessageModal}>
            Contactar anfitrión
          </button>
        )}
      </div>
    </div>
  )
}

export default HostInfo
