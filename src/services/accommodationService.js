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

export const accommodationService = {
  searchAccommodations: async (filter) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accommodations/search`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(filter),
      })

      if (!response.ok) {
        throw new Error('Error al buscar alojamientos')
      }

      return await response.json()
    } catch (error) {
      console.error('Error en búsqueda de alojamientos:', error)
      throw error
    }
  },

  getAccommodationById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accommodations/${id}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener alojamiento')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener alojamiento:', error)
      throw error
    }
  },

  createAccommodation: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accommodations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Error al crear alojamiento')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al crear alojamiento:', error)
      throw error
    }
  },

  updateAccommodation: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accommodations/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar alojamiento')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al actualizar alojamiento:', error)
      throw error
    }
  },

  deleteAccommodation: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accommodations/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Error al eliminar alojamiento')
      }
    } catch (error) {
      console.error('Error al eliminar alojamiento:', error)
      throw error
    }
  },

  getAvailabilityDates: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accommodations/${id}/availability`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener disponibilidades')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener disponibilidades:', error)
      throw error
    }
  }
}
