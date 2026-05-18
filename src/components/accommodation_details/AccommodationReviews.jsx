import React from 'react'
import ReviewCard from '../common/ReviewCard'
import ReviewsFilter from './ReviewsFilter'

const AccommodationReviews = ({ 
  accommodation, 
  filteredReviews, 
  visibleReviews, 
  showFilters, 
  setShowFilters, 
  filterRating, 
  setFilterRating, 
  filterOrder, 
  setFilterOrder, 
  setVisibleReviews
}) => {
  return (
    <div className="card-body p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h5 className="fw-bold mb-0">Opiniones de otros viajeros</h5>
        <div className="position-relative">
          <button 
            className="btn btn-link p-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="bi bi-three-dots-vertical text-muted" style={{ fontSize: '1.25rem' }}></i>
          </button>
          {showFilters && (
            <ReviewsFilter 
              filterRating={filterRating}
              setFilterRating={setFilterRating}
              filterOrder={filterOrder}
              setFilterOrder={setFilterOrder}
            />
          )}
        </div>
      </div>
      
      <div className="text-center mb-4">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`bi bi-star-fill ${i < Math.floor(accommodation.rating) ? 'text-warning' : 'text-muted'}`}
              style={{ fontSize: '2rem' }}
            ></i>
          ))}
          <span className="h2 fw-bold ms-2">{accommodation.rating}</span>
        </div>
        <p className="text-muted">Basado en {accommodation.reviews} valoraciones</p>
      </div>

      <div className="row g-4">
        {filteredReviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="col-md-6 col-lg-4">
            <ReviewCard 
              review={review}
            />
          </div>
        ))}
      </div>

      {visibleReviews < filteredReviews.length && (
        <button 
          className="btn btn-outline-secondary mt-4"
          onClick={() => setVisibleReviews(prev => prev + 3)}
        >
          Ver más opiniones
        </button>
      )}
    </div>
  )
}

export default AccommodationReviews
