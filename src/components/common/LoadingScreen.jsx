import React from 'react'

const LoadingScreen = ({ message = 'Cargando...' }) => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <h4 className="text-muted">{message}</h4>
      </div>
    </div>
  )
}

export default LoadingScreen
