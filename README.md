# 🏥 Sistema de Citas Médicas - Backend API

Sistema backend completo para gestión de citas médicas desarrollado con NestJS, MongoDB y autenticación JWT.

## 📋 Características

- ✅ **Autenticación JWT** con roles (Admin y Usuario)
- ✅ **Gestión de Usuarios** (CRUD completo)
- ✅ **Gestión de Pacientes** (solo Admin)
- ✅ **Sistema de Citas Médicas**
- ✅ **Recuperación de Contraseña**
- ✅ **Cambio de Contraseña**
- ✅ **Guards de Seguridad** (JWT y Roles)
- ✅ **Base de datos MongoDB** con Mongoose

## 🚀 Tecnologías

- **NestJS** - Framework de Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Bcrypt** - Encriptación de contraseñas
- **Passport** - Middleware de autenticación
- **TypeScript** - Lenguaje de programación

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd backclinica-main
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
JWT_SECRET=tu_clave_secreta_super_segura
PORT=3000
```

### 4. Crear el primer usuario administrador
```bash
npm run create-admin
```

Esto creará un usuario admin con las siguientes credenciales:
- **Email:** admin@clinica.com
- **Password:** admin123

⚠️ **IMPORTANTE:** Cambia la contraseña después del primer login.

### 5. Iniciar el servidor
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación de la API

Para ver la documentación completa de todos los endpoints, consulta el archivo [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Endpoints Principales

#### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario (solo Admin)
- `PUT /auth/change-password` - Cambiar contraseña
- `POST /auth/forgot-password` - Recuperar contraseña
- `POST /auth/reset-password` - Resetear contraseña

#### Usuarios (Solo Admin)
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `GET /users/:id` - Obtener usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

#### Pacientes (Solo Admin)
- `GET /patients` - Listar pacientes
- `POST /patients` - Crear paciente
- `GET /patients/:id` - Obtener paciente
- `PUT /patients/:id` - Actualizar paciente
- `DELETE /patients/:id` - Eliminar paciente

#### Citas Médicas
- `GET /appointments` - Listar citas
- `POST /appointments` - Crear cita
- `GET /appointments/:id` - Obtener cita
- `GET /appointments/by-date?date=YYYY-MM-DD` - Citas por fecha
- `PUT /appointments/:id` - Actualizar cita (solo Admin)
- `DELETE /appointments/:id` - Eliminar cita (solo Admin)

## 👥 Roles y Permisos

### Admin
- ✅ Gestión completa de usuarios
- ✅ Gestión completa de pacientes
- ✅ Ver todas las citas
- ✅ Crear, actualizar y eliminar citas

### Usuario (Paciente)
- ✅ Crear citas médicas
- ✅ Ver sus propias citas
- ✅ Cambiar su contraseña
- ❌ No puede gestionar usuarios
- ❌ No puede gestionar pacientes
- ❌ No puede modificar/eliminar citas

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Tokens JWT con expiración de 24 horas
- Guards de autenticación y autorización
- Validación de roles en cada endpoint
- Protección contra accesos no autorizados

## 📁 Estructura del Proyecto

```
src/
├── auth/                    # Módulo de autenticación
│   ├── dto/                # DTOs de autenticación
│   ├── guards/             # Guards JWT y Roles
│   ├── strategies/         # Estrategia JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/                   # Módulo de usuarios
│   ├── dto/
│   ├── user.schema.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── patients/                # Módulo de pacientes
│   ├── patients.schema.ts
│   ├── patients.controller.ts
│   ├── patients.service.ts
│   └── patients.module.ts
├── appointments/            # Módulo de citas
│   ├── dto/
│   ├── appointment.schema.ts
│   ├── appointments.controller.ts
│   ├── appointments.service.ts
│   └── appointments.module.ts
├── common/                  # Recursos compartidos
│   ├── decorators/         # Decoradores personalizados
│   └── enums/              # Enumeraciones
├── config/                  # Configuraciones
│   └── mongoose.config.ts
├── app.module.ts
└── main.ts
```

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

## 🛠️ Scripts Disponibles

```bash
npm run start          # Iniciar en modo normal
npm run start:dev      # Iniciar en modo desarrollo (watch)
npm run start:prod     # Iniciar en modo producción
npm run build          # Compilar el proyecto
npm run create-admin   # Crear usuario administrador
npm run lint           # Ejecutar linter
npm run format         # Formatear código
```

## 📝 Ejemplo de Uso

### 1. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@clinica.com",
    "password": "admin123"
  }'
```

### 2. Crear una cita
```bash
curl -X POST http://localhost:3000/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "date": "2024-02-15T00:00:00.000Z",
    "time": "10:00",
    "reason": "Consulta general",
    "doctor": "Dr. Juan Pérez"
  }'
```

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verifica que la URI de MongoDB sea correcta
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas

### Error de autenticación
- Verifica que el token JWT sea válido
- Asegúrate de incluir el header `Authorization: Bearer <token>`

### Error de permisos
- Verifica que tu usuario tenga el rol correcto
- Los endpoints de Admin solo son accesibles con rol `admin`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado para el sistema de gestión de citas médicas.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.
