import React from 'react'

const GuestSelectorComponent = ({ formData, setFormData }) => {
  return (
    <div className="mb-4">
      <label htmlFor="maxGuests" className="form-label fw-semibold">Máximo de huéspedes *</label>
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn d-flex align-items-center justify-content-center guest-counter-btn guest-counter-btn-minus"
          onClick={() => setFormData(prev => ({ ...prev, maxGuests: Math.max(1, (parseInt(prev.maxGuests) || 1) - 1) }))}
        >−</button>
        <span className="fw-bold fs-4 guest-counter-value">{formData.maxGuests || 1}</span>
        <button
          type="button"
          className="btn d-flex align-items-center justify-content-center guest-counter-btn guest-counter-btn-plus"
          onClick={() => setFormData(prev => ({ ...prev, maxGuests: (parseInt(prev.maxGuests) || 1) + 1 }))}
        >+</button>
        <input type="hidden" name="maxGuests" value={formData.maxGuests} />
      </div>
    </div>
  )
}

export default GuestSelectorComponent
