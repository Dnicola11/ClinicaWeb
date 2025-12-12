# Autenticación Temporalmente Deshabilitada

## 📋 Resumen

Se ha deshabilitado temporalmente la autenticación JWT en todos los controladores del sistema para facilitar el desarrollo y pruebas.

## 🔓 Cambios Realizados

### 1. **AuthController** (`src/auth/auth.controller.ts`)
- ✅ `/auth/register` - Público (ya estaba sin guard)
- ✅ `/auth/login` - Público (ya estaba sin guard)
- ✅ `/auth/change-password` - **Ahora público** (guard comentado)
  - Requiere enviar `userId` en el body
- ✅ `/auth/profile` - **Ahora público** (guard comentado)
  - Requiere enviar `userId` en el body
- ✅ `/auth/forgot-password` - Público (ya estaba sin guard)
- ✅ `/auth/reset-password` - Público (ya estaba sin guard)

### 2. **UsersController** (`src/users/users.controller.ts`)
- ✅ Todos los endpoints ahora son públicos
- ✅ Guards `@UseGuards(JwtAuthGuard, RolesGuard)` comentados
- ✅ Decorador `@Roles(Role.ADMIN)` comentado

**Endpoints disponibles:**
- `GET /users` - Listar todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear nuevo usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### 3. **PatientsController** (`src/patients/patients.controller.ts`)
- ✅ Todos los endpoints ahora son públicos
- ✅ Guards `@UseGuards(JwtAuthGuard, RolesGuard)` comentados
- ✅ Decorador `@Roles(Role.ADMIN)` comentado

**Endpoints disponibles:**
- `GET /patients` - Listar todos los pacientes
- `GET /patients/:id` - Obtener paciente por ID
- `POST /patients` - Crear nuevo paciente
- `PUT /patients/:id` - Actualizar paciente
- `DELETE /patients/:id` - Eliminar paciente

### 4. **AppointmentsController** (`src/appointments/appointments.controller.ts`)
- ✅ Todos los endpoints ahora son públicos
- ✅ Guards `@UseGuards(JwtAuthGuard, RolesGuard)` comentados
- ✅ Decoradores `@Roles()` comentados

**Endpoints disponibles:**
- `GET /appointments` - Listar todas las citas
  - Query params opcionales: `userId`, `role`
- `GET /appointments/by-date?date=YYYY-MM-DD` - Citas por fecha
  - Query params opcionales: `userId`, `role`
- `GET /appointments/:id` - Obtener cita por ID
  - Query params opcionales: `userId`, `role`
- `POST /appointments` - Crear nueva cita
  - Requiere `userId` en el body
- `PUT /appointments/:id` - Actualizar cita
- `DELETE /appointments/:id` - Eliminar cita

## 🧪 Pruebas de Endpoints

### Usuarios
```bash
# Listar usuarios
curl http://localhost:3000/users

# Obtener usuario específico
curl http://localhost:3000/users/693a5e0df37267b905ba33fd

# Crear usuario
curl http://localhost:3000/users -X POST -H "Content-Type: application/json" -d "{\"email\":\"nuevo@test.com\",\"password\":\"password123\",\"name\":\"Nuevo Usuario\",\"role\":\"user\"}"
```

### Pacientes
```bash
# Listar pacientes
curl http://localhost:3000/patients

# Crear paciente
curl http://localhost:3000/patients -X POST -H "Content-Type: application/json" -d "{\"name\":\"Juan Pérez\",\"age\":30,\"gender\":\"Masculino\",\"medicalHistory\":\"Sin antecedentes\"}"
```

### Citas
```bash
# Listar citas
curl http://localhost:3000/appointments

# Crear cita
curl http://localhost:3000/appointments -X POST -H "Content-Type: application/json" -d "{\"userId\":\"693a5e89f37267b905ba3402\",\"patientId\":\"ID_DEL_PACIENTE\",\"date\":\"2025-12-15\",\"time\":\"10:00\",\"reason\":\"Consulta general\",\"doctor\":\"Dr. García\"}"
```

### Autenticación (Login sigue funcionando)
```bash
# Login
curl http://localhost:3000/auth/login -X POST -H "Content-Type: application/json" -d "{\"email\":\"admin@clinica.com\",\"password\":\"admin123\"}"
```

## 🔄 Cómo Reactivar la Autenticación

Cuando quieras volver a habilitar la autenticación JWT, simplemente:

1. **Descomentar los guards en cada controlador:**

```typescript
// En UsersController, PatientsController, AppointmentsController
@Controller('nombre')
@UseGuards(JwtAuthGuard, RolesGuard)  // Descomentar esta línea
@Roles(Role.ADMIN)  // Descomentar esta línea
export class NombreController {
  // ...
}
```

2. **Descomentar los guards en métodos específicos:**

```typescript
// En AuthController
@Put('change-password')
@UseGuards(JwtAuthGuard)  // Descomentar esta línea
async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
  return this.authService.changePassword(req.user.userId, changePasswordDto);
}
```

3. **Revertir los cambios en los parámetros:**
   - Cambiar `@Body() dto & { userId: string }` de vuelta a `@Request() req`
   - Cambiar `@Query('userId') userId?: string` de vuelta a `@Request() req`

## ⚠️ Advertencias

- **IMPORTANTE**: Esta configuración es solo para desarrollo/pruebas
- **NO usar en producción** sin autenticación
- Todos los endpoints están completamente abiertos
- No hay validación de roles ni permisos
- Cualquiera puede acceder a cualquier endpoint

## 📝 Usuarios de Prueba

### Administrador
- **Email**: admin@clinica.com
- **Password**: admin123
- **ID**: 693a5e0df37267b905ba33fd

### Usuario Normal
- **Email**: usuario@clinica.com
- **Password**: user123
- **ID**: 693a5e89f37267b905ba3402

## 🚀 Estado del Servidor

- ✅ Servidor corriendo en: http://localhost:3000
- ✅ Todos los endpoints funcionando sin autenticación
- ✅ Base de datos MongoDB conectada
- ✅ Login funcional (genera tokens pero no son requeridos)

## 📚 Documentación Relacionada

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Documentación completa de la API
- [QUICK_START.md](./QUICK_START.md) - Guía de inicio rápido
- [SISTEMA_COMPLETO.md](./SISTEMA_COMPLETO.md) - Documentación del sistema completo
