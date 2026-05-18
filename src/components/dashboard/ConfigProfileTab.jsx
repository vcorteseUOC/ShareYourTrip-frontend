import React, { useState } from 'react'
import { useConfigProfileTab } from '../../hooks/useConfigProfileTab'
import ProfilePicSelectorComponent from '../form/ProfilePicSelectorComponent'
import PasswordComponent from '../form/PasswordComponent'

const ConfigProfileTab = () => {
  const { formData, handleChange, handleSubmit, submitting, loading, error, email, createdAt } = useConfigProfileTab()
  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })
    : null
  const [showSuccess, setShowSuccess] = useState(false)
  const [showToastError, setShowToastError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const passwordMismatch = password && passwordConfirm && password !== passwordConfirm

  const onSubmit = async (e) => {
    if (passwordMismatch) return
    const result = await handleSubmit(e, password || null)
    if (result?.success) {
      setShowSuccess(true)
      setPassword('')
      setPasswordConfirm('')
      setTimeout(() => window.location.reload(), 2000)
    } else {
      setShowToastError(true)
      setTimeout(() => setShowToastError(false), 3000)
    }
  }

  return (
    <>
      {/* Header */}
      <div className="mb-4">
        <h1 className="display-5 fw-bold mb-2">Mi Perfil</h1>
        <p className="text-muted mb-0">Gestiona tu información personal</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : null}

      <form onSubmit={onSubmit} style={{ display: loading ? 'none' : 'block' }}>
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom py-3">
            <h5 className="mb-0 fw-bold">
              <i className="bi bi-person me-2 color-shareyourtrip"></i>
              Información personal
            </h5>
          </div>
          <div className="card-body p-4">

            <div className="row g-4">

              {/* Columna izquierda: avatar */}
              <div className="col-lg-4 d-flex flex-column align-items-center text-center">
                <ProfilePicSelectorComponent
                  photoUrl={formData.profilePhotoUrl}
                  onPhotoChange={(url) => handleChange({ target: { name: 'profilePhotoUrl', value: url } })}
                />
              </div>

              {/* Columna derecha: campos personales + email */}
              <div className="col-lg-8">

                {/* Bloque identidad */}
                <div className="d-flex align-items-center gap-3 p-3 rounded-3 mb-4 bg-light border">
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-semibold">
                      <i className="bi bi-envelope color-shareyourtrip me-2"></i>
                      {email}
                    </p>
                    {memberSince && (
                      <p className="mb-0 text-muted small mt-1">
                        <i className="bi bi-calendar3 me-2"></i>
                        Miembro desde {memberSince}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label fw-semibold">Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label fw-semibold">Apellidos *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label fw-semibold">Teléfono</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="birthDate" className="form-label fw-semibold">Fecha de nacimiento</label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

            </div>

            <hr className="my-4" />

            {/* Idioma + Contraseña en la misma fila */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <div className="row g-3">
                  <div className="col-lg-6">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-translate me-2 color-shareyourtrip"></i>
                      Idioma
                    </h6>
                    <select
                      className="form-select"
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un idioma</option>
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">Italiano</option>
                      <option value="pt">Português</option>
                    </select>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-shield-lock me-2 color-shareyourtrip"></i>
                      Cambiar contraseña
                    </h6>
                    <PasswordComponent
                      password={password}
                      passwordConfirm={passwordConfirm}
                      onPasswordChange={setPassword}
                      onPasswordConfirmChange={setPasswordConfirm}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Sobre mí */}
            <div className="row g-3">
              <div className="col-12">
                <h6 className="fw-bold mb-3">
                  <i className="bi bi-chat-quote me-2 color-shareyourtrip"></i>
                  Sobre mí
                </h6>
              </div>
              <div className="col-12">
                <textarea
                  className="form-control"
                  id="bio"
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Cuéntanos algo sobre ti..."
                />
              </div>
            </div>

          </div>
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="submit"
            className="btn btn-action"
            disabled={submitting || !!passwordMismatch}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg me-2"></i>
                Guardar cambios
              </>
            )}
          </button>
        </div>

      </form>

      {/* Toasts */}
      {showSuccess && (
        <div
          className="alert alert-success position-fixed m-3"
          style={{ bottom: '0', right: '0', zIndex: 9999, minWidth: '300px' }}
          role="alert"
        >
          <i className="bi bi-check-circle me-2"></i>
          Perfil actualizado correctamente
        </div>
      )}
      {showToastError && (
        <div
          className="alert alert-danger position-fixed m-3"
          style={{ bottom: '0', right: '0', zIndex: 9999, minWidth: '300px' }}
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2"></i>
          Error al actualizar el perfil
        </div>
      )}
    </>
  )
}

export default ConfigProfileTab
