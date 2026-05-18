import React, { useState, useMemo } from 'react'
import UserAvatar from '../common/UserAvatar'

const ReviewsTab = ({ reviews, reviewsLoading, reviewsError, user }) => {
  const [directionFilter, setDirectionFilter] = useState('all')

  const filteredReviews = useMemo(() => {
    if (directionFilter === 'all') return reviews
    return reviews.filter(r => r.direction === directionFilter)
  }, [reviews, directionFilter])

  const hechasCount = reviews.filter(r => r.direction === 'hecha').length
  const recibidasCount = reviews.filter(r => r.direction === 'recibida').length

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`bi bi-star${i < rating ? '-fill text-warning' : ' text-muted'}`}></i>
    ))
  }

  if (reviewsLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando reviews...</p>
      </div>
    )
  }

  if (reviewsError) {
    return <div className="alert alert-danger" role="alert">{reviewsError}</div>
  }

  return (
    <>
      {/* Header */}
      <div className="mb-4">
        <h1 className="display-5 fw-bold mb-2">Mis Reviews</h1>
        <p className="text-muted">Todas las reviews que has hecho y recibido</p>
      </div>

      {/* Direction Filter */}
      {reviews.length > 0 && (
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <button
            className="btn rounded-pill px-4 py-2 fw-semibold"
            style={{
              backgroundColor: directionFilter === 'all' ? '#f95a13' : '#fff',
              color: directionFilter === 'all' ? '#fff' : '#333',
              border: `2px solid ${directionFilter === 'all' ? '#f95a13' : '#e0e0e0'}`,
              transition: 'all 0.25s ease',
              boxShadow: directionFilter === 'all' ? '0 2px 8px rgba(249,90,19,0.25)' : 'none'
            }}
            onClick={() => setDirectionFilter('all')}
          >
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Todas
            <span className="badge ms-2" style={{ backgroundColor: directionFilter === 'all' ? 'rgba(255,255,255,0.25)' : '#f0f0f0', color: directionFilter === 'all' ? '#fff' : '#666' }}>
              {reviews.length}
            </span>
          </button>
          <button
            className="btn rounded-pill px-4 py-2 fw-semibold"
            style={{
              backgroundColor: directionFilter === 'hecha' ? '#f95a13' : '#fff',
              color: directionFilter === 'hecha' ? '#fff' : '#333',
              border: `2px solid ${directionFilter === 'hecha' ? '#f95a13' : '#e0e0e0'}`,
              transition: 'all 0.25s ease',
              boxShadow: directionFilter === 'hecha' ? '0 2px 8px rgba(249,90,19,0.25)' : 'none'
            }}
            onClick={() => setDirectionFilter('hecha')}
          >
            <i className="bi bi-box-arrow-up-right me-2"></i>
            Hechas
            <span className="badge ms-2" style={{ backgroundColor: directionFilter === 'hecha' ? 'rgba(255,255,255,0.25)' : '#f0f0f0', color: directionFilter === 'hecha' ? '#fff' : '#666' }}>
              {hechasCount}
            </span>
          </button>
          <button
            className="btn rounded-pill px-4 py-2 fw-semibold"
            style={{
              backgroundColor: directionFilter === 'recibida' ? '#f95a13' : '#fff',
              color: directionFilter === 'recibida' ? '#fff' : '#333',
              border: `2px solid ${directionFilter === 'recibida' ? '#f95a13' : '#e0e0e0'}`,
              transition: 'all 0.25s ease',
              boxShadow: directionFilter === 'recibida' ? '0 2px 8px rgba(249,90,19,0.25)' : 'none'
            }}
            onClick={() => setDirectionFilter('recibida')}
          >
            <i className="bi bi-box-arrow-in-down-right me-2"></i>
            Recibidas
            <span className="badge ms-2" style={{ backgroundColor: directionFilter === 'recibida' ? 'rgba(255,255,255,0.25)' : '#f0f0f0', color: directionFilter === 'recibida' ? '#fff' : '#666' }}>
              {recibidasCount}
            </span>
          </button>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-star fs-1 text-muted mb-3"></i>
          <p className="text-muted">No tienes reviews aún</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-funnel fs-1 text-muted mb-3"></i>
          <p className="text-muted">No hay reviews con este filtro</p>
        </div>
      ) : (
        <div className="row">
          {filteredReviews.map((review, index) => {
            const isReviewerCurrentUser = user?.id === review.reviewerId
            const isReviewedCurrentUser = user?.id === review.reviewedId
            
            const reviewerUserData = !isReviewerCurrentUser ? {
              id: review.reviewerId,
              firstName: review.reviewerName?.split(' ')[0] || 'Usuario',
              lastName: review.reviewerName?.split(' ').slice(1).join(' ') || '',
              email: review.reviewerEmail || '',
              profilePhotoUrl: review.reviewerPhotoUrl || '',
              bio: review.reviewerBio || '',
              language: '',
              birthDate: review.reviewerBirthDate || null
            } : null

            const reviewedUserData = !isReviewedCurrentUser ? {
              id: review.reviewedId,
              firstName: review.reviewedName?.split(' ')[0] || 'Usuario',
              lastName: review.reviewedName?.split(' ').slice(1).join(' ') || '',
              email: review.reviewedEmail || '',
              profilePhotoUrl: review.reviewedPhotoUrl || '',
              bio: review.reviewedBio || '',
              language: '',
              birthDate: review.reviewedBirthDate || null
            } : null

            return (
              <div key={`${review.id}-${review.type}-${index}`} className="col-12 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body p-4">
                    <div className="row g-3">
                      {/* Reviewer Info */}
                      <div className="col-md-2 col-sm-3 d-flex flex-column align-items-center justify-content-center">
                        <UserAvatar
                          photoUrl={review.reviewerPhotoUrl}
                          name={isReviewerCurrentUser ? 'Yo' : review.reviewerName}
                          size={60}
                          user={reviewerUserData}
                        />
                        <small className="text-muted d-block mt-2 text-center">{isReviewerCurrentUser ? 'Yo' : review.reviewerName}</small>
                      </div>

                      {/* Review Details */}
                      <div className="col-md-8 col-sm-6">
                        <div className="mb-2">
                          <span className="badge bg-secondary me-2">{review.role}</span>
                          <span className={`badge ${review.direction === 'hecha' ? 'bg-success' : 'bg-info'} me-2`}>
                            {review.direction === 'hecha' ? 'Hecha' : 'Recibida'}
                          </span>
                          <span className="badge bg-light text-dark">{review.type === 'traveler-review' ? 'Review de Viajero' : 'Review de Host'}</span>
                        </div>
                        <div className="mb-2">
                          {renderStars(review.rating)}
                          <span className="ms-2 fw-semibold">{review.rating}/5</span>
                        </div>
                        <p className="mb-2">{review.comment || 'Sin comentario'}</p>
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          {new Date(review.createdAt).toLocaleDateString('es-ES', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                        {review.accommodationName && (
                          <div className="mt-2">
                            <small className="text-muted">
                              <i className="bi bi-house me-1"></i>
                              {review.accommodationName}
                            </small>
                          </div>
                        )}
                      </div>

                      {/* Reviewed Info */}
                      <div className="col-md-2 col-sm-3 d-flex flex-column align-items-center justify-content-center">
                        <UserAvatar
                          photoUrl={review.reviewedPhotoUrl}
                          name={isReviewedCurrentUser ? 'Yo' : review.reviewedName}
                          size={50}
                          user={reviewedUserData}
                        />
                        <small className="text-muted d-block mt-2 text-center">{isReviewedCurrentUser ? 'Yo' : review.reviewedName}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ReviewsTab