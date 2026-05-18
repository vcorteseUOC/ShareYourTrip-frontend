import { useState, useEffect, useRef } from 'react'

export const useLocationSelector = (setFormData) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
        const res = await fetch(url)
        const data = await res.json()
        setSuggestions(data)
        setShowDropdown(data.length > 0)
      } catch {
        setSuggestions([])
        setShowDropdown(false)
      } finally {
        setLoading(false)
      }
    }, 600)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  const handleSelect = (place) => {
    setSelected(place)
    setQuery(place.display_name)
    setShowDropdown(false)
    setSuggestions([])

    const addr = place.address || {}
    setFormData(prev => ({
      ...prev,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
      addressLine: [addr.road, addr.house_number].filter(Boolean).join(' ') || '',
      city: addr.city || addr.town || addr.village || addr.municipality || '',
      country: addr.country || '',
      postalCode: addr.postcode || ''
    }))
  }

  const handleClear = () => {
    setQuery('')
    setSelected(null)
    setSuggestions([])
    setShowDropdown(false)
    setFormData(prev => ({
      ...prev,
      latitude: '', longitude: '',
      addressLine: '', city: '', country: '', postalCode: ''
    }))
  }

  return {
    query, setQuery,
    suggestions,
    loading,
    selected,
    showDropdown, setShowDropdown,
    handleSelect, handleClear
  }
}
