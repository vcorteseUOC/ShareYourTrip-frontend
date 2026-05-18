import { useState, useEffect } from 'react'
import { dashboardService } from '../services/dashboardService'
import { userService } from '../services/userService'

export const useAccommodationsTab = (user, activeTab) => {
  const [accommodations, setAccommodations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAccommodations = async () => {
      if (!user?.id) return
      
      setLoading(true)
      setError(null)
      try {
        const accommodationsData = await dashboardService.getAccommodationsByHostId(user.id)
        
        // Obtener información adicional del host
        const accommodationsWithDetails = await Promise.all(
          accommodationsData.map(async (accommodation) => {
            try {
              const host = await userService.getUserById(accommodation.hostId)
              
              return {
                id: accommodation.id,
                title: accommodation.title || 'Alojamiento',
                description: accommodation.description || '',
                location: `${accommodation.addressLine || ''}, ${accommodation.city || ''}, ${accommodation.country || ''}`.replace(/^, /, '').replace(/, ,/g, ',').trim() || 'Ubicación no especificada',
                coverImage: accommodation.coverImage || (accommodation.imageUrls && accommodation.imageUrls[0]) || '',
                imageUrls: accommodation.imageUrls || [],
                price: `€${accommodation.pricePerNight || 0}/noche`,
                maxGuests: accommodation.maxGuests || 1,
                bedrooms: accommodation.bedrooms || 0,
                beds: accommodation.beds || 0,
                bathrooms: accommodation.bathrooms || 0,
                hostId: accommodation.hostId,
                hostName: `${host.firstName} ${host.lastName}`,
                hostEmail: host.email,
                hostPhotoUrl: host.profilePhotoUrl || '',
                hostBio: host.bio || '',
                hostBirthDate: host.birthDate || null,
                status: accommodation.status,
                createdAt: accommodation.createdAt,
                updatedAt: accommodation.updatedAt
              }
            } catch (error) {
              console.error('Error al obtener detalles del alojamiento:', accommodation.id, error)
              return null
            }
          })
        ).then(results => results.filter(a => a !== null))
        
        setAccommodations(accommodationsWithDetails)
      } catch (error) {
        console.error('Error al cargar alojamientos:', error)
        setError('Error al cargar alojamientos. Por favor, intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id && activeTab === 'accommodations') {
      loadAccommodations()
    }
  }, [user?.id, activeTab])

  return {
    accommodations,
    setAccommodations,
    loading,
    error
  }
}
