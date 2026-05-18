import React from 'react'

const ROOM_TYPES = [
  { value: 'private', icon: 'bi-door-closed', label: 'Habitación privada' },
  { value: 'shared', icon: 'bi-people', label: 'Habitación compartida' }
]

const RoomTypeSelectorComponent = ({ formData, setFormData }) => {
  return (
    <>
      <label className="form-label fw-semibold">Tipo de habitación *</label>
      <div className="row g-3">
        {ROOM_TYPES.map(({ value, icon, label }) => (
          <div className="col-6" key={value}>
            <div
              className={`text-center p-3 rounded border service-card${formData.roomType === value ? ' active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, roomType: value }))}
            >
              <i className={`bi ${icon} service-card-icon-lg`}></i>
              <div className="mt-2 small fw-semibold">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default RoomTypeSelectorComponent
