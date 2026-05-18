import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MapModal from '../components/common/MapModal'
import BookingForm from '../components/accommodation_details/BookingForm'
import ReviewCard from '../components/common/ReviewCard'
import TravelerCard from '../components/common/TravelerCard'
import EmptySlot from '../components/common/EmptySlot'
import ImageGallery from '../components/accommodation_details/ImageGallery'
import MessageModal from '../components/common/MessageModal'
import AuthRequiredModal from '../components/common/AuthRequiredModal'
import HostInfo from '../components/accommodation_details/HostInfo'
import AccommodationInfo from '../components/accommodation_details/AccommodationInfo'
import SharedTravelers from '../components/accommodation_details/SharedTravelers'
import AccommodationReviews from '../components/accommodation_details/AccommodationReviews'
import { useAccommodationDetail } from '../hooks/useAccommodationDetail'
import { getLanguageFlag, getLanguageName } from '../utils/languageUtils'

const AccommodationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [initialCheckIn, setInitialCheckIn] = useState(location.state?.checkIn || null)
  const [initialCheckOut, setInitialCheckOut] = useState(location.state?.checkOut || null)

  const handleDatesChange = (checkIn, checkOut) => {
    setInitialCheckIn(checkIn)
    setInitialCheckOut(checkOut)
  }

  const {
    selectedImage,
    setSelectedImage,
    showMapModal,
    setShowMapModal,
    visibleReviews,
    setVisibleReviews,
    showFilters,
    setShowFilters,
    filterRating,
    setFilterRating,
    filterOrder,
    setFilterOrder,
    showServicesInfo,
    setShowServicesInfo,
    leftColumnVisible,
    rightColumnVisible,
    showTitleTooltip,
    setShowTitleTooltip,
    showMessageModal,
    setShowMessageModal,
    showAuthModal,
    setShowAuthModal,
    accommodation,
    host,
    loading,
    error,
    filteredReviews,
    scrollToBookingForm,
    showHostProfile,
    showUserProfile,
    openMessageModal,
    handleLogin,
    getColumnClass,
    isCurrentUserHost
  } = useAccommodationDetail(id, initialCheckIn, initialCheckOut)

  const animationStyles = `
    .fade-in-left {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-left.visible {
      opacity: 1;
      transform: translateX(0);
    }
    .fade-in-right {
      opacity: 0;
      transform: translateX(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-right.visible {
      opacity: 1;
      transform: translateX(0);
    }
    .title-tooltip {
      font-size: 0.75rem;
      line-height: 1.3;
    }
    .title-tooltip-icon {
      font-size: 0.875rem !important;
    }
  `

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando detalles del alojamiento...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !accommodation) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <div className="alert alert-danger" role="alert">
            {error || 'No se pudo cargar el alojamiento'}
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-vh-100 bg-light">
        <Header />

      <main className="container py-5">
        {/* Back Button */}
        <button 
          className="btn btn-link text-decoration-none mb-4 ps-0"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Volver a resultados
        </button>

        <div className="row g-4">
          {/* Left Column - Gallery and Host */}
          <div className={`col-lg-5 ${leftColumnVisible ? 'fade-in-left visible' : 'fade-in-left'}`}>
            {/* Image Gallery */}
            <ImageGallery 
              images={accommodation.images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              title={accommodation.title}
            />

            {/* Host Info */}
            <HostInfo 
              accommodation={accommodation}
              openMessageModal={openMessageModal}
              isCurrentUserHost={isCurrentUserHost}
            />
          </div>

          {/* Right Column - Info */}
          <div className={`col-lg-7 ${rightColumnVisible ? 'fade-in-right visible' : 'fade-in-right'}`}>
            <AccommodationInfo 
              accommodation={accommodation}
              showTitleTooltip={showTitleTooltip}
              setShowTitleTooltip={setShowTitleTooltip}
              setShowMapModal={setShowMapModal}
              scrollToBookingForm={scrollToBookingForm}
              showServicesInfo={showServicesInfo}
              setShowServicesInfo={setShowServicesInfo}
              isCurrentUserHost={isCurrentUserHost}
            />
          </div>
        </div>

        {/* Other Travelers */}
        {accommodation.totalGuests > 1 && (
          <SharedTravelers 
            accommodation={accommodation}
            getColumnClass={getColumnClass}
          />
        )}

        {/* Reviews */}
        <div className="card shadow border-0 mt-4">
          <AccommodationReviews 
            accommodation={accommodation}
            filteredReviews={filteredReviews}
            visibleReviews={visibleReviews}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filterRating={filterRating}
            setFilterRating={setFilterRating}
            filterOrder={filterOrder}
            setFilterOrder={setFilterOrder}
            setVisibleReviews={setVisibleReviews}
          />
        </div>

        <MapModal 
          show={showMapModal}
          onClose={() => setShowMapModal(false)}
          location={accommodation.location}
          coordinates={accommodation.coordinates}
          address={accommodation.address}
        />

        <MessageModal 
          show={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          recipient={{
            id: accommodation.hostId,
            firstName: accommodation.hostName,
            lastName: '',
            profilePhotoUrl: accommodation.hostImage,
            location: accommodation.location
          }}
          role="Anfitrión"
        />

        <AuthRequiredModal 
          show={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </main>

      <BookingForm 
        accommodation={accommodation} 
        isCurrentUserHost={isCurrentUserHost} 
        initialCheckIn={initialCheckIn} 
        initialCheckOut={initialCheckOut}
        onDatesChange={handleDatesChange}
        availableDates={accommodation?.availableDates || []}
      />
      <Footer />
    </div>
    </>
  )
}

export default AccommodationDetail
