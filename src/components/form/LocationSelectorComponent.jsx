import React, { useRef, useEffect } from 'react'
import { useLocationSelector } from './useLocationSelector'

const LocationSelectorComponent = ({ formData, setFormData, onOpenMap }) => {
  const { query, setQuery, suggestions, loading, selected, showDropdown, setShowDropdown, handleSelect, handleClear } =
    useLocationSelector(setFormData)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setShowDropdown])

  const hasCoords = formData.latitude && formData.longitude

  return (
    <>
      <label className="form-label fw-semibold mb-2">Ubicación</label>

      <div className="position-relative mb-2" ref={wrapperRef}>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-white">
            {loading
              ? <span className="spinner-border spinner-border-sm text-secondary" style={{ width: '14px', height: '14px' }}></span>
              : <i className="bi bi-search text-muted"></i>
            }
          </span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Busca una dirección..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            autoComplete="off"
          />
          {query && (
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClear} tabIndex={-1}>
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>

        {showDropdown && (
          <ul className="list-group position-absolute w-100 shadow-sm" style={{ zIndex: 1000, top: '100%', maxHeight: '220px', overflowY: 'auto' }}>
            {suggestions.map(place => (
              <li
                key={place.place_id}
                className="list-group-item list-group-item-action py-2 px-3"
                style={{ cursor: 'pointer', fontSize: '0.82rem' }}
                onMouseDown={() => handleSelect(place)}
              >
                <i className="bi bi-geo-alt me-2 text-muted"></i>
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div className="d-flex align-items-center gap-2 mb-2 px-1">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '0.85rem' }}></i>
          <span className="text-muted small text-truncate">{formData.city}{formData.country ? `, ${formData.country}` : ''}</span>
          {formData.postalCode && <span className="badge bg-light text-muted border small">{formData.postalCode}</span>}
        </div>
      )}

      <button
        type="button"
        className="btn btn-sm w-100 map-location-btn mb-3"
        onClick={onOpenMap}
        disabled={!hasCoords}
        title={!hasCoords ? 'Busca y selecciona una dirección primero' : 'Ver ubicación en el mapa'}
      >
        <i className="bi bi-map me-2"></i>
        Previsualizar en mapa
      </button>
    </>
  )
}

export default LocationSelectorComponent
