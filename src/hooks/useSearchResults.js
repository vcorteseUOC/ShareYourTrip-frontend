import { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { accommodationService } from '../services/accommodationService'
import { getRoomTypeInfo } from '../utils/roomTypeUtils'
import { userService } from '../services/userService'
import { reviewService } from '../services/reviewService'
import { bookingService } from '../services/bookingService'
import { useAuth } from '../context/AuthContext'

export const useSearchResults = () => {
  const location = useLocation()
  const { user } = useAuth()
  const [showTooltip, setShowTooltip] = useState(false)
  const [accommodations, setAccommodations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(15)
  const [userInteracted, setUserInteracted] = useState(false)
  const [searchParams, setSearchParams] = useState({
    city: '',
    checkIn: null,
    checkOut: null,
    guests: 1
  })
  const [filters, setFilters] = useState({
    maxPrice: 500,
    roomType: 'all',
    services: {
      wifi: false,
      lavadora: false,
      aireAcondicionado: false,
      cocina: false
    },
    rating: 'all',
    language: 'all'
  })

  const getRoomTypeName = (roomType) => {
    return getRoomTypeInfo(roomType)
  }

  const mapBackendToFrontend = (backendAccommodations, hostsMap = {}, bookingsMap = {}, searchParams = null) => {
    return backendAccommodations.map(acc => {
      const host = hostsMap[acc.hostId] || {}
      const bookings = bookingsMap[acc.id] || []
      
      // El backend ya filtra por fechas si se proporcionan, así que usamos todas las reservas recibidas
      const occupiedSpots = bookings
        .reduce((total, booking) => total + (booking.guestsCount || 0), 0)
      const availableSpots = Math.max(0, (acc.maxGuests || 0) - occupiedSpots)
      
      return {
        id: acc.id,
        title: host.firstName ? `Alójate con ${host.firstName}` : acc.title,
        originalTitle: acc.title || '',
        description: acc.description || '',
        location: `${acc.city}, ${acc.country}`,
        price: acc.pricePerNight,
        rating: 0,
        reviews: 0,
        image: acc.coverImage || (acc.imageUrls && acc.imageUrls[0]) || '',
        hostImage: host.profilePhotoUrl || '',
        hostBio: host.bio || '',
        roomType: acc.roomType,
        availableSpots: availableSpots,
        totalGuests: acc.maxGuests,
        hostLanguage: host.language ? host.language.toLowerCase() : '',
        hostName: host.firstName && host.lastName ? `${host.firstName} ${host.lastName}` : '',
        hostEmail: host.email || '',
        hostBirthDate: host.birthDate || null,
        hostId: acc.hostId,
        facilities: acc.facilities
      }
    })
  }

  const loadAccommodations = async () => {
    console.log('Iniciando loadAccommodations')
    setLoading(true)
    setError(null)
    try {
      const filterRequest = {
        city: searchParams.city,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: searchParams.guests,
        roomType: filters.roomType === 'all' ? null : filters.roomType,
        maxPrice: filters.maxPrice,
        wifi: filters.services.wifi || null,
        washing: filters.services.lavadora || null,
        air: filters.services.aireAcondicionado || null,
        kitchen: filters.services.cocina || null
      }

      Object.keys(filterRequest).forEach(key => {
        if (filterRequest[key] === null || filterRequest[key] === '') {
          delete filterRequest[key]
        }
      })

      const backendResults = await accommodationService.searchAccommodations(filterRequest)
      
      const uniqueHostIds = [...new Set(backendResults.map(acc => acc.hostId))]
      const hostsMap = {}
      
      await Promise.all(
        uniqueHostIds.map(async (hostId) => {
          try {
            const host = await userService.getUserById(hostId)
            hostsMap[hostId] = host
          } catch (error) {
            console.error(`Error loading host ${hostId}:`, error)
          }
        })
      )
      
      const allAccommodationIds = backendResults.map(acc => acc.id)
      console.log('Obteniendo reservas para accommodationIds:', allAccommodationIds)
      let bookingsMap = {}
      if (allAccommodationIds.length > 0) {
        try {
          bookingsMap = await bookingService.getBookingsByAccommodationIds(allAccommodationIds, searchParams.checkIn, searchParams.checkOut)
          console.log('Reservas obtenidas:', bookingsMap)
        } catch (error) {
          console.error('Error loading bookings:', error)
        }
      }
      
      const mappedResults = mapBackendToFrontend(backendResults, hostsMap, bookingsMap, searchParams)
      
      let filteredResults = mappedResults
      if (filters.language !== 'all') {
        filteredResults = mappedResults.filter(acc => 
          acc.hostLanguage === filters.language
        )
      }
      
      const accommodationIds = filteredResults.map(acc => acc.id)
      console.log('Obteniendo valoraciones para accommodationIds:', accommodationIds)
      if (accommodationIds.length > 0) {
        try {
          const ratingsMap = await reviewService.getAccommodationRatings(accommodationIds)
          console.log('Valoraciones obtenidas:', ratingsMap)
          filteredResults = filteredResults.map(acc => ({
            ...acc,
            rating: ratingsMap[acc.id]?.averageRating || 0,
            reviews: ratingsMap[acc.id]?.reviewCount || 0
          }))
          console.log('Resultados con valoraciones:', filteredResults)
        } catch (error) {
          console.error('Error loading ratings:', error)
        }
      }
      
      if (filters.rating !== 'all') {
        const minRating = parseInt(filters.rating)
        filteredResults = filteredResults.filter(acc => 
          acc.rating >= minRating
        )
      }
      
      // Filtrar por número de huéspedes disponibles
      if (searchParams.guests) {
        filteredResults = filteredResults.filter(acc => 
          acc.availableSpots >= searchParams.guests
        )
      }
      
      // Excluir alojamientos del usuario registrado
      if (user?.id) {
        filteredResults = filteredResults.filter(acc => acc.hostId !== user.id)
      }
      
      setAccommodations(filteredResults)
    } catch (err) {
      setError('Error al cargar alojamientos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location.state) {
      setSearchParams({
        city: location.state.city || '',
        checkIn: location.state.checkIn || null,
        checkOut: location.state.checkOut || null,
        guests: location.state.guests || 1
      })
      if (location.state.filters) {
        setFilters(prevFilters => ({
          ...prevFilters,
          ...location.state.filters,
          maxPrice: location.state.filters.maxPrice || 500
        }))
      }
      setCurrentPage(1)
      setUserInteracted(true)
    }
  }, [location.state])

  useEffect(() => {
    if (searchParams.city || userInteracted) {
      loadAccommodations()
    }
  }, [searchParams.city, filters, userInteracted])

  const applyFilters = async () => {
    setCurrentPage(1)
    await loadAccommodations()
  }

  const handleSearchBarSubmit = async (e) => {
    e.preventDefault()
    await applyFilters()
  }


  const totalPages = Math.ceil(accommodations.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAccommodations = accommodations.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePreviousPage = () => {
    handlePageChange(currentPage - 1)
  }

  const handleNextPage = () => {
    handlePageChange(currentPage + 1)
  }

  const handleSearchBarChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleServiceFilterChange = (service, value) => {
    setFilters(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: value
      }
    }))
  }

  return {
    showTooltip,
    setShowTooltip,
    accommodations,
    loading,
    error,
    currentPage,
    itemsPerPage,
    userInteracted,
    setUserInteracted,
    searchParams,
    filters,
    setFilters,
    getRoomTypeName,
    loadAccommodations,
    applyFilters,
    handleSearchBarSubmit,
    totalPages,
    indexOfLastItem,
    indexOfFirstItem,
    currentAccommodations,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleSearchBarChange,
    handleFilterChange,
    handleServiceFilterChange
  }
}
