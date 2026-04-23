import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import fondocabecera from '../../assets/fondocabecera.png'
import logo from '../../assets/logo.png'

const HeroSection = ({ title, subtitle, showButtons = true, backgroundImage = fondocabecera, scrollY }) => {
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHeroVisible(true)
    }, 300)
  }, [])

  const heroOpacity = scrollY !== undefined ? Math.max(0, 1 - scrollY / 400) : 1

  return (
    <div 
      className="container-fluid py-5 hero-section" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingBottom: '7rem',
        opacity: heroOpacity,
        transition: 'opacity 0.3s ease-out'
      }}
    >
      <div className={`container text-center text-white ${heroVisible ? 'slide-in-right' : ''}`} style={{ opacity: heroVisible ? 1 : 0 }}>
        <h1 className="display-3 fw-bold mb-3 d-flex align-items-center justify-content-center gap-3 flex-column flex-md-row">
          {title}
          <Link to="/" className="text-decoration-none">
            <img 
              src={logo} 
              alt="ShareYourTrip" 
              style={{ height: '100px', width: 'auto', maxHeight: '120px' }}
              className="img-fluid"
            />
          </Link>
        </h1>
        <p className="lead mb-4 fs-4">{subtitle}</p>
        {showButtons && (
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login" className="btn btn-light btn-lg">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection
