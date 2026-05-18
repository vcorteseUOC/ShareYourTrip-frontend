import { useState, useEffect } from 'react'
import { dashboardService } from '../services/dashboardService'
import { reviewService } from '../services/reviewService'
import { accommodationService } from '../services/accommodationService'

export const useDashboardStats = (user, activeTab) => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalReviews: 0,
    pendingRequests: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [recentBookingsLoading, setRecentBookingsLoading] = useState(true)

  useEffect(() => {
    // Cargar estadísticas reales
    const loadStats = async () => {
      try {
        setStatsLoading(true)
        const bookingStats = await dashboardService.getBookingStats(user.id)
        
        // Obtener reviews recibidas (como host)
        const receivedHostReviews = await reviewService.getReviewsByHostId(user.id)
        // Obtener reviews recibidas (como viajero)
        const receivedTravelerReviews = await reviewService.getReviewsByReviewedTravelerId(user.id)
        
        const totalReceivedReviews = (receivedHostReviews.length || 0) + (receivedTravelerReviews.length || 0)
        
        setStats({
          totalBookings: bookingStats.completedBookings || 0,
          totalReviews: totalReceivedReviews,
          pendingRequests: bookingStats.pendingRequests || 0
        })
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
        // Mantener valores por defecto si falla
        setStats({
          totalBookings: 0,
          totalReviews: 0,
          pendingRequests: 0
        })
      } finally {
        setStatsLoading(false)
      }
    }

    if (user?.id) {
      loadStats()
    } else {
      setStatsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    // Cargar reservas recientes (combinando host y traveler)
    const loadRecentBookings = async () => {
      try {
        setRecentBookingsLoading(true)
        const [hostBookings, travelerBookings] = await Promise.all([
          dashboardService.getBookingsByHostId(user.id),
          dashboardService.getBookingsByTravelerId(user.id)
        ])
        
        // Combinar y obtener detalles
        const allBookings = [...hostBookings, ...travelerBookings]
        
        const bookingsWithDetails = await Promise.all(
          allBookings.map(async (booking) => {
            try {
              const accommodation = await accommodationService.getAccommodationById(booking.accommodationId)
              const isHostBooking = hostBookings.some(b => b.id === booking.id)
              
              return {
                id: booking.id,
                accommodationId: booking.accommodationId,
                accommodationImage: accommodation.coverImage || (accommodation.imageUrls && accommodation.imageUrls[0]) || '',
                accommodationName: accommodation.title || 'Alojamiento',
                checkIn: new Date(booking.startDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
                checkOut: new Date(booking.endDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: booking.status.toLowerCase(),
                role: isHostBooking ? 'Como Anfitrión' : 'Como Viajero'
              }
            } catch (error) {
              console.error('Error al obtener detalles de reserva:', booking.id, error)
              return null
            }
          })
        ).then(results => results.filter(b => b !== null))
        
        // Ordenar por ID (más reciente) y tomar las primeras 5
        const sortedBookings = bookingsWithDetails
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
        
        setRecentBookings(sortedBookings)
      } catch (error) {
        console.error('Error al cargar reservas recientes:', error)
        setRecentBookings([])
      } finally {
        setRecentBookingsLoading(false)
      }
    }

    if (user?.id && activeTab === 'dashboard') {
      loadRecentBookings()
    } else {
      setRecentBookingsLoading(false)
    }
  }, [user?.id, activeTab])

  return {
    stats,
    recentBookings,
    statsLoading,
    recentBookingsLoading
  }
}
