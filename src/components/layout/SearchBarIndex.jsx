import React from 'react'

const SearchBarIndex = ({ searchParams, handleSearch, handleInputChange }) => {
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value
    handleInputChange('checkIn', newCheckIn)
    // Si checkIn es posterior a checkOut, resetear checkOut
    if (newCheckIn && searchParams.checkOut && new Date(newCheckIn) >= new Date(searchParams.checkOut)) {
      handleInputChange('checkOut', '')
    }
  }

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value
    handleInputChange('checkOut', newCheckOut)
    // Si checkOut es inferior a checkIn, resetear checkIn
    if (newCheckOut && searchParams.checkIn && new Date(newCheckOut) <= new Date(searchParams.checkIn)) {
      handleInputChange('checkIn', '')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSearch}>
      <div className="card shadow-lg border-0" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div className="card-body p-0">
          <div className="row g-0 align-items-center">
            <div className="col-md-3">
              <div className="p-4 border-end">
                <label className="form-label small text-muted mb-1">Destino</label>
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt me-2 text-muted"></i>
                  <input 
                    type="text" 
                    className="form-control border-0 p-0 fw-medium" 
                    placeholder="¿A dónde vas?"
                    style={{ backgroundColor: 'transparent' }}
                    value={searchParams.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border-end">
                <label className="form-label small text-muted mb-1">Check-in</label>
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar me-2 text-muted"></i>
                  <input 
                    type="date" 
                    className="form-control border-0 p-0 fw-medium"
                    style={{ backgroundColor: 'transparent' }}
                    value={searchParams.checkIn}
                    min={today}
                    onChange={handleCheckInChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border-end">
                <label className="form-label small text-muted mb-1">Check-out</label>
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar me-2 text-muted"></i>
                  <input 
                    type="date" 
                    className="form-control border-0 p-0 fw-medium"
                    style={{ backgroundColor: 'transparent' }}
                    value={searchParams.checkOut}
                    min={searchParams.checkIn || today}
                    onChange={handleCheckOutChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="p-4 border-end">
                <label className="form-label small text-muted mb-1">Huéspedes</label>
                <div className="d-flex align-items-center">
                  <i className="bi bi-people me-2 text-muted"></i>
                  <select 
                    className="form-select border-0 p-0 fw-medium" 
                    style={{ backgroundColor: 'transparent' }}
                    value={searchParams.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                  >
                    <option value="1">1 huésped</option>
                    <option value="2">2 huéspedes</option>
                    <option value="3">3 huéspedes</option>
                    <option value="4">4 huéspedes</option>
                    <option value="5">5+ huéspedes</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-1">
              <div className="p-4">
                <button type="submit" className="btn btn-lg w-100 border-0" style={{ backgroundColor: 'white' }}>
                  <i className="bi bi-search color-shareyourtrip" style={{ fontSize: '1.5rem' }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SearchBarIndex
