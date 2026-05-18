import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import UserProfileModal from './UserProfileModal'
import { reviewService } from '../../services/reviewService'

const UserAvatar = ({ photoUrl, name, size = 40, onClick, className = '', user = null, isHost = false, ratingLabel }) => {
  const [showUserProfileModal, setShowUserProfileModal] = useState(false)
  const [userWithRating, setUserWithRating] = useState(null)

  const handleClick = async (e) => {
    if (user) {
      e.stopPropagation()
      
      // Obtener puntuación del usuario si no está ya en el objeto user y no es host
      let userData = { ...user }
      if (!isHost && (userData.rating === undefined || userData.rating === null)) {
        try {
          const ratingsMap = await reviewService.getTravelerRatings([user.id || user.travelerId])
          const rating = ratingsMap[user.id || user.travelerId]
          if (rating) {
            userData.rating = rating.averageRating
            userData.reviewCount = rating.reviewCount
          }
        } catch (error) {
          console.error('Error al obtener puntuación del usuario:', error)
        }
      }
      
      setUserWithRating(userData)
      setShowUserProfileModal(true)
    } else if (onClick) {
      onClick(e)
    }
  }
  const getColorFromName = (name) => {
    // Generar color basado en hash del nombre para consistencia
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const hue = hash % 360
    return `hsl(${hue}, 70%, 45%)`
  }

  const initial = name?.charAt(0)?.toUpperCase() || 'U'
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: onClick || user ? 'pointer' : 'default'
  }

  if (photoUrl) {
    return (
      <>
        <img 
          src={photoUrl} 
          alt={name}
          style={{ 
            ...containerStyle,
            objectFit: 'cover'
          }}
          onClick={handleClick}
          className={className}
        />
        {user && showUserProfileModal && createPortal(
          <UserProfileModal 
            show={showUserProfileModal}
            onClose={() => setShowUserProfileModal(false)}
            user={userWithRating || user}
            ratingLabel={ratingLabel}
          />,
          document.body
        )}
      </>
    )
  }

  return (
    <>
      <div 
        style={{ 
          ...containerStyle,
          backgroundColor: getColorFromName(name),
          color: 'white',
          fontWeight: 'bold',
          fontSize: `${size * 0.4}px`
        }}
        onClick={handleClick}
        className={className}
      >
        {initial}
      </div>
      {user && showUserProfileModal && createPortal(
        <UserProfileModal 
          show={showUserProfileModal}
          onClose={() => setShowUserProfileModal(false)}
          user={userWithRating || user}
          ratingLabel={ratingLabel}
        />,
        document.body
      )}
    </>
  )
}

export default UserAvatar
