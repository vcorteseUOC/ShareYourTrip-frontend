import api from './api'
import { endpoints } from './endpoints'

export const authService = {
  login: async (email, password) => {
    const response = await api.post(endpoints.auth.login, { email, password })
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
  },

  getToken: () => {
    return localStorage.getItem('token')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
}
