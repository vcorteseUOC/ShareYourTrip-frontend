import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserAvatar from '../common/UserAvatar'
import AccommodationCard from '../common/AccommodationCard'
import { getLanguageFlag, getLanguageName } from '../../utils/languageUtils'

const ResultsSearchGrid = ({ 
  loading, 
  error, 
  accommodations, 
  currentAccommodations, 
  totalPages, 
  currentPage, 
  handlePreviousPage, 
  handlePageChange, 
  handleNextPage,
  searchParams
}) => {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="col-lg-9">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-lg-9">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  if (accommodations.length === 0) {
    return (
      <div className="col-lg-9">
        <div className="text-center py-5">
          <i className="bi bi-search fs-1 text-muted mb-3"></i>
          <p className="text-muted">No se encontraron alojamientos con los criterios especificados</p>
        </div>
      </div>
    )
  }

  return (
    <div className="col-lg-9">
      <div className="row g-4">
        {currentAccommodations.map((accommodation, index) => (
          <div key={accommodation.id} className="col-md-6 col-lg-4">
            <AccommodationCard 
              accommodation={accommodation}
              index={index}
              searchParams={searchParams}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-5">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePreviousPage() }}>
                Anterior
              </a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <a 
                  className="page-link background-color-shareyourtrip border-0" 
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(index + 1) }}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handleNextPage() }}>
                Siguiente
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

export default ResultsSearchGrid
