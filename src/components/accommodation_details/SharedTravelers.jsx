import React from 'react'
import TravelerCard from '../common/TravelerCard'
import EmptySlot from '../common/EmptySlot'

const SharedTravelers = ({ accommodation, getColumnClass }) => {
  return (
    <div className="card shadow border-0 mt-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4">Otros viajeros con los que compartirás la experiencia</h5>
        <div className="row g-3">
          {accommodation.travelers && accommodation.travelers.length > 0 ? (
            <>
              {accommodation.travelers.map((traveler) => (
                <div key={traveler.id} className={getColumnClass(accommodation.totalGuests)}>
                  <TravelerCard 
                    traveler={traveler} 
                  />
                </div>
              ))}
              {[...Array((accommodation.totalGuests || 0) - accommodation.travelers.length)].map((_, i) => (
                <div key={`empty-${i}`} className={getColumnClass(accommodation.totalGuests)}>
                  <EmptySlot />
                </div>
              ))}
            </>
          ) : (
            [...Array(accommodation.totalGuests || 0)].map((_, i) => (
              <div key={`empty-${i}`} className={getColumnClass(accommodation.totalGuests || 0)}>
                <EmptySlot />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SharedTravelers
