import React from 'react'

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, error = '', className = '' }) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default Input
