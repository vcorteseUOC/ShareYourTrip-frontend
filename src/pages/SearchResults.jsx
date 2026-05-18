import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SearchBar from '../components/layout/SearchBar'
import SidebarFilter from '../components/layout/SidebarFilter'
import ResultsSearchGrid from '../components/layout/ResultsSearchGrid'
import { useSearchResults } from '../hooks/useSearchResults'
import { getLanguageFlag, getLanguageName } from '../utils/languageUtils'

const SearchResults = () => {
  const navigate = useNavigate()
  const {
    showTooltip,
    setShowTooltip,
    accommodations,
    loading,
    error,
    currentPage,
    itemsPerPage,
    userInteracted,
    setUserInteracted,
    searchParams,
    filters,
    setFilters,
    getRoomTypeName,
    loadAccommodations,
    applyFilters,
    handleSearchBarSubmit,
    totalPages,
    indexOfLastItem,
    indexOfFirstItem,
    currentAccommodations,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleSearchBarChange,
    handleFilterChange,
    handleServiceFilterChange
  } = useSearchResults()

  return (
    <div className="min-vh-100 bg-light">
      <Header />

      <main className="container py-5">
        {/* Search Header */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2">
            <h1 className="h3 fw-bold mb-0">Resultados de búsqueda</h1>
            <div 
              className="position-relative d-inline-block"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <i className="bi bi-info-circle text-muted" style={{ cursor: 'pointer' }}></i>
              {showTooltip && (
                <div className="tooltip-info">
                  <small>
                    <strong>Indicador de plazas:</strong><br />
                    <span style={{ color: '#198754' }}>●</span> Verde: Más de 1 plaza libre<br />
                    <span style={{ color: '#ffc107' }}>●</span> Amarillo: Solo 1 plaza libre<br />
                    Formato: Plazas libres / Total
                  </small>
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <p className="text-muted">Cargando alojamientos...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <p className="text-muted">Se encontraron {accommodations.length} alojamientos</p>
          )}
        </div>

        {/* Search Bar */}
        <SearchBar 
          searchParams={searchParams}
          handleSearchBarSubmit={handleSearchBarSubmit}
          handleSearchBarChange={handleSearchBarChange}
        />

        <div className="row g-4">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <SidebarFilter 
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleServiceFilterChange={handleServiceFilterChange}
              applyFilters={applyFilters}
            />
          </div>

          {/* Results Grid */}
          <ResultsSearchGrid 
            loading={loading}
            error={error}
            accommodations={accommodations}
            currentAccommodations={currentAccommodations}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePreviousPage={handlePreviousPage}
            handlePageChange={handlePageChange}
            handleNextPage={handleNextPage}
            searchParams={searchParams}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default SearchResults
