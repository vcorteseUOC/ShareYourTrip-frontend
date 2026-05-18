import { useState, useEffect } from 'react'
import { reviewService } from '../services/reviewService'
import { userService } from '../services/userService'
import { bookingService } from '../services/bookingService'
import { accommodationService } from '../services/accommodationService'

export const useReviewsTab = (user, activeTab) => {
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [reviewsError, setReviewsError] = useState(null)

  useEffect(() => {
    // Cargar reviews
    const loadAllReviews = async () => {
      if (!user) return

      setReviewsLoading(true)
      setReviewsError(null)
      try {
        const travelerId = user.id
        const hostId = user.id

        // Hacer 4 llamadas paralelas al backend
        const [
          reviewsAsTravelerReviewer,
          reviewsAsHostReviewer,
          reviewsAsTravelerReviewed,
          reviewsAsHostReviewed
        ] = await Promise.all([
          reviewService.getReviewsByReviewerTravelerId(travelerId).catch(() => []),
          reviewService.getReviewsByReviewerHostId(hostId).catch(() => []),
          reviewService.getReviewsByReviewedTravelerId(travelerId).catch(() => []),
          reviewService.getReviewsByHostId(hostId).catch(() => [])
        ])

        // Normalizar y unificar los datos
        const normalizedReviews = await normalizeReviews(
          reviewsAsTravelerReviewer,
          reviewsAsHostReviewer,
          reviewsAsTravelerReviewed,
          reviewsAsHostReviewed,
          travelerId,
          hostId
        )

        // Ordenar por fecha de creación (más recientes primero)
        normalizedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        setReviews(normalizedReviews)
      } catch (err) {
        console.error('Error al cargar reviews:', err)
        setReviewsError('Error al cargar reviews. Por favor, intenta de nuevo.')
      } finally {
        setReviewsLoading(false)
      }
    }

    if (user?.id && activeTab === 'reviews') {
      loadAllReviews()
    }
  }, [user?.id, activeTab])

  const normalizeReviews = async (
    travelerReviewsAsReviewer,
    hostReviewsAsReviewer,
    hostReviewsAsReviewed,
    travelerReviewsAsReviewed,
    travelerId,
    hostId
  ) => {
    const normalized = []

    // Reviews hechas como viajero (TravelerReview donde reviewerTravelerId = travelerId)
    for (const review of travelerReviewsAsReviewer) {
      try {
        const reviewedHost = await userService.getUserById(review.reviewedHostId)
        const booking = await bookingService.getBookingById(review.bookingRequestId)
        const accommodation = await accommodationService.getAccommodationById(booking.accommodationId)
        normalized.push({
          id: review.id,
          type: 'traveler-review',
          direction: 'hecha',
          role: 'Como Viajero',
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          bookingRequestId: review.bookingRequestId,
          reviewerId: review.reviewerTravelerId,
          reviewedId: review.reviewedHostId,
          accommodationId: booking.accommodationId,
          accommodationName: accommodation.title || 'Alojamiento',
          reviewerName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Usuario',
          reviewerPhotoUrl: user.profilePhotoUrl || '',
          reviewerEmail: user.email || '',
          reviewerBio: user.bio || '',
          reviewerBirthDate: user.birthDate || null,
          reviewedName: reviewedHost.firstName && reviewedHost.lastName ? `${reviewedHost.firstName} ${reviewedHost.lastName}` : 'Anfitrión',
          reviewedPhotoUrl: reviewedHost.profilePhotoUrl || '',
          reviewedEmail: reviewedHost.email || '',
          reviewedBio: reviewedHost.bio || '',
          reviewedBirthDate: reviewedHost.birthDate || null
        })
      } catch (error) {
        console.error('Error al obtener detalles del host:', review.reviewedHostId, error)
      }
    }

    // Reviews hechas como host (HostReview donde reviewerHostId = hostId)
    for (const review of hostReviewsAsReviewer) {
      try {
        const reviewedTraveler = await userService.getUserById(review.reviewedTravelerId)
        const accommodation = await accommodationService.getAccommodationById(review.accommodationId)
        normalized.push({
          id: review.id,
          type: 'host-review',
          direction: 'hecha',
          role: 'Como Anfitrión',
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          bookingRequestId: review.bookingRequestId,
          reviewerId: review.reviewerHostId,
          reviewedId: review.reviewedTravelerId,
          accommodationId: review.accommodationId,
          accommodationName: accommodation.title || 'Alojamiento',
          reviewerName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Usuario',
          reviewerPhotoUrl: user.profilePhotoUrl || '',
          reviewerEmail: user.email || '',
          reviewerBio: user.bio || '',
          reviewerBirthDate: user.birthDate || null,
          reviewedName: reviewedTraveler.firstName && reviewedTraveler.lastName ? `${reviewedTraveler.firstName} ${reviewedTraveler.lastName}` : 'Viajero',
          reviewedPhotoUrl: reviewedTraveler.profilePhotoUrl || '',
          reviewedEmail: reviewedTraveler.email || '',
          reviewedBio: reviewedTraveler.bio || '',
          reviewedBirthDate: reviewedTraveler.birthDate || null
        })
      } catch (error) {
        console.error('Error al obtener detalles del viajero o alojamiento:', review.reviewedTravelerId, error)
      }
    }

    // Reviews recibidas como viajero (HostReview donde reviewedTravelerId = travelerId)
    for (const review of hostReviewsAsReviewed) {
      try {
        const reviewerHost = await userService.getUserById(review.reviewerHostId)
        const accommodation = await accommodationService.getAccommodationById(review.accommodationId)
        normalized.push({
          id: review.id,
          type: 'host-review',
          direction: 'recibida',
          role: 'Como Viajero',
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          bookingRequestId: review.bookingRequestId,
          reviewerId: review.reviewerHostId,
          reviewedId: review.reviewedTravelerId,
          accommodationId: review.accommodationId,
          accommodationName: accommodation.title || 'Alojamiento',
          reviewerName: reviewerHost.firstName && reviewerHost.lastName ? `${reviewerHost.firstName} ${reviewerHost.lastName}` : 'Anfitrión',
          reviewerPhotoUrl: reviewerHost.profilePhotoUrl || '',
          reviewerEmail: reviewerHost.email || '',
          reviewerBio: reviewerHost.bio || '',
          reviewerBirthDate: reviewerHost.birthDate || null,
          reviewedName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Usuario',
          reviewedPhotoUrl: user.profilePhotoUrl || '',
          reviewedEmail: user.email || '',
          reviewedBio: user.bio || '',
          reviewedBirthDate: user.birthDate || null
        })
      } catch (error) {
        console.error('Error al obtener detalles del host o alojamiento:', review.reviewerHostId, error)
      }
    }

    // Reviews recibidas como host (TravelerReview donde reviewedHostId = hostId)
    for (const review of travelerReviewsAsReviewed) {
      try {
        const reviewerTraveler = await userService.getUserById(review.reviewerTravelerId)
        const booking = await bookingService.getBookingById(review.bookingRequestId)
        const accommodation = await accommodationService.getAccommodationById(booking.accommodationId)
        normalized.push({
          id: review.id,
          type: 'traveler-review',
          direction: 'recibida',
          role: 'Como Anfitrión',
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          bookingRequestId: review.bookingRequestId,
          reviewerId: review.reviewerTravelerId,
          reviewedId: review.reviewedHostId,
          accommodationId: booking.accommodationId,
          accommodationName: accommodation.title || 'Alojamiento',
          reviewerName: reviewerTraveler.firstName && reviewerTraveler.lastName ? `${reviewerTraveler.firstName} ${reviewerTraveler.lastName}` : 'Viajero',
          reviewerPhotoUrl: reviewerTraveler.profilePhotoUrl || '',
          reviewerEmail: reviewerTraveler.email || '',
          reviewerBio: reviewerTraveler.bio || '',
          reviewerBirthDate: reviewerTraveler.birthDate || null,
          reviewedName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Usuario',
          reviewedPhotoUrl: user.profilePhotoUrl || '',
          reviewedEmail: user.email || '',
          reviewedBio: user.bio || '',
          reviewedBirthDate: user.birthDate || null
        })
      } catch (error) {
        console.error('Error al obtener detalles del viajero:', review.reviewerTravelerId, error)
      }
    }

    return normalized
  }

  return {
    reviews,
    setReviews,
    reviewsLoading,
    reviewsError
  }
}
