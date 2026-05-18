import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = authService.getToken()
    const userData = localStorage.getItem('userData')
    if (token && userData) {
      // Recuperar usuario completo desde localStorage
      setUser(JSON.parse(userData))
    } else if (token) {
      // Si hay token pero no userData, guardar solo el token temporalmente
      setUser({ token })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const userData = await authService.login(email, password)
    setUser(userData)
    localStorage.setItem('userData', JSON.stringify(userData))
    return userData
  }

  const updateUser = (updatedFields) => {
    const updated = { ...user, ...updatedFields }
    setUser(updated)
    localStorage.setItem('userData', JSON.stringify(updated))
  }

  const logout = () => {
    authService.logout()
    localStorage.removeItem('userData')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
