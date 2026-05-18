import React from 'react'
import barcelona from '../../assets/barcelona.jpg'
import madrid from '../../assets/madrid.jpg'
import valencia from '../../assets/valencia.jpg'
import sevilla from '../../assets/sevilla.jpg'

const PopularDestinations = ({ handleDestinationClick }) => {
  return (
    <div className="mb-5" style={{ marginTop: '3rem' }}>
      <h2 className="h3 fw-bold text-center mb-4">Destinos más populares</h2>
      <div className="row g-4">
        <div className="col-md-3 col-sm-6">
          <div 
            className="card border-0 shadow h-100"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDestinationClick('Barcelona')}
          >
            <div className="position-relative destination-image" style={{
              backgroundImage: `url(${barcelona})`
            }}>
              <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <h5 className="text-white mb-0">Barcelona</h5>
                <p className="text-white small mb-0">España</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div 
            className="card border-0 shadow h-100"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDestinationClick('Madrid')}
          >
            <div className="position-relative destination-image" style={{
              backgroundImage: `url(${madrid})`
            }}>
              <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <h5 className="text-white mb-0">Madrid</h5>
                <p className="text-white small mb-0">España</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div 
            className="card border-0 shadow h-100"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDestinationClick('Valencia')}
          >
            <div className="position-relative destination-image" style={{
              backgroundImage: `url(${valencia})`
            }}>
              <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <h5 className="text-white mb-0">Valencia</h5>
                <p className="text-white small mb-0">España</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div 
            className="card border-0 shadow h-100"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDestinationClick('Sevilla')}
          >
            <div className="position-relative destination-image" style={{
              backgroundImage: `url(${sevilla})`
            }}>
              <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <h5 className="text-white mb-0">Sevilla</h5>
                <p className="text-white small mb-0">España</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularDestinations
