import React from 'react'

const EmptySlot = () => {
  return (
    <div className="card h-100 border-0 bg-light" style={{ border: '2px dashed #e0e0e0', backgroundColor: '#fafafa' }}>
      <div className="card-body p-3 d-flex flex-column align-items-center justify-content-center text-center">
        <i 
          className="bi bi-plus-circle text-muted mb-2" 
          style={{ fontSize: '2rem', opacity: 0.5 }}
        ></i>
        <p className="text-muted small mb-0" style={{ opacity: 0.7 }}>
          Plaza libre
        </p>
      </div>
    </div>
  )
}

export default EmptySlot
