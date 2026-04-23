# ShareYourTrip Frontend

Frontend de la plataforma ShareYourTrip construido con Vite + React.

## Descripción

Este es el frontend de la plataforma ShareYourTrip, una aplicación web para compartir alojamientos. Utiliza React con Vite como herramienta de construcción, React Router para el enrutamiento, y se conecta al backend a través de una API RESTful.

## Características

- **Autenticación**: Login con JWT
- **Enrutamiento**: React Router v6
- **Estado global**: Context API para autenticación
- **Cliente HTTP**: Axios con interceptores para JWT
- **Proxy de desarrollo**: Configurado para redirigir al backend en puerto 8080

## Estructura del Proyecto

```
ShareYourTrip-frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── endpoints.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
└── .env
```

## Instalación

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### Pasos de instalación

```bash
# Navegar al directorio del proyecto
cd ShareYourTrip-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:3000`

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en puerto 3000 |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza la build de producción |

## Configuración

### Variables de Entorno

El archivo `.env` en la raíz del proyecto contiene:

```env
VITE_API_URL=http://localhost:8080
```

### Configuración de Vite

El archivo `vite.config.js` incluye:
- Plugin de React
- Proxy para redirigir peticiones `/api` al backend (puerto 8080)
- Puerto de desarrollo: 3000

## Arquitectura

### Servicios de API

- **api.js**: Cliente Axios configurado con interceptores para añadir JWT automáticamente
- **endpoints.js**: Centralización de URLs del backend
- **authService.js**: Métodos específicos de autenticación

### Contexto de Autenticación

`AuthContext.jsx` proporciona:
- Estado del usuario autenticado
- Funciones de login y logout
- Verificación de autenticación
- Carga inicial de token desde localStorage

### Rutas

- `/login`: Página de login (pública)
- `/`: Home (requiere autenticación)

## Conexión con el Backend

El frontend se conecta al backend en `http://localhost:8080` (configurable vía `VITE_API_URL`).

### Endpoints del Backend

- `POST /auth/login` - Autenticación
- `GET /users` - Obtener usuarios
- `GET /accommodations` - Alojamientos
- `GET /booking-requests` - Reservas
- `GET /host-reviews` - Reseñas de anfitriones
- `GET /traveler-reviews` - Reseñas de viajeros

## Tecnologías

- **React 18.3.1** - Framework UI
- **Vite 5.4.10** - Herramienta de construcción
- **React Router 6.26.2** - Enrutamiento
- **Axios 1.7.7** - Cliente HTTP
- **date-fns 4.1.0** - Manipulación de fechas

## Próximos Pasos

- [ ] Añadir más páginas (Accommodations, Bookings, Reviews, Profile)
- [ ] Implementar sistema de diseño (Tailwind CSS o Material UI)
- [ ] Añadir gestión de estado global (Zustand o Redux Toolkit)
- [ ] Implementar formularios con react-hook-form
- [ ] Añadir validación de formularios con Zod
- [ ] Implementar carga diferida (lazy loading) de rutas
- [ ] Añadir iconos (lucide-react o Material Icons)
- [ ] Configurar tests (Vitest)
- [ ] Añadir ESLint y Prettier
- [ ] Implementar internacionalización (i18n)

## Notas Importantes

- El frontend debe ejecutarse mientras el backend esté corriendo en el puerto 8080
- El token JWT se almacena en localStorage
- Las peticiones fallidas con 401 redirigen automáticamente a /login
- El proxy de desarrollo solo funciona en modo desarrollo
