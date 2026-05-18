import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import HeroSection from '../components/layout/HeroSection'
import Footer from '../components/layout/Footer'
import LoadingScreen from '../components/common/LoadingScreen'
import SearchBarIndex from '../components/layout/SearchBarIndex'
import PopularDestinations from '../components/layout/PopularDestinations'
import { useIndex } from '../hooks/useIndex'

const Index = () => {
  const {
    scrollY,
    statsVisible,
    ctaVisible,
    searchParams,
    loading,
    statsRef,
    ctaRef,
    heroOpacity,
    handleSearch,
    handleInputChange,
    handleDestinationClick
  } = useIndex()

  if (loading) {
    return <LoadingScreen message="Buscando alojamientos..." />
  }

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
        <SearchBarIndex 
          searchParams={searchParams}
          handleSearch={handleSearch}
          handleInputChange={handleInputChange}
        />
        {/* Popular Destinations */}
        <PopularDestinations 
          handleDestinationClick={handleDestinationClick}
        />

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

      <Footer />
    </div>
  )
}

export default Index
