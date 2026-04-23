import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/logo.png'

const Header = ({ scrollY }) => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const buttonsOpacity = Math.max(0, 1 - scrollY / 200)
  const logoOpacity = scrollY !== undefined ? Math.min(1, scrollY / 400) : 1

  return (
    <header className="sticky-top background-color-shareyourtrip" style={{ 
      zIndex: 1000,
      boxShadow: scrollY !== undefined ? `0 2px 4px rgba(0,0,0,${logoOpacity * 0.15})` : '0 2px 4px rgba(0,0,0,0.15)'
    }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Logo */}
            <Link to="/" className="text-decoration-none">
              <img 
                src={logo} 
                alt="ShareYourTrip" 
                style={{ 
                  height: '50px', 
                  width: 'auto',
                  opacity: logoOpacity,
                  transition: 'opacity 0.3s ease-out'
                }}
              />
            </Link>

            {/* Navigation */}
            <div className="d-flex align-items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/"
                    className="text-decoration-none text-white fw-medium"
                  >
                    Inicio
                  </Link>
                  <Link 
                    to="/dashboard"
                    className="text-decoration-none text-white fw-medium"
                  >
                    Mi Dashboard
                  </Link>
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        fontSize: '0.9rem'
                      }}
                    >
                      {user?.firstName?.charAt(0) || 'U'}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-decoration-none text-white fw-medium bg-transparent border-0"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i>
                      Cerrar sesión
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="text-decoration-none text-white fw-medium"
                  >
                    Iniciar sesión
                  </Link>
                  <Link 
                    to="/register"
                    className="btn btn-light btn-sm"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
