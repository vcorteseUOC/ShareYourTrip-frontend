import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const useIndex = () => {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '1'
  })
  const [loading, setLoading] = useState(false)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current)
      }
    }
  }, [])

  const heroOpacity = Math.max(0, 1 - scrollY / 400)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Establecer fechas por defecto si no se proporcionan
      const today = new Date().toISOString().split('T')[0]
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
      
      const checkInValue = searchParams.checkIn || today
      const checkOutValue = searchParams.checkOut || tomorrow
      
      navigate('/search', { 
        state: {
          city: searchParams.destination,
          checkIn: checkInValue,
          checkOut: checkOutValue,
          guests: parseInt(searchParams.guests),
          filters: {
            roomType: 'all',
            maxPrice: null,
            services: {
              wifi: false,
              lavadora: false,
              aireAcondicionado: false,
              cocina: false
            },
            language: 'all'
          }
        }
      })
    } catch (error) {
      console.error('Error al navegar a búsqueda:', error)
      alert('Error al navegar a búsqueda. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDestinationClick = async (city) => {
    setLoading(true)
    try {
      // Establecer fechas por defecto (hoy y mañana)
      const today = new Date().toISOString().split('T')[0]
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
      
      navigate('/search', { 
        state: {
          city: city,
          checkIn: today,
          checkOut: tomorrow,
          guests: 1,
          filters: {
            roomType: 'all',
            maxPrice: 500,
            services: {
              wifi: false,
              lavadora: false,
              aireAcondicionado: false,
              cocina: false
            },
            language: 'all'
          }
        }
      })
    } catch (error) {
      console.error('Error al navegar a búsqueda:', error)
      alert('Error al navegar a búsqueda. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return {
    scrollY,
    statsVisible,
    ctaVisible,
    searchParams,
    loading,
    statsRef,
    ctaRef,
    heroOpacity,
    handleSearch,
    handleInputChange,
    handleDestinationClick,
    setLoading
  }
}
