import { useState, useEffect } from 'react'
import { accommodationService } from '../services/accommodationService'
import { userService } from '../services/userService'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useImageSelectorComponent } from '../components/form/useImageSelectorComponent'

export const useEditAccommodation = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()

  const [accommodation, setAccommodation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [formData, setFormData] = useState({
    title: '', description: '', addressLine: '', city: '', country: '',
    postalCode: '', latitude: '', longitude: '', pricePerNight: '',
    maxGuests: '', roomType: '', rules: '',
    wifi: false, washing: false, air: false, kitchen: false
  })
  const {
    images, setImages,
    coverIndex, setCoverIndex,
    newImageUrl, setNewImageUrl,
    handleAddImageUrl, handleRemoveImage, handleSetCover,
    hasImages
  } = useImageSelectorComponent([])
  const [isActive, setIsActive] = useState(true)
  const [availableDates, setAvailableDates] = useState([])
  const [calendarMonth, setCalendarMonth] = useState(new Date())

  useEffect(() => {
    const loadAccommodation = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const data = await accommodationService.getAccommodationById(id)
        setAccommodation(data)
      } catch (error) {
        console.error('Error al cargar alojamiento:', error)
        setError('Error al cargar alojamiento. Por favor, intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }
    loadAccommodation()
  }, [id])

  useEffect(() => {
    if (!accommodation) return
    setImages((accommodation.imageUrls || []).map(url => ({ url, file: null, isNew: false })))
    const ci = accommodation.imageUrls?.indexOf(accommodation.coverImage) ?? 0
    setCoverIndex(ci >= 0 ? ci : 0)
    const today = new Date(); today.setHours(0, 0, 0, 0)
    setAvailableDates(
      (accommodation.availabilities || [])
        .filter(a => a.isAvailable === true)
        .map(a => typeof a.availableDate === 'string' ? a.availableDate.slice(0, 10) : a.availableDate.toString())
        .filter(d => new Date(d) >= today)
    )
    setFormData({
      title: accommodation.title || '',
      description: accommodation.description || '',
      addressLine: accommodation.addressLine || '',
      city: accommodation.city || '',
      country: accommodation.country || '',
      postalCode: accommodation.postalCode || '',
      latitude: accommodation.latitude || '',
      longitude: accommodation.longitude || '',
      pricePerNight: accommodation.pricePerNight || '',
      maxGuests: accommodation.maxGuests || '',
      roomType: accommodation.roomType || '',
      rules: accommodation.rules || '',
      wifi: accommodation.facilities?.wifi || false,
      washing: accommodation.facilities?.washing || false,
      air: accommodation.facilities?.air || false,
      kitchen: accommodation.facilities?.kitchen || false
    })
    setIsActive(accommodation.status !== 'INACTIVE')
  }, [accommodation])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!id || !user?.id) return
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
      await accommodationService.updateAccommodation(id, accommodationData)
      return { success: true }
    } catch (error) {
      console.error('Error al actualizar alojamiento:', error)
      setError('Error al actualizar alojamiento. Por favor, intenta de nuevo.')
      return { success: false }
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    setDeleting(true)
    setError(null)
    try {
      await accommodationService.deleteAccommodation(id)
      
      // Actualizar usuario para reflejar posible cambio de rol a TRAVELER
      const updatedUser = await userService.getUserById(user.id)
      updateUser({
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profilePhotoUrl: updatedUser.profilePhotoUrl,
        roles: updatedUser.roles
      })
      
      navigate('/dashboard?tab=accommodations')
    } catch (error) {
      console.error('Error al eliminar alojamiento:', error)
      setError('Error al eliminar alojamiento. Por favor, intenta de nuevo.')
    } finally {
      setDeleting(false)
    }
  }

  return {
    loading, error, submitting, deleting,
    formData, setFormData,
    images, coverIndex,
    isActive, setIsActive,
    availableDates, setAvailableDates,
    calendarMonth, setCalendarMonth,
    newImageUrl, setNewImageUrl,
    handleChange, handleAddImageUrl, handleRemoveImage, handleSetCover, handleSubmit, handleDelete,
    hasImages
  }
}
