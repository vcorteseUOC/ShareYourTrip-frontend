import { useState } from 'react'
import { accommodationService } from '../services/accommodationService'
import { userService } from '../services/userService'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useImageSelectorComponent } from '../components/form/useImageSelectorComponent'

export const useCreateAccommodation = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    title: '', description: '', addressLine: '', city: '', country: '',
    postalCode: '', latitude: '', longitude: '', pricePerNight: '',
    maxGuests: 1, roomType: 'private', rules: '',
    wifi: false, washing: false, air: false, kitchen: false
  })
  const {
    images,
    coverIndex,
    newImageUrl, setNewImageUrl,
    handleAddImageUrl, handleRemoveImage, handleSetCover,
    hasImages
  } = useImageSelectorComponent([])
  const [isActive, setIsActive] = useState(true)
  const [availableDates, setAvailableDates] = useState([])
  const [calendarMonth, setCalendarMonth] = useState(new Date())

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user?.id) return
    setSubmitting(true)
    setError(null)
    try {
      const coverUrl = images[coverIndex]?.url || null
      const imagePayload = images.map(img => ({
        imageUrl: img.url,
        isCover: img.url === coverUrl
      }))
      if (imagePayload.length > 0 && !imagePayload.some(img => img.isCover)) {
        imagePayload[0].isCover = true
      }
      const accommodationData = {
        hostId: user.id,
        title: formData.title,
        description: formData.description,
        addressLine: formData.addressLine,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
        latitude: formData.latitude,
        longitude: formData.longitude,
        pricePerNight: parseFloat(formData.pricePerNight),
        maxGuests: parseInt(formData.maxGuests),
        roomType: formData.roomType,
        rules: formData.rules,
        facilities: { wifi: formData.wifi, washing: formData.washing, air: formData.air, kitchen: formData.kitchen },
        images: imagePayload,
        availabilities: availableDates.map(dateStr => ({ availableDate: dateStr, isAvailable: true })),
        status: isActive ? 'ACTIVE' : 'INACTIVE'
      }
      await accommodationService.createAccommodation(accommodationData)
      
      // Actualizar usuario para reflejar el nuevo rol HOST
      const updatedUser = await userService.getUserById(user.id)
      updateUser({
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profilePhotoUrl: updatedUser.profilePhotoUrl,
        roles: updatedUser.roles
      })
      
      return { success: true }
    } catch (error) {
      console.error('Error al crear alojamiento:', error)
      setError('Error al crear alojamiento. Por favor, intenta de nuevo.')
      return { success: false }
    } finally {
      setSubmitting(false)
    }
  }

  return {
    error, submitting,
    formData, setFormData,
    images, coverIndex,
    isActive, setIsActive,
    availableDates, setAvailableDates,
    calendarMonth, setCalendarMonth,
    newImageUrl, setNewImageUrl,
    handleChange, handleAddImageUrl, handleRemoveImage, handleSetCover, handleSubmit,
    hasImages
  }
}
