import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'

const Dashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalAccommodations: 0,
    pendingRequests: 0
  })

  useEffect(() => {
    // Simular carga de estadísticas
    setStats({
      totalBookings: 12,
      totalAccommodations: 3,
      pendingRequests: 2
    })
  }, [])

  return (
    <div className="min-vh-100 bg-light">
      <Header />

      <div className="d-flex">
        <Sidebar activeTab={activeTab} />

        <main className="flex-grow-1">
          <div className="container py-5">
          {/* Welcome Section */}
          <div className="mb-5">
            <h1 className="display-5 fw-bold mb-2">Mi Dashboard</h1>
            <p className="text-muted">Bienvenido de nuevo, {user?.firstName || 'Usuario'}</p>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card shadow h-100 border-0">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="text-muted mb-0">Total Reservas</h6>
                    <i className="bi bi-calendar-check fs-4 color-shareyourtrip"></i>
                  </div>
                  <h3 className="fw-bold mb-0">{stats.totalBookings}</h3>
                  <p className="text-muted small mb-0">Reservas completadas</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow h-100 border-0">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="text-muted mb-0">Mis Alojamientos</h6>
                    <i className="bi bi-house fs-4 color-shareyourtrip"></i>
                  </div>
                  <h3 className="fw-bold mb-0">{stats.totalAccommodations}</h3>
                  <p className="text-muted small mb-0">Propiedades publicadas</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow h-100 border-0">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="text-muted mb-0">Solicitudes Pendientes</h6>
                    <i className="bi bi-clock fs-4 color-shareyourtrip"></i>
                  </div>
                  <h3 className="fw-bold mb-0">{stats.pendingRequests}</h3>
                  <p className="text-muted small mb-0">Requieren tu atención</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card shadow mb-5 border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Acciones Rápidas</h5>
              <div className="row g-3">
                <div className="col-md-3">
                  <button className="btn btn-action w-100 py-3">
                    <i className="bi bi-plus-circle me-2"></i>
                    Nuevo Alojamiento
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-action w-100 py-3">
                    <i className="bi bi-star me-2"></i>
                    Mis Reviews
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-action w-100 py-3">
                    <i className="bi bi-calendar3 me-2"></i>
                    Ver Reservas
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-action w-100 py-3">
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
                <a href="#" className="text-decoration-none color-shareyourtrip">Ver todas</a>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Alojamiento</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Apartamento Barcelona Centro</td>
                      <td>15-20 May 2026</td>
                      <td><span className="badge bg-success">Confirmada</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">Ver detalles</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Casa en Valencia</td>
                      <td>1-5 Jun 2026</td>
                      <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">Ver detalles</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

export default Dashboard
