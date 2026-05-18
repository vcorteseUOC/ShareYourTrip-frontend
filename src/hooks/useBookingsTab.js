import { useState, useEffect, useMemo } from 'react'
import { dashboardService } from '../services/dashboardService'
import { accommodationService } from '../services/accommodationService'
import { userService } from '../services/userService'

export const useBookingsTab = (user, activeTab, bookingTab) => {
  const [hostBookings, setHostBookings] = useState([])
  const [travelerBookings, setTravelerBookings] = useState([])
  const [hostBookingHistory, setHostBookingHistory] = useState([])
  const [travelerBookingHistory, setTravelerBookingHistory] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [searchStatus, setSearchStatus] = useState('')
  const [bookingsLoading, setBookingsLoading] = useState(true)

  const filterBookings = (bookings) => {
    return bookings.filter(booking => {
      // Filtro por nombre
      if (searchName && !booking.accommodationName.toLowerCase().includes(searchName.toLowerCase())) {
        return false
      }

      // Filtro por fecha (check-in posterior o igual a la seleccionada)
      if (searchDate) {
        const checkInDate = new Date(booking.checkIn)
        const filterDate = new Date(searchDate)
        if (checkInDate < filterDate) {
          return false
        }
      }

      // Filtro por estado
      if (searchStatus && booking.status !== searchStatus) {
        return false
      }

      return true
    })
  }

  const filteredHostBookings = useMemo(() => filterBookings(hostBookings), [hostBookings, searchName, searchDate, searchStatus])
  const filteredHostBookingHistory = useMemo(() => filterBookings(hostBookingHistory), [hostBookingHistory, searchName, searchDate, searchStatus])
  const filteredTravelerBookings = useMemo(() => filterBookings(travelerBookings), [travelerBookings, searchName, searchDate, searchStatus])
  const filteredTravelerBookingHistory = useMemo(() => filterBookings(travelerBookingHistory), [travelerBookingHistory, searchName, searchDate, searchStatus])

  const loadHostBookings = async () => {
    try {
      setBookingsLoading(true)
      const bookings = await dashboardService.getBookingsByHostId(user.id)
      
      // Obtener información adicional de alojamientos y viajeros
      const hostBookingsWithDetails = await Promise.all(
        bookings.map(async (booking) => {
          try {
            const accommodation = await accommodationService.getAccommodationById(booking.accommodationId)
            const guest = await userService.getUserById(booking.travelerId)
            
            return {
              id: booking.id,
              accommodationId: booking.accommodationId,
              accommodationName: accommodation.title || 'Alojamiento',
              accommodationImage: accommodation.coverImage || (accommodation.imageUrls && accommodation.imageUrls[0]) || '',
              checkIn: new Date(booking.startDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
              checkOut: new Date(booking.endDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
              startDate: booking.startDate,
              endDate: booking.endDate,
              guests: booking.numberOfGuests || 1,
              totalPrice: `€${booking.totalPrice || 0}`,
              status: booking.status.toLowerCase(),
              guestId: booking.travelerId,
              guestName: `${guest.firstName} ${guest.lastName}`,
              guestEmail: guest.email,
              guestPhotoUrl: guest.profilePhotoUrl || '',
              guestBio: guest.bio || '',
              guestBirthDate: guest.birthDate || null,
              hasTravelerReview: booking.hasTravelerReview || false,
              hasHostReview: booking.hasHostReview || false
            }
          } catch (error) {
            console.error('Error al obtener detalles de reserva:', booking.id, error)
            return null
          }
        })
      ).then(results => results.filter(b => b !== null))
      
      // Separar activas e historial
      const activeBookings = hostBookingsWithDetails.filter(b => b.status === 'pending' || b.status === 'accepted')
      const historyBookings = hostBookingsWithDetails.filter(b => b.status === 'completed' || b.status === 'cancelled')
      
      setHostBookings(activeBookings)
      setHostBookingHistory(historyBookings)
    } catch (error) {
      console.error('Error al cargar reservas como host:', error)
    } finally {
      setBookingsLoading(false)
    }
  }

  const loadTravelerBookings = async () => {
    try {
      setBookingsLoading(true)
      const bookings = await dashboardService.getBookingsByTravelerId(user.id)
      
      // Obtener información adicional de alojamientos y anfitriones
      const travelerBookingsWithDetails = await Promise.all(
        bookings.map(async (booking) => {
          try {
            const accommodation = await accommodationService.getAccommodationById(booking.accommodationId)
            const host = await userService.getUserById(accommodation.hostId)
            
            return {
              id: booking.id,
              accommodationId: booking.accommodationId,
              accommodationName: accommodation.title || 'Alojamiento',
              accommodationImage: accommodation.coverImage || (accommodation.imageUrls && accommodation.imageUrls[0]) || '',
              checkIn: new Date(booking.startDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
              checkOut: new Date(booking.endDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
              startDate: booking.startDate,
              endDate: booking.endDate,
              guests: booking.numberOfGuests || 1,
              totalPrice: `€${booking.totalPrice || 0}`,
              status: booking.status.toLowerCase(),
              hostId: accommodation.hostId,
              hostName: `${host.firstName} ${host.lastName}`,
              hostEmail: host.email,
              hostPhotoUrl: host.profilePhotoUrl || '',
              hostBio: host.bio || '',
              hostBirthDate: host.birthDate || null,
              hasTravelerReview: booking.hasTravelerReview || false,
              hasHostReview: booking.hasHostReview || false
            }
          } catch (error) {
            console.error('Error al obtener detalles de reserva:', booking.id, error)
            return null
          }
        })
      ).then(results => results.filter(b => b !== null))
      
      // Separar activas e historial
      const activeBookings = travelerBookingsWithDetails.filter(b => b.status === 'pending' || b.status === 'accepted')
      const historyBookings = travelerBookingsWithDetails.filter(b => b.status === 'completed' || b.status === 'cancelled')
      
      setTravelerBookings(activeBookings)
      setTravelerBookingHistory(historyBookings)
    } catch (error) {
      console.error('Error al cargar reservas como viajero:', error)
    } finally {
      setBookingsLoading(false)
    }
  }

  const reloadBookings = () => {
    if (bookingTab === 'host') {
      loadHostBookings()
    } else {
      loadTravelerBookings()
    }
  }

  useEffect(() => {
    if (user?.id && activeTab === 'bookings' && bookingTab === 'host') {
      loadHostBookings()
    } else {
      setBookingsLoading(false)
    }
  }, [user?.id, activeTab, bookingTab])

  useEffect(() => {
    if (user?.id && activeTab === 'bookings' && bookingTab === 'traveler') {
      loadTravelerBookings()
    } else {
      setBookingsLoading(false)
    }
  }, [user?.id, activeTab, bookingTab])

  return {
    hostBookings,
    setHostBookings,
    travelerBookings,
    setTravelerBookings,
    hostBookingHistory,
    setHostBookingHistory,
    travelerBookingHistory,
    setTravelerBookingHistory,
    searchName,
    setSearchName,
    searchDate,
    setSearchDate,
    searchStatus,
    setSearchStatus,
    filteredHostBookings,
    filteredHostBookingHistory,
    filteredTravelerBookings,
    filteredTravelerBookingHistory,
    bookingsLoading,
    reloadBookings
  }
}
