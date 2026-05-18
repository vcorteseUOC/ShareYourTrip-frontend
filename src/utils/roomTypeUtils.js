// Constantes para tipos de habitación (valores del backend y frontend)
export const ROOM_TYPES = {
  PRIVATE: 'private',
  SHARED: 'shared',
  ALL: 'all'
}

// Mapeo de tipos de habitación a texto en español e icono
const ROOM_TYPE_INFO = {
  [ROOM_TYPES.PRIVATE]: {
    text: 'Privada',
    icon: 'bi-door-closed'
  },
  [ROOM_TYPES.SHARED]: {
    text: 'Compartida',
    icon: 'bi-people'
  },
  [ROOM_TYPES.ALL]: {
    text: 'Todos',
    icon: 'bi-house'
  }
}

// Obtener información de un tipo de habitación (texto e icono)
export const getRoomTypeInfo = (roomType) => {
  return ROOM_TYPE_INFO[roomType] || { text: roomType, icon: 'bi-house' }
}

// Obtener las opciones para el select de edición/creación
export const getRoomTypeOptions = () => {
  return [
    { value: ROOM_TYPES.PRIVATE, label: 'Habitación privada' },
    { value: ROOM_TYPES.SHARED, label: 'Habitación compartida' }
  ]
}

// Obtener las opciones para el select de filtros (incluye "all")
export const getFilterRoomTypeOptions = () => {
  return [
    { value: ROOM_TYPES.ALL, label: 'Todos los tipos' },
    { value: ROOM_TYPES.PRIVATE, label: 'Habitación privada' },
    { value: ROOM_TYPES.SHARED, label: 'Habitación compartida' }
  ]
}
