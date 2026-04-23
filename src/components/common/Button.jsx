import React from 'react'

const Button = ({ children, variant = 'primary', type = 'button', disabled = false, onClick, className = '' }) => {
  const variants = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    danger: 'btn btn-danger',
    outline: 'btn btn-outline-primary'
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
