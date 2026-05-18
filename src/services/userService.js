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

export const userService = {
  updateUser: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar usuario')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      throw error
    }
  },

  getUserById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener usuario')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener usuario:', error)
      throw error
    }
  }
}
