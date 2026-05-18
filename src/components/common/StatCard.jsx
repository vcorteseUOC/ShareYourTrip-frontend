import React from 'react'

const StatCard = ({ title, value, description, icon }) => {
  return (
    <div className="card shadow h-100 border-0">
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="text-muted mb-0">{title}</h6>
          <i className={`bi bi-${icon} fs-4 color-shareyourtrip`}></i>
        </div>
        <h3 className="fw-bold mb-0">{value}</h3>
        <p className="text-muted small mb-0">{description}</p>
      </div>
    </div>
  )
}

export default StatCard
