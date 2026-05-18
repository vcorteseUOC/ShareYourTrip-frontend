import React from 'react'

const PasswordComponent = ({ password, passwordConfirm, onPasswordChange, onPasswordConfirmChange }) => {
  const passwordMismatch = password && passwordConfirm && password !== passwordConfirm

  return (
    <div className="row g-2">
      <div className="col-12">
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
          placeholder="Nueva contraseña"
        />
      </div>
      <div className="col-12">
        <input
          type="password"
          className={`form-control${passwordMismatch ? ' is-invalid' : (passwordConfirm && !passwordMismatch ? ' is-valid' : '')}`}
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={e => onPasswordConfirmChange(e.target.value)}
          placeholder="Confirmar contraseña"
        />
        {passwordMismatch && (
          <div className="invalid-feedback">Las contraseñas no coinciden</div>
        )}
      </div>
    </div>
  )
}

export default PasswordComponent
