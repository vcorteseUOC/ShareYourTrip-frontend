import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { id: 'bookings', label: 'Mis Reservas', icon: 'bi-calendar-check' },
    { id: 'reviews', label: 'Mis Reviews', icon: 'bi-star' },
    { id: 'accommodations', label: 'Mis Alojamientos', icon: 'bi-house' },
    { id: 'messages', label: 'Mensajes', icon: 'bi-chat-dots' },
    { id: 'profile', label: 'Configuración', icon: 'bi-gear' },
  ]

  const handleTabClick = (e, tabId) => {
    e.preventDefault()
    if (setActiveTab) {
      setActiveTab(tabId)
    } else {
      navigate(`/dashboard?tab=${tabId}`)
    }
  }

  return (
    <div className="bg-white shadow" style={{ minHeight: 'calc(100vh - 56px)', width: '250px' }}>  
      <nav className="p-3">
        <ul className="nav flex-column gap-1">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                to="#"
                onClick={(e) => handleTabClick(e, item.id)}
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
