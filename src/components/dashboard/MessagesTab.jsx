import React, { useState, useEffect } from 'react'
import { messageService } from '../../services/messageService'
import { useAuth } from '../../context/AuthContext'
import UserAvatar from '../common/UserAvatar'

const MessagesTab = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedConversation, setExpandedConversation] = useState(null)
  const [newMessages, setNewMessages] = useState({})
  const [sending, setSending] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadConversations = async () => {
      if (!user?.id) return
      
      setLoading(true)
      setError(null)
      try {
        const data = await messageService.getConversationsByUser(user.id)
        
        // Ordenar conversaciones por fecha del último mensaje, de más reciente a más antiguo
        const sortedConversations = data.sort((a, b) => {
          const lastMessageA = getLastMessage(a)
          const lastMessageB = getLastMessage(b)
          
          if (!lastMessageA?.createdAt) return 1
          if (!lastMessageB?.createdAt) return -1
          
          return new Date(lastMessageB.createdAt) - new Date(lastMessageA.createdAt)
        })
        
        setConversations(sortedConversations)
      } catch (err) {
        console.error('Error al cargar conversaciones:', err)
        setError('Error al cargar conversaciones. Por favor, intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    loadConversations()
  }, [user?.id])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now - date
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInHours < 1) {
      return 'Hace un momento'
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours}h`
    } else if (diffInDays === 1) {
      return 'Ayer'
    } else if (diffInDays < 7) {
      return `Hace ${diffInDays} días`
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
    }
  }

  const getLastMessage = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return null
    }
    return conversation.messages[conversation.messages.length - 1]
  }

  const getOtherUser = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return null
    }
    
    // Usar el último mensaje para determinar el otro participante
    const lastMessage = getLastMessage(conversation)
    if (!lastMessage) return null
    
    // Si el usuario actual es el sender, mostrar info del recipient
    // Si el usuario actual es el recipient, mostrar info del sender
    const otherUser = lastMessage.sender?.id === user.id ? lastMessage.recipient : lastMessage.sender
    
    return {
      id: otherUser?.id,
      name: `${otherUser?.firstName} ${otherUser?.lastName}`,
      photoUrl: otherUser?.profilePhotoUrl,
      email: otherUser?.email,
      bio: otherUser?.bio,
      birthDate: otherUser?.birthDate
    }
  }

  const toggleConversation = (conversationId) => {
    setExpandedConversation(expandedConversation === conversationId ? null : conversationId)
  }

  const handleSendMessage = async (conversationId) => {
    const messageContent = newMessages[conversationId]
    if (!messageContent?.trim()) return

    setSending(prev => ({ ...prev, [conversationId]: true }))
    
    try {
      const lastMessage = getLastMessage(conversations.find(c => c.id === conversationId))
      const otherUser = getOtherUser(conversations.find(c => c.id === conversationId))
      
      console.log('Conversation ID:', conversationId)
      console.log('Conversation ID type:', typeof conversationId)
      console.log('Other user:', otherUser)
      
      const messageData = {
        conversationId: conversationId,
        senderId: user.id,
        recipientId: otherUser?.id,
        content: messageContent.trim()
      }

      console.log('Enviando mensaje a conversación existente:', messageData)
      await messageService.sendMessage(messageData)

      // Actualizar la conversación con el nuevo mensaje
      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.id === conversationId) {
            const newMessage = {
              id: Date.now(),
              content: messageContent.trim(),
              senderId: user.id,
              recipientId: otherUser?.id,
              sender: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePhotoUrl: user.profilePhotoUrl,
                bio: user.bio,
                birthDate: user.birthDate
              },
              recipient: {
                id: otherUser?.id,
                firstName: otherUser?.name?.split(' ')[0] || 'Usuario',
                lastName: otherUser?.name?.split(' ').slice(1).join(' ') || '',
                email: otherUser?.email,
                profilePhotoUrl: otherUser?.photoUrl,
                bio: otherUser?.bio,
                birthDate: otherUser?.birthDate
              },
              createdAt: new Date().toISOString()
            }
            return {
              ...conv,
              messages: [...conv.messages, newMessage]
            }
          }
          return conv
        })
      )

      // Limpiar el input y mostrar alerta de éxito
      setNewMessages(prev => ({ ...prev, [conversationId]: '' }))
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setErrorMessage('Error al enviar mensaje. Por favor, intenta de nuevo.')
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } finally {
      setSending(prev => ({ ...prev, [conversationId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando conversaciones...</p>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>
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

      {/* My Messages Section */}
      <div className="mb-5">
        <h1 className="display-5 fw-bold mb-2">Mis Mensajes</h1>
        <p className="text-muted">Gestiona tus conversaciones</p>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-chat-dots fs-1 text-muted mb-3"></i>
          <p className="text-muted">No tienes conversaciones aún</p>
        </div>
      ) : (
        <div className="card shadow border-0">
          <div className="card-body p-4">
            {conversations.map((conversation) => {
              const lastMessage = getLastMessage(conversation)
              const otherUser = getOtherUser(conversation)
              const isExpanded = expandedConversation === conversation.id

              const userData = otherUser ? {
                id: otherUser.id,
                firstName: otherUser.name?.split(' ')[0] || 'Usuario',
                lastName: otherUser.name?.split(' ').slice(1).join(' ') || '',
                email: otherUser.email || '',
                profilePhotoUrl: otherUser.photoUrl || '',
                bio: otherUser.bio || '',
                language: otherUser.language || '',
                birthDate: otherUser.birthDate || null
              } : null

              return (
                <div key={conversation.id} className="mb-3">
                  <div 
                    className="card cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleConversation(conversation.id)}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center flex-grow-1">
                          <UserAvatar 
                            photoUrl={otherUser?.photoUrl}
                            name={otherUser?.name}
                            size={50}
                            className="me-3"
                            user={userData}
                          />
                          <div className="flex-grow-1">
                            <h6 className="fw-semibold mb-1">{conversation.subject || 'Sin asunto'}</h6>
                            {lastMessage && (
                              <p className="text-muted small mb-0 text-truncate" style={{ maxWidth: '300px' }}>
                                {lastMessage.content}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          {lastMessage && (
                            <small className="text-muted">
                              {formatDate(lastMessage.createdAt)}
                            </small>
                          )}
                          <i className={`bi bi-chevron-down ${isExpanded ? 'rotate-180' : ''}`} style={{ transition: 'transform 0.2s' }}></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isExpanded && conversation.messages && (
                    <div className="card border-top-0 mt-2" style={{ marginLeft: '20px', marginRight: '20px' }}>
                      <div className="card-body p-3 bg-light">
                        {conversation.messages.map((message) => {
                          const isCurrentUser = message.sender?.id === user.id
                          const senderName = isCurrentUser ? 'Tú' : `${message.sender?.firstName} ${message.sender?.lastName}`
                          
                          const userData = !isCurrentUser && message.sender ? {
                            id: message.sender.id,
                            firstName: message.sender.firstName,
                            lastName: message.sender.lastName,
                            email: message.sender.email,
                            profilePhotoUrl: message.sender.profilePhotoUrl,
                            bio: message.sender.bio,
                            language: message.sender.language,
                            birthDate: message.sender.birthDate
                          } : null
                          
                          return (
                            <div key={message.id} className={`mb-3 ${isCurrentUser ? 'text-end' : ''}`}>
                              <div className={`message-bubble ${isCurrentUser ? 'message-bubble-current' : 'message-bubble-other'}`}>
                                <div className="message-sender">
                                  {senderName}
                                </div>
                                <div className="message-content">{message.content}</div>
                                <div className="message-time">
                                  {new Date(message.createdAt).toLocaleString('es-ES', { 
                                    day: '2-digit', 
                                    month: 'short', 
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        <div className="mt-3 pt-3 border-top">
                          <div className="d-flex gap-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Escribe un mensaje..."
                              value={newMessages[conversation.id] || ''}
                              onChange={(e) => setNewMessages(prev => ({ ...prev, [conversation.id]: e.target.value }))}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSendMessage(conversation.id)
                                }
                              }}
                              disabled={sending[conversation.id]}
                            />
                            <button
                              className="btn btn-action"
                              onClick={() => handleSendMessage(conversation.id)}
                              disabled={!newMessages[conversation.id]?.trim() || sending[conversation.id]}
                            >
                              {sending[conversation.id] ? (
                                <span className="spinner-border spinner-border-sm" role="status"></span>
                              ) : (
                                <i className="bi bi-send"></i>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default MessagesTab