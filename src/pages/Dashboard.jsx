import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import DashboardTab from '../components/dashboard/DashboardTab'
import BookingsTab from '../components/dashboard/BookingsTab'
import ReviewsTab from '../components/dashboard/ReviewsTab'
import AccommodationsTab from '../components/dashboard/AccommodationsTab'
import MessagesTab from '../components/dashboard/MessagesTab'
import ConfigProfileTab from '../components/dashboard/ConfigProfileTab'
import { useDashboard } from '../hooks/useDashboard'

const Dashboard = () => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const {
    activeTab,
    setActiveTab,
    bookingTab,
    setBookingTab,
    stats,
    recentBookings,
    searchName,
    setSearchName,
    searchDate,
    setSearchDate,
    searchStatus,
    setSearchStatus,
    filteredHostBookings,
    filteredHostBookingHistory,
    filteredTravelerBookings,
    filteredTravelerBookingHistory,
    reviews,
    reviewsLoading,
    reviewsError,
    loading,
    error,
    reloadBookings
  } = useDashboard(user)

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [searchParams, setActiveTab])

  return (
    <div className="min-vh-100 bg-light">
      <Header />

      <div className="d-flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-grow-1">
          <div className="container py-5">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando datos...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>{error}
              </div>
            ) : (
              <>
          {activeTab === 'dashboard' && (
            <DashboardTab 
              user={user} 
              stats={stats} 
              recentBookings={recentBookings}
              onTabChange={setActiveTab}
            />
          )}

          {activeTab === 'bookings' && (
            <BookingsTab 
              user={user}
              bookingTab={bookingTab}
              setBookingTab={setBookingTab}
              filteredHostBookings={filteredHostBookings}
              filteredHostBookingHistory={filteredHostBookingHistory}
              filteredTravelerBookings={filteredTravelerBookings}
              filteredTravelerBookingHistory={filteredTravelerBookingHistory}
              searchName={searchName}
              setSearchName={setSearchName}
              searchDate={searchDate}
              setSearchDate={setSearchDate}
              searchStatus={searchStatus}
              setSearchStatus={setSearchStatus}
              reloadBookings={reloadBookings}
            />
          )}

          {activeTab === 'accommodations' && (
            <AccommodationsTab activeTab={activeTab} />
          )}

          {activeTab === 'messages' && (
            <MessagesTab />
          )}

          {activeTab === 'profile' && (
            <ConfigProfileTab />
          )}

          {activeTab === 'reviews' && (
            <ReviewsTab 
              reviews={reviews}
              reviewsLoading={reviewsLoading}
              reviewsError={reviewsError}
              user={user}
            />
          )}
          </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
