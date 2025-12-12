# 📋 Documentación de la API - Sistema de Citas Médicas

## 🚀 Configuración Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crear un archivo `.env` basado en `.env.example`:
```env
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
PORT=3000
```

### 3. Iniciar el Servidor
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

---

## 🔐 Autenticación

Todas las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

---

## 📍 Endpoints

### **AUTH - Autenticación**

#### 1. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "usuario@example.com",
    "name": "Juan Pérez",
    "role": "user"
  }
}
```

#### 2. Registro de Usuario (Solo ADMIN)
```http
POST /auth/register
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "email": "nuevo@example.com",
  "password": "password123",
  "name": "Nuevo Usuario",
  "role": "user"
}
```

#### 3. Cambiar Contraseña
```http
PUT /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

#### 4. Recuperar Contraseña
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "usuario@example.com"
}
```

**Respuesta:**
```json
{
  "message": "Si el email existe, recibirás instrucciones para resetear tu contraseña",
  "resetToken": "abc123..." // Solo en desarrollo
}
```

#### 5. Resetear Contraseña
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "abc123...",
  "newPassword": "newpassword456"
}
```

#### 6. Obtener Perfil
```http
POST /auth/profile
Authorization: Bearer <token>
```

---

### **USERS - Usuarios (Solo ADMIN)**

#### 1. Crear Usuario
```http
POST /users
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123",
  "name": "Juan Pérez",
  "role": "user"
}
```

#### 2. Listar Usuarios
```http
GET /users
Authorization: Bearer <admin_token>
```

#### 3. Obtener Usuario por ID
```http
GET /users/:id
Authorization: Bearer <admin_token>
```

#### 4. Actualizar Usuario
```http
PUT /users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Juan Pérez Actualizado",
  "email": "nuevo@example.com",
  "role": "admin",
  "isActive": true
}
```

#### 5. Eliminar Usuario
```http
DELETE /users/:id
Authorization: Bearer <admin_token>
```

---

### **PATIENTS - Pacientes (Solo ADMIN)**

#### 1. Crear Paciente
```http
POST /patients
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "María García",
  "age": 35,
  "gender": "Femenino",
  "medicalHistory": "Hipertensión controlada"
}
```

#### 2. Listar Pacientes
```http
GET /patients
Authorization: Bearer <admin_token>
```

#### 3. Obtener Paciente por ID
```http
GET /patients/:id
Authorization: Bearer <admin_token>
```

#### 4. Actualizar Paciente
```http
PUT /patients/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "María García López",
  "age": 36,
  "medicalHistory": "Hipertensión controlada, diabetes tipo 2"
}
```

#### 5. Eliminar Paciente
```http
DELETE /patients/:id
Authorization: Bearer <admin_token>
```

---

### **APPOINTMENTS - Citas Médicas**

#### 1. Crear Cita (USER y ADMIN)
```http
POST /appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientInfo": "507f1f77bcf86cd799439011",
  "date": "2024-02-15T00:00:00.000Z",
  "time": "10:00",
  "reason": "Consulta general",
  "doctor": "Dr. Juan Pérez",
  "notes": "Primera consulta"
}
```

#### 2. Listar Citas
```http
GET /appointments
Authorization: Bearer <token>
```
- **ADMIN**: Ve todas las citas
- **USER**: Solo ve sus propias citas

#### 3. Obtener Cita por ID
```http
GET /appointments/:id
Authorization: Bearer <token>
```

#### 4. Listar Citas por Fecha
```http
GET /appointments/by-date?date=2024-02-15
Authorization: Bearer <token>
```

#### 5. Actualizar Cita (Solo ADMIN)
```http
PUT /appointments/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "date": "2024-02-16T00:00:00.000Z",
  "time": "11:00",
  "status": "confirmed",
  "doctor": "Dr. Pedro López",
  "notes": "Cita reprogramada"
}
```

**Estados disponibles:**
- `pending` - Pendiente
- `confirmed` - Confirmada
- `cancelled` - Cancelada
- `completed` - Completada

#### 6. Eliminar Cita (Solo ADMIN)
```http
DELETE /appointments/:id
Authorization: Bearer <admin_token>
```

---

## 👥 Roles y Permisos

### **ADMIN**
- ✅ Crear, leer, actualizar y eliminar usuarios
- ✅ Acceso completo al CRUD de pacientes
- ✅ Ver todas las citas médicas
- ✅ Actualizar y eliminar cualquier cita
- ✅ Crear citas

### **USER (Paciente)**
- ✅ Crear citas médicas
- ✅ Ver sus propias citas
- ✅ Cambiar su contraseña
- ❌ No puede acceder a usuarios
- ❌ No puede acceder a pacientes
- ❌ No puede modificar o eliminar citas

---

## 🔒 Seguridad

1. **Contraseñas**: Hasheadas con bcrypt (10 rounds)
2. **JWT**: Tokens con expiración de 24 horas
3. **Guards**: Protección de rutas con JWT y Roles
4. **Validación**: Verificación de permisos en cada endpoint

---

## 📝 Notas Importantes

1. **Primer Usuario Admin**: Debes crear el primer usuario admin directamente en la base de datos o temporalmente desactivar el guard en el endpoint de registro.

2. **Token de Reseteo**: En desarrollo, el token se devuelve en la respuesta. En producción, debe enviarse por email.

3. **Variables de Entorno**: Asegúrate de configurar correctamente `JWT_SECRET` en producción.

4. **CORS**: Configura CORS según tus necesidades en `main.ts`.

---

## 🧪 Ejemplos de Uso con cURL

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### Crear Cita
```bash
curl -X POST http://localhost:3000/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "date": "2024-02-15T00:00:00.000Z",
    "time": "10:00",
    "reason": "Consulta general"
  }'
```

### Listar Citas
```bash
curl -X GET http://localhost:3000/appointments \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐛 Solución de Problemas

### Error: "Usuario no autorizado"
- Verifica que el token JWT sea válido
- Asegúrate de incluir el header `Authorization: Bearer <token>`

### Error: "Credenciales inválidas"
- Verifica email y contraseña
- Asegúrate de que el usuario esté activo (`isActive: true`)

### Error: "No tienes permiso"
- Verifica que tu rol tenga los permisos necesarios
- Los endpoints de ADMIN solo son accesibles con rol `admin`

---

## 📧 Contacto

Para más información o soporte, contacta al equipo de desarrollo.
