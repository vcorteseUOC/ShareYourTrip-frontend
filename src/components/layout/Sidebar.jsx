import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ activeTab }) => {
  const location = useLocation()
  const currentPath = location.pathname

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2', path: '/dashboard' },
    { id: 'bookings', label: 'Mis Reservas', icon: 'bi-calendar-check', path: '/dashboard/bookings' },
    { id: 'accommodations', label: 'Mis Alojamientos', icon: 'bi-house', path: '/dashboard/accommodations' },
    { id: 'messages', label: 'Mensajes', icon: 'bi-chat-dots', path: '/dashboard/messages' },
    { id: 'profile', label: 'Configuración', icon: 'bi-gear', path: '/dashboard/profile' },
  ]

  return (
    <div className="bg-white shadow" style={{ minHeight: 'calc(100vh - 56px)', width: '250px' }}>  
      <nav className="p-3">
        <ul className="nav flex-column gap-1">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded ${
                  activeTab === item.id ? 'background-color-shareyourtrip text-white' : 'text-muted'
                }`}
              >
                <i className={`bi ${item.icon} fs-5`}></i>
                <span className="fw-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto p-3 border-top">
        <Link 
          to="/"
          className="nav-link d-flex align-items-center gap-3 py-3 px-3 rounded text-muted"
        >
          <i className="bi bi-arrow-left fs-5"></i>
          <span className="fw-medium">Volver al inicio</span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
