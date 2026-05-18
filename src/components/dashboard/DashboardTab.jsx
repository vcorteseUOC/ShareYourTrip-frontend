import React from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '../common/StatCard'

const DashboardTab = ({ user, stats, recentBookings, onTabChange }) => {
  const navigate = useNavigate()
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-5">
        <h1 className="display-5 fw-bold mb-2">Mi Dashboard</h1>
        <p className="text-muted">Bienvenido de nuevo, {user?.firstName || 'Usuario'}</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <StatCard 
            title="Total Reservas"
            value={stats.totalBookings}
            description="Reservas completadas"
            icon="calendar-check"
          />
        </div>
        <div className="col-md-4">
          <StatCard 
            title="Reviews Recibidas"
            value={stats.totalReviews}
            description="Reviews recibidas"
            icon="star"
          />
        </div>
        <div className="col-md-4">
          <StatCard 
            title="Solicitudes Pendientes"
            value={stats.pendingRequests}
            description="Reservas pendientes de aprobación"
            icon="clock-history"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card shadow border-0 mb-5">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">Acciones Rápidas</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <button className="btn btn-action w-100 py-3" onClick={() => navigate('/create-accommodation')}>
                <i className="bi bi-plus-circle me-2"></i>
                Nuevo Alojamiento
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn btn-action w-100 py-3" onClick={() => onTabChange('reviews')}>
                <i className="bi bi-star me-2"></i>
                Mis Reviews
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn btn-action w-100 py-3" onClick={() => onTabChange('bookings')}>
                <i className="bi bi-calendar3 me-2"></i>
                Ver Reservas
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn btn-action w-100 py-3" onClick={() => onTabChange('messages')}>
                <i className="bi bi-chat-dots me-2"></i>
                Mensajes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">Reservas Recientes</h5>
            <button className="btn btn-link text-decoration-none" onClick={() => onTabChange('bookings')}>
              Ver todas <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Alojamiento</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Estado</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={booking.accommodationImage} 
                            alt={booking.accommodationName}
                            className="rounded me-3"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                          <div>
                            <div>{booking.accommodationName}</div>
                          </div>
                        </div>
                      </td>
                      <td>{booking.checkIn}</td>
                      <td>{booking.checkOut}</td>
                      <td>
                        {booking.status === 'pending' && <span className="badge bg-warning text-dark">Pendiente</span>}
                        {booking.status === 'accepted' && <span className="badge bg-success">Confirmada</span>}
                        {booking.status === 'cancelled' && <span className="badge bg-danger">Cancelada</span>}
                        {booking.status === 'completed' && <span className="badge bg-info">Completada</span>}
                      </td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {booking.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <p className="text-muted mb-0">No tienes reservas recientes</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardTab