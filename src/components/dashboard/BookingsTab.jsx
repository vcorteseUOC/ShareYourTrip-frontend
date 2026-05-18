import React from 'react'
import BookingCard from '../common/BookingCard'

const BookingsTab = ({ 
  user,
  bookingTab, 
  setBookingTab, 
  filteredHostBookings, 
  filteredHostBookingHistory, 
  filteredTravelerBookings, 
  filteredTravelerBookingHistory,
  searchName,
  setSearchName,
  searchDate,
  setSearchDate,
  searchStatus,
  setSearchStatus,
  reloadBookings
}) => {
  const isHost = user?.roles?.includes('HOST')
  const isTraveler = user?.roles?.includes('TRAVELER')
  
  // Si no es host, seleccionar automáticamente traveler
  React.useEffect(() => {
    if (!isHost && isTraveler && bookingTab === 'host') {
      setBookingTab('traveler')
    }
  }, [isHost, isTraveler, bookingTab, setBookingTab])

  return (
    <>
      {/* My Bookings Section */}
      <div className="mb-5">
        <h1 className="display-5 fw-bold mb-2">Mis Reservas</h1>
        <p className="text-muted">Gestiona tus reservas como host y como viajero</p>
      </div>

      <div className="card shadow border-0">
        <div className="card-body p-4">
          {/* Tabs con barrita naranja */}
          <div className="mb-4">
            <div className="d-flex gap-4 position-relative">
              {isHost && (
                <button 
                  className={`btn p-0 border-0 bg-transparent fw-semibold position-relative ${
                    bookingTab === 'host' ? 'text-shareyourtrip' : 'text-muted'
                  }`}
                  onClick={() => setBookingTab('host')}
                >
                  <span className="pb-1">Soy Host</span>
                  {bookingTab === 'host' && (
                    <div className="tab-indicator"></div>
                  )}
                </button>
              )}
              <button 
                className={`btn p-0 border-0 bg-transparent fw-semibold position-relative ${
                  bookingTab === 'traveler' ? 'text-shareyourtrip' : 'text-muted'
                }`}
                onClick={() => setBookingTab('traveler')}
              >
                <span className="pb-1">Soy Viajero</span>
                {bookingTab === 'traveler' && (
                  <div className="tab-indicator"></div>
                )}
              </button>
            </div>
          </div>

          {/* Search Filters */}
          <div className="mb-4">
            <div className="card bg-light border-0">
              <div className="card-body p-3">
                <div className="row g-3">
                  <div className="col-md-4">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Buscar por nombre"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <input 
                      type="date" 
                      className="form-control"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <select 
                      className="form-select"
                      value={searchStatus}
                      onChange={(e) => setSearchStatus(e.target.value)}
                    >
                      <option value="">Todos los estados</option>
                      <option value="pending">Pendiente</option>
                      <option value="accepted">Confirmada</option>
                      <option value="cancelled">Cancelada</option>
                      <option value="completed">Completada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {bookingTab === 'host' && (
              <div className="tab-pane fade show active">
                {/* Reservas activas */}
                <h6 className="fw-semibold mb-3 text-muted">Reservas Activas</h6>
                {filteredHostBookings.length > 0 ? (
                  filteredHostBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} type="host" onStatusChange={reloadBookings} />
                  ))
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
                    <p className="text-muted">No tienes reservas pendientes como host</p>
                  </div>
                )}
                
                {/* Historial de reservas */}
                <div className="mt-5 pt-4 border-top">
                  <h6 className="fw-semibold mb-3 text-muted">Historial de Reservas</h6>
                  {filteredHostBookingHistory.length > 0 ? (
                    filteredHostBookingHistory.map(booking => (
                      <BookingCard key={booking.id} booking={booking} type="host" isHistory={true} onStatusChange={reloadBookings} />
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-clock-history fs-1 text-muted mb-3"></i>
                      <p className="text-muted">No tienes reservas en el historial</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {bookingTab === 'traveler' && (
              <div className="tab-pane fade show active">
                {/* Reservas activas */}
                <h6 className="fw-semibold mb-3 text-muted">Reservas Activas</h6>
                {filteredTravelerBookings.length > 0 ? (
                  filteredTravelerBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} type="traveler" />
                  ))
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-suitcase fs-1 text-muted mb-3"></i>
                    <p className="text-muted">No tienes reservas pendientes como viajero</p>
                  </div>
                )}
                
                {/* Historial de reservas */}
                <div className="mt-5 pt-4 border-top">
                  <h6 className="fw-semibold mb-3 text-muted">Historial de Reservas</h6>
                  {filteredTravelerBookingHistory.length > 0 ? (
                    filteredTravelerBookingHistory.map(booking => (
                      <BookingCard key={booking.id} booking={booking} type="traveler" isHistory={true} />
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-clock-history fs-1 text-muted mb-3"></i>
                      <p className="text-muted">No tienes reservas en el historial</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingsTab