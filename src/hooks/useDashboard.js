import { useState } from 'react'
import { useDashboardStats } from './useDashboardStats'
import { useBookingsTab } from './useBookingsTab'
import { useReviewsTab } from './useReviewsTab'

export const useDashboard = (user) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [bookingTab, setBookingTab] = useState('host')

  // Hooks para cada tab
  const dashboardStats = useDashboardStats(user, activeTab)
  const bookingsTab = useBookingsTab(user, activeTab, bookingTab)
  const reviewsTab = useReviewsTab(user, activeTab)

  // Calcular estado de carga global
  const loading = activeTab === 'dashboard' 
    ? dashboardStats.statsLoading || dashboardStats.recentBookingsLoading
    : activeTab === 'bookings'
    ? bookingsTab.bookingsLoading
    : activeTab === 'reviews'
    ? reviewsTab.reviewsLoading
    : false

  const error = activeTab === 'dashboard'
    ? dashboardStats.statsError || dashboardStats.recentBookingsError || null
    : activeTab === 'bookings'
    ? bookingsTab.bookingsError || null
    : activeTab === 'reviews'
    ? reviewsTab.reviewsError || null
    : null

  return {
    // Estados principales
    activeTab,
    setActiveTab,
    bookingTab,
    setBookingTab,
    // Estado de carga global
    loading,
    error,
    // Datos de cada tab
    ...dashboardStats,
    ...bookingsTab,
    ...reviewsTab
  }
}
