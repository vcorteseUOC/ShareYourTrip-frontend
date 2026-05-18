import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Header from '../components/layout/Header'
import HeroSection from '../components/layout/HeroSection'
import { authService } from '../services/authService'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    language: 'es',
    bio: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        birthDate: formData.birthDate || undefined,
        language: formData.language,
        bio: formData.bio || undefined
      })
      
      setSuccess('¡Cuenta creada correctamente! Redirigiendo al login...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 bg-light">
      <Header scrollY={scrollY} />
      <HeroSection 
        title={<span className="fs-2 fs-md-3">Únete a la familia de</span>}
        subtitle="Únete a ShareYourTrip y comienza a compartir experiencias únicas"
        showButtons={false}
        scrollY={scrollY}
      />
      
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h2 className="h5 fw-semibold mb-4 text-center">Crear cuenta</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <Input
                        label="Nombre"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <Input
                        label="Apellidos"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Tus apellidos"
                        required
                      />
                    </div>
                  </div>
                  
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <Input
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Mínimo 6 caracteres"
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <Input
                        label="Confirmar contraseña"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repite tu contraseña"
                        required
                      />
                    </div>
                  </div>
                  
                  <Input
                    label="Teléfono (opcional)"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                  />
                  
                  <Input
                    label="Fecha de nacimiento (opcional)"
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                  
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Idioma</label>
                    <select 
                      className="form-select"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                    >
                      <option value="es">Español</option>
                      <option value="en">Inglés</option>
                      <option value="fr">Francés</option>
                      <option value="de">Alemán</option>
                      <option value="it">Italiano</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Biografía (opcional)</label>
                    <textarea
                      className="form-control"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Cuéntanos un poco sobre ti..."
                      rows="3"
                    />
                  </div>
                  
                  {error && (
                    <div className="alert alert-danger mb-3">
                      {error}
                    </div>
                  )}
                  
                  {success && (
                    <div className="alert alert-success mb-3">
                      {success}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                  </Button>
                </form>
                
                <div className="mt-4 text-center">
                  <p className="text-muted mb-0">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Inicia sesión
                    </Link>
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

export default Register
