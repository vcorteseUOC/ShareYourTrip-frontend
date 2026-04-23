const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const endpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`
  },
  users: `${API_BASE_URL}/users`,
  accommodations: `${API_BASE_URL}/accommodations`,
  bookings: `${API_BASE_URL}/booking-requests`,
  hostReviews: `${API_BASE_URL}/host-reviews`,
  travelerReviews: `${API_BASE_URL}/traveler-reviews`
}
