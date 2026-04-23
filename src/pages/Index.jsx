import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import HeroSection from '../components/layout/HeroSection'
import barcelona from '../assets/barcelona.jpg'
import madrid from '../assets/madrid.jpg'
import valencia from '../assets/valencia.jpg'
import sevilla from '../assets/sevilla.jpg'

const Index = () => {
  const [scrollY, setScrollY] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current)
      }
    }
  }, [])

  const heroOpacity = Math.max(0, 1 - scrollY / 400)

  return (
    <div className="min-vh-100 bg-light">
      <Header scrollY={scrollY} />

      {/* Hero Section */}
      <HeroSection 
        title={<span className="fs-2 fs-md-3">Bienvenidos a</span>}
        subtitle="Comparte experiencias únicas con viajeros de todo el mundo"
        showButtons={false}
        scrollY={scrollY}
      />

      {/* Features Section */}
      <main className="container py-5">
        {/* Search Bar */}
        <div className="card shadow-lg border-0" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
          <div className="card-body p-0">
            <div className="row g-0 align-items-center">
              <div className="col-md-3">
                <div className="p-4 border-end">
                  <label className="form-label small text-muted mb-1">Destino</label>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt me-2 text-muted"></i>
                    <input 
                      type="text" 
                      className="form-control border-0 p-0 fw-medium" 
                      placeholder="¿A dónde vas?"
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-4 border-end">
                  <label className="form-label small text-muted mb-1">Check-in</label>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar me-2 text-muted"></i>
                    <input 
                      type="date" 
                      className="form-control border-0 p-0 fw-medium"
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-4 border-end">
                  <label className="form-label small text-muted mb-1">Check-out</label>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar me-2 text-muted"></i>
                    <input 
                      type="date" 
                      className="form-control border-0 p-0 fw-medium"
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="p-4 border-end">
                  <label className="form-label small text-muted mb-1">Huéspedes</label>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-people me-2 text-muted"></i>
                    <select className="form-select border-0 p-0 fw-medium" style={{ backgroundColor: 'transparent' }}>
                      <option value="1">1 huésped</option>
                      <option value="2">2 huéspedes</option>
                      <option value="3">3 huéspedes</option>
                      <option value="4">4 huéspedes</option>
                      <option value="5+">5+ huéspedes</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-1">
                <div className="p-4">
                  <button type="submit" className="btn btn-lg w-100 border-0" style={{ backgroundColor: 'white' }}>
                    <i className="bi bi-search color-shareyourtrip" style={{ fontSize: '1.5rem' }}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
         {/* Popular Destinations */}
        <div className="mb-5" style={{ marginTop: '3rem' }}>
          <h2 className="h3 fw-bold text-center mb-4">Destinos más populares</h2>
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="card border-0 shadow h-100">
                <div className="position-relative" style={{ 
                  height: '200px', 
                  backgroundImage: `url(${barcelona})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
                  <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <h5 className="text-white mb-0">Barcelona</h5>
                    <p className="text-white small mb-0">España</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card border-0 shadow h-100">
                <div className="position-relative" style={{ 
                  height: '200px', 
                  backgroundImage: `url(${madrid})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
                  <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <h5 className="text-white mb-0">Madrid</h5>
                    <p className="text-white small mb-0">España</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card border-0 shadow h-100">
                <div className="position-relative" style={{ 
                  height: '200px', 
                  backgroundImage: `url(${valencia})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
                  <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <h5 className="text-white mb-0">Valencia</h5>
                    <p className="text-white small mb-0">España</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card border-0 shadow h-100">
                <div className="position-relative" style={{ 
                  height: '200px', 
                  backgroundImage: `url(${sevilla})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
                  <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <h5 className="text-white mb-0">Sevilla</h5>
                    <p className="text-white small mb-0">España</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is ShareYourTrip */}
        <div className="mb-5" style={{ animation: 'fadeIn 1s ease-in' }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="h3 fw-bold mb-4">¿Qué es ShareYourTrip?</h2>
              <p className="text-muted mb-3">
                ShareYourTrip es la plataforma líder para compartir alojamientos únicos en todo el mundo. 
                Conectamos viajeros con anfitriones locales que ofrecen experiencias auténticas y espacios únicos.
              </p>
              <p className="text-muted mb-4">
                Ya sea que busques un apartamento en el centro de la ciudad, una casa en la playa o una cabaña 
                en la montaña, encontrarás la opción perfecta para tu próximo viaje.
              </p>
              <div className="row g-3" ref={statsRef}>
                <div className="col-6">
                  <div className={`text-center p-3 border rounded ${statsVisible ? 'slide-in-left' : ''}`} style={{ opacity: statsVisible ? 1 : 0 }}>
                    <h3 className="fw-bold mb-1 color-shareyourtrip">10K+</h3>
                    <p className="small text-muted mb-0">Alojamientos</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className={`text-center p-3 border rounded ${statsVisible ? 'slide-in-left' : ''}`} style={{ opacity: statsVisible ? 1 : 0, animationDelay: '0.2s' }}>
                    <h3 className="fw-bold mb-1 color-shareyourtrip">50K+</h3>
                    <p className="small text-muted mb-0">Viajeros</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow background-color-shareyourtrip">
                <div className="card-body p-5 text-center text-white">
                  <i className="bi bi-globe fs-1 mb-3"></i>
                  <h3 className="fw-bold mb-3">Viaja como un local</h3>
                  <p className="mb-4">
                    Descubre destinos desde una perspectiva única, conecta con la cultura local 
                    y crea recuerdos inolvidables.
                  </p>
                  <Link to="/register" className="btn btn-light btn-lg">
                    Únete ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-5 text-center" ref={ctaRef}>
          <div className={`card border-0 shadow background-color-shareyourtrip ${ctaVisible ? 'slide-in-bottom' : ''}`} style={{ opacity: ctaVisible ? 1 : 0 }}>
            <div className="card-body p-5">
              <h2 className="text-white fw-bold mb-3">¿Listo para comenzar?</h2>
              <p className="text-white mb-4">
                Únete a miles de viajeros y anfitriones que ya forman parte de ShareYourTrip
              </p>
              <Link to="/register" className="btn btn-light btn-lg">
                Crear cuenta gratuita
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">© 2026 ShareYourTrip. TFG Victor Cortés Esteve - UOC - Ingenieria informática</p>
        </div>
      </footer>
    </div>
  )
}

export default Index
