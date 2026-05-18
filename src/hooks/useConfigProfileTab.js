import { useState, useEffect } from 'react'
import { userService } from '../services/userService'
import { useAuth } from '../context/AuthContext'

export const useConfigProfileTab = () => {
  const { user: authUser, updateUser } = useAuth()

  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fullUser, setFullUser] = useState(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    profilePhotoUrl: '',
    bio: '',
    language: '',
    birthDate: ''
  })

  useEffect(() => {
    if (!authUser?.id) return
    userService.getUserById(authUser.id).then(data => {
      setFullUser(data)
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        profilePhotoUrl: data.profilePhotoUrl || '',
        bio: data.bio || '',
        language: data.language || '',
        birthDate: data.birthDate ? data.birthDate.slice(0, 10) : ''
      })
    }).catch(() => {}).finally(() => setLoading(false))
  }, [authUser?.id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e, password = null) => {
    e.preventDefault()
    if (!authUser?.id) return
    setSubmitting(true)
    setError(null)
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || null,
        profilePhotoUrl: formData.profilePhotoUrl || null,
        bio: formData.bio || null,
        language: formData.language || null,
        birthDate: formData.birthDate || null
      }
      if (password) payload.password = password
      const updated = await userService.updateUser(authUser.id, payload)
      updateUser({
        firstName: updated.firstName,
        lastName: updated.lastName,
        profilePhotoUrl: updated.profilePhotoUrl
      })
      return { success: true }
    } catch (err) {
      console.error('Error al actualizar perfil:', err)
      setError('Error al actualizar el perfil. Por favor, intenta de nuevo.')
      return { success: false }
    } finally {
      setSubmitting(false)
    }
  }

  return {
    formData, handleChange, handleSubmit,
    submitting, loading, error,
    email: fullUser?.email || authUser?.email || '',
    createdAt: fullUser?.createdAt || null
  }
}
