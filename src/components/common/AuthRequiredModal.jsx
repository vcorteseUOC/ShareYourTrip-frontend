import React from 'react'

const AuthRequiredModal = ({ show, onClose, onLogin }) => {
  if (!show) return null

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-5 text-center">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{ 
                width: '80px', 
                height: '80px',
                backgroundColor: 'rgba(249, 90, 19, 0.1)',
                color: '#f95a13'
              }}
            >
              <i className="bi bi-lock-fill fs-2"></i>
            </div>
            <h4 className="fw-bold mb-3">¡Inicia sesión para continuar!</h4>
            <p className="text-muted mb-4">
              Para enviar mensajes o realizar reservas, necesitas tener una sesión activa en ShareYourTrip.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button 
                className="btn btn-outline-secondary px-4"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-action px-4"
                onClick={onLogin}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Iniciar sesión
              </button>
            </div>
            <p className="text-muted small mt-4 mb-0">
              ¿No tienes cuenta? <a href="/login" className="text-decoration-none fw-semibold" style={{ color: '#f95a13' }}>Regístrate gratis</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthRequiredModal
