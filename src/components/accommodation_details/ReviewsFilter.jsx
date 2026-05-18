import React from 'react'

const ReviewsFilter = ({ filterRating, setFilterRating, filterOrder, setFilterOrder }) => {
  return (
    <div className="position-absolute end-0 mt-2 card shadow" style={{ zIndex: 1000, minWidth: '280px' }}>
      <div className="card-body p-3">
        <h6 className="fw-semibold mb-3">Filtrar por valoración</h6>
        <div className="d-flex flex-column gap-2 mb-4">
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="rating" 
              value="all"
              checked={filterRating === 'all'}
              onChange={(e) => setFilterRating(e.target.value)}
            />
            <small>Todas</small>
          </label>
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="rating" 
              value="5"
              checked={filterRating === '5'}
              onChange={(e) => setFilterRating(e.target.value)}
            />
            <small>5 estrellas</small>
          </label>
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="rating" 
              value="4"
              checked={filterRating === '4'}
              onChange={(e) => setFilterRating(e.target.value)}
            />
            <small>4 estrellas</small>
          </label>
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="rating" 
              value="3"
              checked={filterRating === '3'}
              onChange={(e) => setFilterRating(e.target.value)}
            />
            <small>3 estrellas</small>
          </label>
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="rating" 
              value="2"
              checked={filterRating === '2'}
              onChange={(e) => setFilterRating(e.target.value)}
            />
            <small>2 estrellas</small>
          </label>
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="rating" 
              value="1"
              checked={filterRating === '1'}
              onChange={(e) => setFilterRating(e.target.value)}
            />
            <small>1 estrella</small>
          </label>
        </div>

        <h6 className="fw-semibold mb-3">Ordenar por</h6>
        <div className="d-flex flex-column gap-2">
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="order" 
              value="recent"
              checked={filterOrder === 'recent'}
              onChange={(e) => setFilterOrder(e.target.value)}
            />
            <small>Más recientes</small>
          </label>
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="order" 
              value="oldest"
              checked={filterOrder === 'oldest'}
              onChange={(e) => setFilterOrder(e.target.value)}
            />
            <small>Más antiguas</small>
          </label>
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="order" 
              value="highest"
              checked={filterOrder === 'highest'}
              onChange={(e) => setFilterOrder(e.target.value)}
            />
            <small>Mayor valoración</small>
          </label>
          <label className="d-flex align-items-center gap-2">
            <input 
              type="radio" 
              name="order" 
              value="lowest"
              checked={filterOrder === 'lowest'}
              onChange={(e) => setFilterOrder(e.target.value)}
            />
            <small>Menor valoración</small>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ReviewsFilter
