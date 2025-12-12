# 🏥 Sistema de Citas Médicas - Full Stack

Sistema completo de gestión de citas médicas con backend NestJS y frontend React + TypeScript.

## 📋 Características Completas

### Backend (NestJS)
- ✅ **Autenticación JWT** con roles (Admin y Usuario)
- ✅ **Gestión de Usuarios** (CRUD completo)
- ✅ **Gestión de Pacientes** (solo Admin)
- ✅ **Sistema de Citas Médicas**
- ✅ **Recuperación de Contraseña**
- ✅ **Guards de Seguridad** (JWT y Roles)
- ✅ **Base de datos MongoDB** con Mongoose

### Frontend (React + TypeScript)
- ✅ **Interfaz moderna y responsive**
- ✅ **Autenticación completa**
- ✅ **Dashboard con estadísticas**
- ✅ **Gestión de citas, pacientes y usuarios**
- ✅ **Diseño con Tailwind CSS**
- ✅ **Protección de rutas por roles**

## 🚀 Tecnologías

### Backend
- **NestJS** - Framework de Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Bcrypt** - Encriptación de contraseñas
- **Passport** - Middleware de autenticación
- **TypeScript** - Lenguaje de programación

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework de estilos
- **Context API** - Gestión de estado

## 🐳 Instalación con Docker (Recomendado)

### Opción 1: Levantar todo el sistema con un comando

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# En modo detached (segundo plano)
docker-compose up -d --build
```

Esto levantará:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:2030
- **MongoDB**: localhost:27017

### Opción 2: Levantar servicios individualmente

```bash
# Solo backend y base de datos
docker-compose up api mongo

# Solo frontend
docker-compose up frontend
```

### Detener los servicios

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (limpia la base de datos)
docker-compose down -v
```

## 💻 Instalación Manual (Desarrollo)

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd backclinica-main
```

### 2. Configurar Backend

```bash
# Instalar dependencias del backend
npm install

# Crear archivo .env en la raíz
# Contenido del .env:
MONGODB_URI=mongodb://localhost:27017/clinica
JWT_SECRET=tu_clave_secreta_super_segura
PORT=2030

# Crear usuario administrador
npm run create-admin

# Iniciar backend en modo desarrollo
npm run start:dev
```

### 3. Configurar Frontend

```bash
# Ir a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env
# Contenido del .env:
VITE_API_URL=http://localhost:2030

# Iniciar frontend en modo desarrollo
npm run dev
```

### 4. Iniciar MongoDB (si no usas Docker)

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

## 🔐 Credenciales de Prueba

Después de ejecutar `npm run create-admin` o levantar con Docker:

```
Email: admin@clinica.com
Password: admin123
```

⚠️ **IMPORTANTE:** Cambia la contraseña después del primer login.

## 📁 Estructura del Proyecto

```
backclinica-main/
├── src/                          # Backend (NestJS)
│   ├── auth/                     # Módulo de autenticación
│   ├── users/                    # Módulo de usuarios
│   ├── patients/                 # Módulo de pacientes
│   ├── appointments/             # Módulo de citas
│   ├── common/                   # Recursos compartidos
│   ├── config/                   # Configuraciones
│   └── main.ts                   # Punto de entrada
├── frontend/                     # Frontend (React)
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/               # Páginas principales
│   │   ├── services/            # Servicios API
│   │   ├── context/             # Context API
│   │   ├── types/               # TypeScript types
│   │   └── App.tsx              # Componente principal
│   ├── Dockerfile               # Docker para frontend
│   └── nginx.conf               # Configuración Nginx
├── docker-compose.yml           # Orquestación de servicios
├── Dockerfile                   # Docker para backend
└── README.md
```

## 🎯 Funcionalidades por Rol

### Administrador
- ✅ Gestión completa de usuarios
- ✅ Gestión completa de pacientes
- ✅ Ver todas las citas
- ✅ Crear, actualizar y eliminar citas
- ✅ Acceso a todas las estadísticas

### Usuario (Paciente)
- ✅ Crear citas médicas
- ✅ Ver sus propias citas
- ✅ Cambiar su contraseña
- ❌ No puede gestionar usuarios
- ❌ No puede gestionar pacientes
- ❌ No puede modificar/eliminar citas

## 📚 Endpoints de la API

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario (solo Admin)
- `PUT /auth/change-password` - Cambiar contraseña
- `POST /auth/forgot-password` - Recuperar contraseña
- `POST /auth/reset-password` - Resetear contraseña

### Usuarios (Solo Admin)
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `GET /users/:id` - Obtener usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Pacientes (Solo Admin)
- `GET /patients` - Listar pacientes
- `POST /patients` - Crear paciente
- `GET /patients/:id` - Obtener paciente
- `PUT /patients/:id` - Actualizar paciente
- `DELETE /patients/:id` - Eliminar paciente

### Citas Médicas
- `GET /appointments` - Listar citas
- `POST /appointments` - Crear cita
- `GET /appointments/:id` - Obtener cita
- `GET /appointments/by-date?date=YYYY-MM-DD` - Citas por fecha
- `PUT /appointments/:id` - Actualizar cita (solo Admin)
- `DELETE /appointments/:id` - Eliminar cita (solo Admin)

## 🛠️ Scripts Disponibles

### Backend
```bash
npm run start          # Iniciar en modo normal
npm run start:dev      # Iniciar en modo desarrollo (watch)
npm run start:prod     # Iniciar en modo producción
npm run build          # Compilar el proyecto
npm run create-admin   # Crear usuario administrador
npm run lint           # Ejecutar linter
npm run test           # Ejecutar tests
```

### Frontend
```bash
npm run dev            # Iniciar servidor de desarrollo
npm run build          # Compilar para producción
npm run preview        # Vista previa de producción
npm run lint           # Ejecutar linter
```

## 🌐 URLs del Sistema

### Desarrollo Local
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:2030
- **MongoDB**: mongodb://localhost:27017/clinica

### Docker
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:2030
- **MongoDB**: mongodb://localhost:27017/clinica

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Tokens JWT con expiración de 24 horas
- Guards de autenticación y autorización
- Validación de roles en cada endpoint
- Protección contra accesos no autorizados
- CORS habilitado para desarrollo

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
```bash
# Verificar que MongoDB esté corriendo
docker ps | grep mongo

# Ver logs de MongoDB
docker logs clinica-mongo
```

### Error de CORS
```bash
# Verificar que el backend tenga CORS habilitado
# En src/main.ts debe estar: app.enableCors()
```

### Frontend no se conecta al backend
```bash
# Verificar la variable de entorno en frontend/.env
VITE_API_URL=http://localhost:2030

# Reiniciar el servidor de desarrollo
npm run dev
```

### Docker no construye correctamente
```bash
# Limpiar todo y reconstruir
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## 📊 Monitoreo

### Ver logs en tiempo real

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f api

# Solo frontend
docker-compose logs -f frontend

# Solo MongoDB
docker-compose logs -f mongo
```

## 🚀 Despliegue en Producción

### Variables de Entorno para Producción

**Backend (.env)**
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/clinica
JWT_SECRET=clave_super_segura_y_larga_para_produccion
PORT=2030
NODE_ENV=production
```

**Frontend (.env)**
```env
VITE_API_URL=https://api.tudominio.com
```

### Construir para Producción

```bash
# Backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
# Los archivos estarán en frontend/dist
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado para el sistema de gestión de citas médicas.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 📞 Soporte

Para soporte o preguntas, por favor abre un issue en el repositorio.

---

**¡Gracias por usar el Sistema de Citas Médicas!** 🏥
