import React, { useState } from 'react'

const SearchBar = ({ searchParams, handleSearchBarSubmit, handleSearchBarChange }) => {
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value
    handleSearchBarChange('checkIn', newCheckIn)
    // Si checkIn es posterior a checkOut, resetear checkOut
    if (newCheckIn && searchParams.checkOut && new Date(newCheckIn) >= new Date(searchParams.checkOut)) {
      handleSearchBarChange('checkOut', '')
    }
  }

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value
    handleSearchBarChange('checkOut', newCheckOut)
    // Si checkOut es inferior a checkIn, resetear checkIn
    if (newCheckOut && searchParams.checkIn && new Date(newCheckOut) <= new Date(searchParams.checkIn)) {
      handleSearchBarChange('checkIn', '')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSearchBarSubmit}>
      <div className="card shadow mb-4">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="¿A dónde vas?"
                value={searchParams.city}
                onChange={(e) => handleSearchBarChange('city', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input 
                type="date" 
                className="form-control"
                value={searchParams.checkIn || ''}
                min={today}
                onChange={handleCheckInChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input 
                type="date" 
                className="form-control"
                value={searchParams.checkOut || ''}
                min={searchParams.checkIn || today}
                onChange={handleCheckOutChange}
                required
              />
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={searchParams.guests}
                onChange={(e) => handleSearchBarChange('guests', parseInt(e.target.value))}
              >
                <option value={1}>1 huésped</option>
                <option value={2}>2 huéspedes</option>
                <option value={3}>3 huéspedes</option>
                <option value={4}>4 huéspedes</option>
                <option value={5}>5+ huéspedes</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
