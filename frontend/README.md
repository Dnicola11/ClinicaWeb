# 🏥 Sistema de Citas Médicas - Frontend

Frontend moderno para el sistema de gestión de citas médicas, desarrollado con React, TypeScript y Tailwind CSS.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework de estilos
- **Context API** - Gestión de estado

## 📦 Instalación

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# El frontend estará disponible en http://localhost:5173
```

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto frontend:

```env
VITE_API_URL=http://localhost:2030
```

## 🐳 Docker

### Construir imagen
```bash
docker build -t clinica-frontend .
```

### Ejecutar contenedor
```bash
docker run -p 3000:80 clinica-frontend
```

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/           # Páginas principales
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Appointments.tsx
│   │   ├── Patients.tsx
│   │   └── Users.tsx
│   ├── services/        # Servicios API
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── appointmentService.ts
│   │   ├── patientService.ts
│   │   └── userService.ts
│   ├── context/         # Context API
│   │   └── AuthContext.tsx
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── public/              # Archivos estáticos
├── Dockerfile           # Configuración Docker
├── nginx.conf           # Configuración Nginx
└── package.json
```

## 🎨 Características

### Autenticación
- ✅ Login con JWT
- ✅ Protección de rutas
- ✅ Roles (Admin y Usuario)
- ✅ Persistencia de sesión

### Dashboard
- ✅ Estadísticas generales
- ✅ Citas recientes
- ✅ Vista diferenciada por rol

### Gestión de Citas
- ✅ Listar todas las citas
- ✅ Crear nueva cita
- ✅ Eliminar cita (solo Admin)
- ✅ Estados de citas (Pendiente, Confirmada, Cancelada, Completada)

### Gestión de Pacientes (Solo Admin)
- ✅ Listar pacientes
- ✅ Crear paciente
- ✅ Eliminar paciente
- ✅ Información médica

### Gestión de Usuarios (Solo Admin)
- ✅ Listar usuarios
- ✅ Crear usuario
- ✅ Asignar roles
- ✅ Eliminar usuario

## 🔐 Credenciales de Prueba

```
Email: admin@clinica.com
Password: admin123
```

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa de producción
npm run lint         # Ejecutar linter
```

## 🎯 Rutas

- `/login` - Página de inicio de sesión
- `/dashboard` - Dashboard principal
- `/appointments` - Gestión de citas
- `/patients` - Gestión de pacientes (Admin)
- `/users` - Gestión de usuarios (Admin)

## 🌐 API Endpoints

El frontend se comunica con el backend a través de los siguientes endpoints:

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario

### Citas
- `GET /appointments` - Listar citas
- `POST /appointments` - Crear cita
- `DELETE /appointments/:id` - Eliminar cita

### Pacientes
- `GET /patients` - Listar pacientes
- `POST /patients` - Crear paciente
- `DELETE /patients/:id` - Eliminar paciente

### Usuarios
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `DELETE /users/:id` - Eliminar usuario

## 📱 Responsive Design

El frontend está completamente optimizado para:
- 📱 Móviles
- 💻 Tablets
- 🖥️ Desktop

## 🎨 Paleta de Colores

- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
