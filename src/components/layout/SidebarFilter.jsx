import React from 'react'
import { getFilterRoomTypeOptions } from '../../utils/roomTypeUtils'

const SidebarFilter = ({ filters, handleFilterChange, handleServiceFilterChange, applyFilters }) => {
  return (
    <div className="card shadow">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4">Filtros</h5>

        {/* Room Type Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Tipo de habitación</h6>
          <select 
            className="form-select"
            value={filters.roomType}
            onChange={(e) => handleFilterChange('roomType', e.target.value)}
          >
            {getFilterRoomTypeOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Slider */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Precio máximo</h6>
          <div className="mb-2">
            <input 
              type="range" 
              className="form-range" 
              min="0" 
              max="500" 
              step="10"
              value={filters.maxPrice || 0}
              onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
            />
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted small">€0</span>
            <span className="fw-bold color-shareyourtrip">€{filters.maxPrice || 0}</span>
            <span className="text-muted small">€500</span>
          </div>
        </div>

        {/* Services Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Servicios</h6>
          <div className="form-check mb-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="wifi"
              checked={filters.services.wifi}
              onChange={(e) => handleServiceFilterChange('wifi', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="wifi">
              <i className="bi bi-wifi me-2"></i>Wifi
            </label>
          </div>
          <div className="form-check mb-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="lavadora"
              checked={filters.services.lavadora}
              onChange={(e) => handleServiceFilterChange('lavadora', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="lavadora">
              <i className="bi bi-water me-2"></i>Lavadora
            </label>
          </div>
          <div className="form-check mb-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="aire"
              checked={filters.services.aireAcondicionado}
              onChange={(e) => handleServiceFilterChange('aireAcondicionado', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="aire">
              <i className="bi bi-snow me-2"></i>Aire acondicionado
            </label>
          </div>
          <div className="form-check mb-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="cocina"
              checked={filters.services.cocina}
              onChange={(e) => handleServiceFilterChange('cocina', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="cocina">
              <i className="bi bi-egg-fried me-2"></i>Cocina
            </label>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Valoración mínima</h6>
          <select 
            className="form-select"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            <option value="all">Todas las valoraciones</option>
            <option value="5">5 estrellas</option>
            <option value="4">4+ estrellas</option>
            <option value="3">3+ estrellas</option>
            <option value="2">2+ estrellas</option>
          </select>
        </div>

        {/* Language Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Idioma</h6>
          <select 
            className="form-select"
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
          >
            <option value="all">Todos los idiomas</option>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="it">Italiano</option>
          </select>
        </div>

        <button className="btn btn-action w-100 py-2" onClick={applyFilters}>
          Aplicar filtros
        </button>
      </div>
    </div>
  )
}

export default SidebarFilter
