import React, { useState } from 'react'

const ProfilePicSelectorComponent = ({ photoUrl, onPhotoChange }) => {
  const [pendingUrl, setPendingUrl] = useState('')

  return (
    <>
      <div className="mb-3 position-relative">
        {photoUrl ? (
          <>
            <img
              src={photoUrl}
              alt="Foto de perfil"
              className="rounded-circle"
              style={{ width: '110px', height: '110px', objectFit: 'cover' }}
            />
            <button
              type="button"
              className="position-absolute top-0 end-0 btn btn-sm p-0 d-flex align-items-center justify-content-center image-card-remove-btn"
              onClick={() => onPhotoChange('')}
              title="Eliminar foto de perfil"
            >
              <i className="bi bi-x text-white"></i>
            </button>
          </>
        ) : (
          <div
            className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
            style={{ width: '110px', height: '110px' }}
          >
            <i className="bi bi-person-fill" style={{ fontSize: '3.2rem', color: '#adb5bd' }}></i>
          </div>
        )}
      </div>
      <div className="input-group input-group-sm w-100 mb-1">
        <input
          type="url"
          className="form-control form-control-sm"
          placeholder="https://..."
          value={pendingUrl}
          onChange={e => setPendingUrl(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-sm image-url-add-btn"
          onClick={() => {
            if (pendingUrl.trim()) {
              onPhotoChange(pendingUrl.trim())
              setPendingUrl('')
            }
          }}
          title="Aplicar foto de perfil"
        >
          <i className="bi bi-arrow-up-circle"></i>
        </button>
      </div>
      <p className="text-muted small mb-0">Introduce una URL y pulsa subir</p>
    </>
  )
}

export default ProfilePicSelectorComponent
