const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

export const dashboardService = {
  getBookingStats: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking-requests/stats/${userId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener estadísticas de reservas')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener estadísticas de reservas:', error)
      throw error
    }
  },

  getAccommodationsByHostId: async (hostId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accommodations/host/${hostId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener alojamientos del host')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener alojamientos del host:', error)
      throw error
    }
  },

  getBookingsByHostId: async (hostId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking-requests/host/${hostId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reservas como host')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reservas como host:', error)
      throw error
    }
  },

  getBookingsByTravelerId: async (travelerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking-requests/traveler/${travelerId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reservas como viajero')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reservas como viajero:', error)
      throw error
    }
  }
}
