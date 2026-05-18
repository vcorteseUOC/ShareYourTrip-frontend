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

export const bookingService = {
  getBookingById: async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking-requests/${bookingId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reserva')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reserva:', error)
      throw error
    }
  },

  getBookingsByAccommodationId: async (accommodationId, checkIn = null, checkOut = null) => {
    try {
      let url = `${API_BASE_URL}/booking-requests/accommodation/${accommodationId}`
      if (checkIn && checkOut) {
        url += `?checkIn=${checkIn}&checkOut=${checkOut}`
      }
      const response = await fetch(url, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reservas del alojamiento')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reservas del alojamiento:', error)
      throw error
    }
  },

  getBookingsByAccommodationIds: async (accommodationIds, checkIn = null, checkOut = null) => {
    try {
      let url = `${API_BASE_URL}/booking-requests/accommodations/details?accommodationIds=${accommodationIds.join(',')}`
      if (checkIn && checkOut) {
        url += `&checkIn=${checkIn}&checkOut=${checkOut}`
      }
      const response = await fetch(url, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener reservas de los alojamientos')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener reservas de los alojamientos:', error)
      throw error
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking-requests`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData)
      })

      if (!response.ok) {
        throw new Error('Error al crear reserva')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al crear reserva:', error)
      throw error
    }
  },

  acceptBooking: async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking-requests/${bookingId}/accept`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al aceptar reserva')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al aceptar reserva:', error)
      throw error
    }
  },

  rejectBooking: async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking-requests/${bookingId}/reject`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al rechazar reserva')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al rechazar reserva:', error)
      throw error
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking-requests/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al cancelar reserva')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al cancelar reserva:', error)
      throw error
    }
  }
}
