import React from 'react'
import UserAvatar from './UserAvatar'

const ReviewCard = ({ review }) => {
  const userData = {
    id: review.reviewerTravelerId || review.id,
    firstName: review.name?.split(' ')[0] || 'Usuario',
    lastName: review.name?.split(' ').slice(1).join(' ') || '',
    email: review.email || '',
    profilePhotoUrl: review.image || '',
    bio: review.bio || '',
    language: review.language || '',
    birthDate: review.birthDate || null
  }
  return (
    <div className="card h-100 border-0 bg-light">
      <div className="card-body p-3">
        <div className="d-flex align-items-center gap-3 mb-3">
          <UserAvatar 
            photoUrl={review.image}
            name={review.name}
            size={48}
            user={userData}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-grow-1">
            <h6 className="fw-bold mb-1">{review.name}</h6>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`bi bi-star-fill ${i < review.rating ? 'text-warning' : 'text-muted'}`}
                    style={{ fontSize: '0.875rem' }}
                  ></i>
                ))}
              </div>
              <span className="small text-muted">{review.date}</span>
            </div>
          </div>
        </div>
        <p className="text-muted small mb-0">{review.comment}</p>
      </div>
    </div>
  )
}

export default ReviewCard
