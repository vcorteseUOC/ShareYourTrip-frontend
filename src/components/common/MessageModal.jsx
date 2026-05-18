import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { messageService } from '../../services/messageService'
import UserAvatar from './UserAvatar'

const MessageModal = ({ show, onClose, recipient, role }) => {
  const { user } = useAuth()
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (!show || !recipient) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!subject.trim() || !message.trim()) {
      return
    }
    if (!recipient.id) {
      console.error('Recipient ID is missing')
      return
    }

    if (!user.id) {
      console.error('User ID is missing')
      return
    }

    setSending(true)
    try {
      const requestData = {
        subject: subject.trim(),
        message: {
          senderId: user.id,
          recipientId: recipient.id,
          content: message.trim(),
          conversationId: null
        }
      }
      
      console.log('Request data:', requestData)
      
      await messageService.createConversation(requestData)
      
      setSubject('')
      setMessage('')
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setErrorMessage('Error al enviar mensaje. Por favor, intenta de nuevo.')
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {showSuccess && (
        <div 
          className="alert alert-success position-fixed m-3" 
          style={{ 
            bottom: '0', 
            right: '0', 
            zIndex: 9999,
            minWidth: '300px'
          }}
          role="alert"
        >
          <i className="bi bi-check-circle me-2"></i>
          Mensaje enviado correctamente
        </div>
      )}

      {showError && (
        <div 
          className="alert alert-danger position-fixed m-3" 
          style={{ 
            bottom: '0', 
            right: '0', 
            zIndex: 9999,
            minWidth: '300px'
          }}
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2"></i>
          {errorMessage}
        </div>
      )}

      <div 
        className="modal show d-block" 
        tabIndex="-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      >
      <div 
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Mensaje a {recipient.firstName}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded">
              <UserAvatar
                photoUrl={recipient.profilePhotoUrl}
                name={`${recipient.firstName} ${recipient.lastName}`}
                size={60}
              />
              <div>
                <h6 className="fw-bold mb-1">{recipient.firstName} {recipient.lastName}</h6>
                <p className="text-muted small mb-0">{role} en ShareYourTrip</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label fw-semibold">
                  Asunto
                </label>
                <input 
                  type="text"
                  className="form-control" 
                  id="subject"
                  placeholder="Ej: Consulta sobre disponibilidad"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-semibold">
                  Escribe tu mensaje
                </label>
                <textarea 
                  className="form-control" 
                  id="message"
                  rows="5"
                  placeholder="Hola, me gustaría saber más sobre tu alojamiento..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{ resize: 'none' }}
                ></textarea>
                <div className="text-end mt-1">
                  <small className="text-muted">{message.length} caracteres</small>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary flex-grow-1"
                  onClick={onClose}
                  disabled={sending}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-action flex-grow-1"
                  disabled={!subject.trim() || !message.trim() || sending}
                >
                  {sending ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default MessageModal
