import React from 'react'
import UserAvatar from './UserAvatar'
import { getLanguageFlag, getLanguageName } from '../../utils/languageUtils'

const UserProfileModal = ({ show, onClose, user, ratingLabel }) => {
  if (!show || !user) return null

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="text-center mb-4 d-flex flex-column align-items-center">
              <UserAvatar
                photoUrl={user.profilePhotoUrl || user.image}
                name={`${user.firstName} ${user.lastName}`}
                size={120}
                className="user-avatar-modal"
              />
              <h4 className="fw-bold mb-2">{user.firstName} {user.lastName}</h4>
              
              {user.language && (
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <img 
                    src={getLanguageFlag(user.language)} 
                    alt={user.language}
                    style={{ width: '20px', height: 'auto' }}
                  />
                  <span className="text-muted small">Habla {getLanguageName(user.language)}</span>
                </div>
              )}

              {user.bio && (
                <p className="text-muted mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
                  {user.bio}
                </p>
              )}
            </div>

            <div className="row g-4">
              {user.rating !== undefined && user.rating !== null && (
                <div className="col-md-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: 'rgba(249, 90, 19, 0.1)',
                            color: '#f95a13'
                          }}
                        >
                          <i className="bi bi-star-fill fs-5"></i>
                        </div>
                        <div>
                          <p className="mb-0 small text-muted">{ratingLabel || 'Puntuación de viajero'}</p>
                          <p className="mb-0 fw-semibold">
                            {user.rating} <span className="text-muted small">({user.reviewCount || 0} reviews)</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

               {user.birthDate && (
                <div className="col-md-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: 'rgba(249, 90, 19, 0.1)',
                            color: '#f95a13'
                          }}
                        >
                          <i className="bi bi-cake2 fs-5"></i>
                        </div>
                        <div>
                          <p className="mb-0 small text-muted">Fecha de nacimiento</p>
                          <p className="mb-0 fw-semibold">
                            {new Date(user.birthDate).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center mt-4">
              <button 
                className="btn btn-outline-secondary px-4"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal
