import { useState, useEffect } from 'react'
import { accommodationService } from '../services/accommodationService'
import { bookingService } from '../services/bookingService'
import { reviewService } from '../services/reviewService'
import { userService } from '../services/userService'

export const useAccommodationDetail = (id, checkIn = null, checkOut = null) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showMapModal, setShowMapModal] = useState(false)
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [showFilters, setShowFilters] = useState(false)
  const [filterRating, setFilterRating] = useState('all')
  const [filterOrder, setFilterOrder] = useState('recent')
  const [showServicesInfo, setShowServicesInfo] = useState(false)
  const [leftColumnVisible, setLeftColumnVisible] = useState(false)
  const [rightColumnVisible, setRightColumnVisible] = useState(false)
  const [showTitleTooltip, setShowTitleTooltip] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [accommodation, setAccommodation] = useState(null)
  const [host, setHost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCurrentUserHost, setIsCurrentUserHost] = useState(false)

  useEffect(() => {
    const loadAccommodationDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Obtener alojamiento
        const accommodationData = await accommodationService.getAccommodationById(id)
        console.log('Datos del alojamiento:', accommodationData)
        console.log('Rules:', accommodationData.rules)
        console.log('ImageUrls:', accommodationData.imageUrls)
        console.log('CoverImage:', accommodationData.coverImage)
        
        // Obtener host
        const hostData = await userService.getUserById(accommodationData.hostId)
        console.log('Datos del host:', hostData)
        console.log('Idioma del host:', hostData.language)
        
        // Obtener valoraciones
        const ratingsMap = await reviewService.getAccommodationRatings([id])
        const ratingInfo = ratingsMap[id] || { averageRating: 0, reviewCount: 0 }
        
        // Obtener reviews del host
        const reviewsData = await reviewService.getReviewsByHostId(accommodationData.hostId)
        
        // Obtener información de usuarios para cada review
        const reviewsWithUsers = await Promise.all(
          reviewsData.map(async (review) => {
            try {
              const userData = await userService.getUserById(review.reviewerTravelerId)
              return {
                ...review,
                name: `${userData.firstName} ${userData.lastName}`,
                image: userData.profilePhotoUrl || '',
                bio: userData.bio || '',
                language: userData.language || 'es',
                email: userData.email || '',
                birthDate: userData.birthDate || null
              }
            } catch (error) {
              console.error('Error al obtener usuario para review:', review.reviewerTravelerId, error)
              return {
                ...review,
                name: 'Usuario',
                image: '',
                bio: '',
                language: 'es',
                email: ''
              }
            }
          })
        )
        
        // Obtener reservas del alojamiento para calcular disponibilidad real y obtener viajeros
        let availableSpots = accommodationData.maxGuests || 0
        let travelers = []
        let availableDates = []
        try {
          const bookings = await bookingService.getBookingsByAccommodationId(id, checkIn, checkOut)
          
          // El backend ya filtra por fechas si se proporcionan, así que usamos todas las reservas recibidas
          let filteredBookings = bookings
          
          // Contar plazas ocupadas (el backend ya filtra solo ACCEPTED)
          const occupiedSpots = filteredBookings
            .reduce((total, booking) => total + (booking.guestsCount || 0), 0)
          availableSpots = Math.max(0, (accommodationData.maxGuests || 0) - occupiedSpots)
          
          // Obtener días disponibles desde el servicio de disponibilidades
          const availabilityDates = await accommodationService.getAvailabilityDates(id)
          console.log('useAccommodationDetail: Fechas del servicio:', availabilityDates)
          availableDates = availabilityDates
            .filter(av => av.isAvailable)
            .map(av => new Date(av.availableDate))
          
          // Obtener información de viajeros con reservas aceptadas que se solapan con las fechas
          travelers = await Promise.all(
            filteredBookings.map(async (booking) => {
              try {
                const travelerData = await userService.getUserById(booking.travelerId)
                const traveler = {
                  id: booking.travelerId,
                  name: `${travelerData.firstName} ${travelerData.lastName}`,
                  image: travelerData.profilePhotoUrl || '',
                  description: travelerData.bio || '',
                  language: travelerData.language || 'es',
                  email: travelerData.email || '',
                  birthDate: travelerData.birthDate || null
                }
                return traveler
              } catch (error) {
                console.error('Error al obtener viajero:', booking.travelerId, error)
                return null
              }
            })
          ).then(results => results.filter(t => t !== null))

          // Obtener ratings de los viajeros
          if (travelers.length > 0) {
            const travelerIds = travelers.map(t => t.id)
            try {
              const travelerRatingsMap = await reviewService.getTravelerRatings(travelerIds)
              travelers = travelers.map(traveler => ({
                ...traveler,
                rating: travelerRatingsMap[traveler.id]?.averageRating || 0,
                reviewCount: travelerRatingsMap[traveler.id]?.reviewCount || 0
              }))
            } catch (error) {
              console.error('Error al obtener ratings de viajeros:', error)
            }
          }
        } catch (error) {
          console.error('Error al obtener reservas para calcular disponibilidad:', error)
          // Si falla, usamos maxGuests como fallback
          availableSpots = accommodationData.maxGuests || 0
        }
        
        // Encontrar el índice de la cover image
        const coverIndex = accommodationData.imageUrls?.indexOf(accommodationData.coverImage) ?? 0
        setSelectedImage(coverIndex)
        
        setAccommodation({
          ...accommodationData,
          rating: ratingInfo.averageRating,
          reviews: ratingInfo.reviewCount,
          hostImage: hostData.profilePhotoUrl || '',
          hostName: `${hostData.firstName} ${hostData.lastName}`,
          hostLanguage: hostData.language || 'es',
          hostBio: hostData.bio || '',
          hostEmail: hostData.email || '',
          hostBirthDate: hostData.birthDate || null,
          hostId: accommodationData.hostId,
          images: accommodationData.imageUrls || [],
          reviewsData: reviewsWithUsers || [],
          services: accommodationData.facilities ? {
            wifi: accommodationData.facilities.wifi || false,
            lavadora: accommodationData.facilities.washing || false,
            aireAcondicionado: accommodationData.facilities.air || false,
            cocina: accommodationData.facilities.kitchen || false
          } : {
            wifi: false,
            lavadora: false,
            aireAcondicionado: false,
            cocina: false
          },
          availableSpots: availableSpots,
          totalGuests: accommodationData.maxGuests || 0,
          availableDates: availableDates,
          travelers: travelers,
          location: `${accommodationData.city}, ${accommodationData.country}`,
          price: accommodationData.pricePerNight,
          coordinates: {
            lat: Number(accommodationData.latitude) || 0,
            lng: Number(accommodationData.longitude) || 0
          },
          address: accommodationData.addressLine || '',
          houseRules: accommodationData.rules || ''
        })
        setHost(hostData)

        // Verificar si el usuario actual es el host
        const userDataStr = localStorage.getItem('userData')
        let currentUserId = null
        if (userDataStr) {
          try {
            const userData = JSON.parse(userDataStr)
            currentUserId = userData.id
          } catch (e) {
            console.error('Error al parsear userData:', e)
          }
        }
        
        console.log('currentUserId:', currentUserId)
        console.log('hostId:', accommodationData.hostId)
        console.log('comparación:', currentUserId === accommodationData.hostId)
        setIsCurrentUserHost(currentUserId === accommodationData.hostId)
      } catch (err) {
        setError('Error al cargar los detalles del alojamiento')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadAccommodationDetails()
  }, [id, checkIn, checkOut])

  // Filter and sort reviews
  const getFilteredReviews = () => {
    if (!accommodation || !accommodation.reviewsData) {
      return []
    }
    
    let filtered = [...accommodation.reviewsData]
    
    // Filter by rating
    if (filterRating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(filterRating))
    }
    
    // Sort reviews
    switch (filterOrder) {
      case 'recent':
        filtered.sort((a, b) => b.id - a.id)
        break
      case 'oldest':
        filtered.sort((a, b) => a.id - b.id)
        break
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating)
        break
      default:
        filtered.sort((a, b) => b.id - a.id)
    }
    
    return filtered
  }

  const filteredReviews = getFilteredReviews()

  // Reset visible reviews when filters change
  useEffect(() => {
    setVisibleReviews(3)
  }, [filterRating, filterOrder])

  const scrollToBookingForm = () => {
    const element = document.getElementById('booking-form')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openMessageModal = () => {
    // Verificar si hay sesión (verificar token en localStorage)
    const isLoggedIn = localStorage.getItem('token') !== null
    
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    
    setShowMessageModal(true)
  }

  const handleLogin = () => {
    // Redirigir a login
    window.location.href = '/login'
  }

  // Helper function to calculate column width based on total guests
  const getColumnClass = (total) => {
    const colSize = Math.floor(12 / total)
    return `col-${colSize}`
  }

  // Animation effects
  useEffect(() => {
    setTimeout(() => setLeftColumnVisible(true), 100)
    setTimeout(() => setRightColumnVisible(true), 300)
  }, [])

  return {
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
    openMessageModal,
    handleLogin,
    getColumnClass,
    isCurrentUserHost
  }
}
