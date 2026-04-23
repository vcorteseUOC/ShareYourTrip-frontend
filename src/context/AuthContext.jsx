import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      // Aquí podrías validar el token o obtener el usuario
      setUser({ token })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const userData = await authService.login(email, password)
    setUser(userData)
    return userData
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
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
