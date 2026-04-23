import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Header from '../components/layout/Header'
import HeroSection from '../components/layout/HeroSection'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 bg-light">
      <Header scrollY={scrollY} />
      <HeroSection 
        title={<span className="fs-2 fs-md-3">Inicia sesión en</span>}
        subtitle="Accede a tu cuenta para continuar compartiendo experiencias"
        showButtons={false}
        scrollY={scrollY}
      />
      
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h2 className="h5 fw-semibold mb-4 text-center">Iniciar sesión</h2>
                
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                  
                  <Input
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  
                  {error && (
                    <div className="alert alert-danger mb-3">
                      {error}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </Button>
                </form>
                
                <div className="mt-4 text-center">
                  <p className="text-muted mb-0">
                    ¿No tienes cuenta?{' '}
                    <a href="/register" className="text-decoration-none">
                      Regístrate
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
