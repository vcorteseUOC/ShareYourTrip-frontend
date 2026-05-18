import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SearchResults from './pages/SearchResults'
import AccommodationDetail from './pages/AccommodationDetail'
import EditAccommodation from './components/dashboard/EditAccommodation'
import CreateAccommodation from './components/dashboard/CreateAccommodation'
import Index from './pages/Index'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/accommodation/:id" element={<AccommodationDetail />} />
          <Route 
            path="/edit-accommodation/:id" 
            element={
              <ProtectedRoute>
                <EditAccommodation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-accommodation" 
            element={
              <ProtectedRoute>
                <CreateAccommodation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
