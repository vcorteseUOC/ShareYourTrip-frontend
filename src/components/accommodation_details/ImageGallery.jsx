import React, { useState } from 'react'

const ImageGallery = ({ images, selectedImage, onImageSelect, title }) => {
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  return (
    <div className="mb-4">
      <div className="row g-2">
        <div className="col-12">
          {imageErrors[selectedImage] ? (
            <div 
              className="img-fluid rounded d-flex align-items-center justify-content-center text-muted bg-light"
              style={{ 
                height: '250px', 
                width: '100%'
              }}
            >
              <span>Imagen no disponible</span>
            </div>
          ) : (
            <img 
              src={images[selectedImage]} 
              alt={title}
              onError={() => handleImageError(selectedImage)}
              className="img-fluid rounded"
              style={{ 
                height: '250px', 
                width: '100%', 
                objectFit: 'cover' 
              }}
            />
          )}
        </div>
        <div className="col-12">
          <div className="row g-2">
            {images.map((image, index) => (
              <div key={index} className="col-6">
                {imageErrors[index] ? (
                  <div 
                    className={`img-fluid rounded d-flex align-items-center justify-content-center text-muted bg-light ${selectedImage === index ? 'border border-3 border-primary' : ''}`}
                    style={{ 
                      height: '73px',
                      width: '100%',
                      cursor: 'pointer',
                      opacity: selectedImage === index ? 1 : 0.7
                    }}
                  >
                    <span style={{ fontSize: '0.75rem' }}>Imagen no disponible</span>
                  </div>
                ) : (
                  <img 
                    src={image} 
                    alt={`${title} ${index + 1}`}
                    onError={() => handleImageError(index)}
                    className={`img-fluid rounded ${selectedImage === index ? 'border border-3 border-primary' : ''}`}
                    style={{ 
                      height: '73px',
                      width: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      opacity: selectedImage === index ? 1 : 0.7
                    }}
                    onClick={() => onImageSelect(index)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
