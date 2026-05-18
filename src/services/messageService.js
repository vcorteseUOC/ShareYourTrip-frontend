import { endpoints } from './endpoints'

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

export const messageService = {
  createConversation: async (conversationData) => {
    try {
      const response = await fetch(`${endpoints.conversations}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(conversationData)
      })

      if (!response.ok) {
        throw new Error('Error al crear conversación')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al crear conversación:', error)
      throw error
    }
  },

  sendMessage: async (messageData) => {
    try {
      const response = await fetch(`${endpoints.conversations}/message`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(messageData)
      })

      if (!response.ok) {
        throw new Error('Error al enviar mensaje')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      throw error
    }
  },

  getConversation: async (conversationId) => {
    try {
      const response = await fetch(`${endpoints.conversations}/${conversationId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener conversación')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener conversación:', error)
      throw error
    }
  },

  getConversationsByUser: async (userId) => {
    try {
      const response = await fetch(`${endpoints.conversations}/user/${userId}`, {
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error('Error al obtener conversaciones del usuario')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener conversaciones del usuario:', error)
      throw error
    }
  }
}
