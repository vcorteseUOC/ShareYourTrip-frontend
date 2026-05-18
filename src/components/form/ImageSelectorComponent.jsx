import React from 'react'

const ImageSelectorComponent = ({ images, coverIndex, newImageUrl, setNewImageUrl, onSetCover, onRemoveImage, onAddImageUrl }) => {
  return (
    <>
      <label className="form-label fw-semibold mb-3">Fotos del alojamiento</label>

      {images.length === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center rounded mb-3 p-4 image-empty-state">
          <i className="bi bi-images mb-2 image-empty-state-icon"></i>
          <p className="text-muted small mb-1 fw-semibold">Sin fotos aún</p>
          <p className="text-muted small mb-0">Añade al menos una imagen para poder publicar</p>
        </div>
      )}

      <div className="row g-2 mb-3">
        {images.map((img, index) => (
          <div className="col-6" key={index}>
            <div
              className="position-relative rounded overflow-hidden image-card"
              onClick={() => onSetCover(index)}
            >
              <img
                src={img.url}
                alt={`Foto ${index + 1}`}
                className="w-100 h-100 image-card-img"
              />
              {coverIndex === index && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center image-card-cover-overlay">
                  <span className="badge text-white fw-bold px-2 py-1 image-card-cover-badge">
                    <i className="bi bi-star-fill me-1"></i>Portada
                  </span>
                </div>
              )}
              <button
                type="button"
                className="position-absolute top-0 end-0 btn btn-sm m-1 p-0 d-flex align-items-center justify-content-center image-card-remove-btn"
                onClick={(e) => { e.stopPropagation(); onRemoveImage(index) }}
              >
                <i className="bi bi-x text-white"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="input-group mb-2">
        <input
          type="url"
          className="form-control form-control-sm"
          placeholder="https://... URL de la imagen"
          value={newImageUrl}
          onChange={e => setNewImageUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), onAddImageUrl())}
        />
        <button
          type="button"
          className="btn btn-sm image-url-add-btn"
          onClick={onAddImageUrl}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>

      {images.length > 0 && (
        <p className="text-muted small mb-0">
          <i className="bi bi-hand-index me-1"></i>
          Haz clic en una foto para establecerla como portada
        </p>
      )}
    </>
  )
}

export default ImageSelectorComponent
