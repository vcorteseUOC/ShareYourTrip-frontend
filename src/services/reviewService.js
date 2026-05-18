const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  return {
    'Content-Type': 'application/json'
  }
}

export const reviewService = {
  createTravelerReview: async (reviewData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/traveler-reviews`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData)
      })

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('already exists')
        }
        throw new Error('Error al crear valoración')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al crear valoración:', error)
      throw error
    }
  },

  createHostReview: async (reviewData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/host-reviews`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData)
      })

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('already exists')
        }
        throw new Error('Error al crear valoración')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al crear valoración:', error)
      throw error
    }
  },

  getAccommodationRatings: async (accommodationIds) => {
    try {
      const response = await fetch(`${API_BASE_URL}/traveler-reviews/accommodation-ratings?accommodationIds=${accommodationIds.join(',')}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener valoraciones')
      }

      const ratingsMap = await response.json()
      
      // Redondear averageRating a 1 decimal
      Object.keys(ratingsMap).forEach(key => {
        if (ratingsMap[key].averageRating) {
          ratingsMap[key].averageRating = Math.round(ratingsMap[key].averageRating * 10) / 10
        }
      })
      
      return ratingsMap
    } catch (error) {
      console.error('Error al obtener valoraciones:', error)
      throw error
    }
  },

  getTravelerRatings: async (travelerIds) => {
    try {
      const response = await fetch(`${API_BASE_URL}/traveler-reviews/traveler-ratings?travelerIds=${travelerIds.join(',')}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener valoraciones de viajeros')
      }

      const ratingsMap = await response.json()
      
      // Redondear averageRating a 1 decimal
      Object.keys(ratingsMap).forEach(key => {
        if (ratingsMap[key].averageRating) {
          ratingsMap[key].averageRating = Math.round(ratingsMap[key].averageRating * 10) / 10
        }
      })
      
      return ratingsMap
    } catch (error) {
      console.error('Error al obtener valoraciones de viajeros:', error)
      throw error
    }
  },

  getReviewsByHostId: async (hostId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/traveler-reviews/reviewed-host/${hostId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reviews del host')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reviews del host:', error)
      throw error
    }
  },

  getReviewsByReviewerTravelerId: async (travelerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/traveler-reviews/reviewer-traveler/${travelerId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reviews del viajero')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reviews del viajero:', error)
      throw error
    }
  },

  getReviewsByReviewerHostId: async (hostId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/host-reviews/reviewer-host/${hostId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reviews del host como reviewer')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reviews del host como reviewer:', error)
      throw error
    }
  },

  getReviewsByReviewedTravelerId: async (travelerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/host-reviews/reviewed-traveler/${travelerId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reviews del viajero como reviewed')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reviews del viajero como reviewed:', error)
      throw error
    }
  }
}
