# 🏥 Sistema de Gestión de Clínica - Documentación Completa

## ✅ Estado del Sistema: FUNCIONANDO

### 🚀 Servidor
- **URL**: http://localhost:3000
- **Estado**: ✅ Activo y conectado a MongoDB
- **Base de Datos**: MongoDB Atlas (ClinicaWeb)

---

## 👤 Usuario Administrador Creado

```
📧 Email: admin@clinica.com
🔑 Password: admin123
👔 Rol: ADMIN
```

### 🎫 Token JWT del Admin
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGNsaW5pY2EuY29tIiwic3ViIjoiNjkzYTVlMGRmMzcyNjdiOTA1YmEzM2ZkIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY1NDMyODg4LCJleHAiOjE3NjU1MTkyODh9.qIYOWJnNTm8oTllxZJVM55OScc775_5kLj67LoamX5U
```

---

## 📚 API Endpoints Disponibles

### 🔐 Autenticación (/auth)

#### 1. Registro de Usuario (Solo ADMIN)
```http
POST http://localhost:3000/auth/register
Content-Type: application/json
Authorization: Bearer {TOKEN_ADMIN}

{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "name": "Nombre Usuario",
  "role": "user"
}
```

#### 2. Login
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@clinica.com",
  "password": "admin123"
}
```

#### 3. Ver Perfil
```http
POST http://localhost:3000/auth/profile
Authorization: Bearer {TOKEN}
```

#### 4. Cambiar Contraseña
```http
PUT http://localhost:3000/auth/change-password
Content-Type: application/json
Authorization: Bearer {TOKEN}

{
  "currentPassword": "password_actual",
  "newPassword": "password_nuevo"
}
```

#### 5. Recuperar Contraseña
```http
POST http://localhost:3000/auth/forgot-password
Content-Type: application/json

{
  "email": "usuario@ejemplo.com"
}
```

#### 6. Resetear Contraseña
```http
POST http://localhost:3000/auth/reset-password
Content-Type: application/json

{
  "token": "TOKEN_DE_RECUPERACION",
  "newPassword": "nueva_password"
}
```

---

### 👥 Usuarios (/users) - Solo ADMIN

#### 1. Crear Usuario
```http
POST http://localhost:3000/users
Content-Type: application/json
Authorization: Bearer {TOKEN_ADMIN}

{
  "email": "nuevo@ejemplo.com",
  "password": "password123",
  "name": "Nuevo Usuario",
  "role": "user"
}
```

#### 2. Listar Usuarios
```http
GET http://localhost:3000/users
Authorization: Bearer {TOKEN_ADMIN}
```

#### 3. Ver Usuario por ID
```http
GET http://localhost:3000/users/{id}
Authorization: Bearer {TOKEN_ADMIN}
```

#### 4. Actualizar Usuario
```http
PUT http://localhost:3000/users/{id}
Content-Type: application/json
Authorization: Bearer {TOKEN_ADMIN}

{
  "name": "Nombre Actualizado",
  "email": "nuevo_email@ejemplo.com"
}
```

#### 5. Eliminar Usuario
```http
DELETE http://localhost:3000/users/{id}
Authorization: Bearer {TOKEN_ADMIN}
```

---

### 🏥 Pacientes (/patients) - Solo ADMIN

#### 1. Crear Paciente
```http
POST http://localhost:3000/patients
Content-Type: application/json
Authorization: Bearer {TOKEN_ADMIN}

{
  "name": "Juan Pérez",
  "age": 35,
  "gender": "Masculino",
  "medicalHistory": "Sin antecedentes relevantes"
}
```

#### 2. Listar Pacientes
```http
GET http://localhost:3000/patients
Authorization: Bearer {TOKEN_ADMIN}
```

#### 3. Ver Paciente por ID
```http
GET http://localhost:3000/patients/{id}
Authorization: Bearer {TOKEN_ADMIN}
```

#### 4. Actualizar Paciente
```http
PUT http://localhost:3000/patients/{id}
Content-Type: application/json
Authorization: Bearer {TOKEN_ADMIN}

{
  "name": "Juan Pérez Actualizado",
  "age": 36
}
```

#### 5. Eliminar Paciente
```http
DELETE http://localhost:3000/patients/{id}
Authorization: Bearer {TOKEN_ADMIN}
```

---

### 📅 Citas (/appointments)

#### 1. Crear Cita (USER y ADMIN)
```http
POST http://localhost:3000/appointments
Content-Type: application/json
Authorization: Bearer {TOKEN}

{
  "patientId": "ID_DEL_PACIENTE",
  "date": "2025-12-15",
  "time": "10:00",
  "reason": "Consulta general",
  "doctor": "Dr. García"
}
```

#### 2. Listar Citas
```http
GET http://localhost:3000/appointments
Authorization: Bearer {TOKEN}
```
- **ADMIN**: Ve todas las citas
- **USER**: Solo ve sus propias citas

#### 3. Listar Citas por Fecha
```http
GET http://localhost:3000/appointments/by-date?date=2025-12-15
Authorization: Bearer {TOKEN}
```

#### 4. Ver Cita por ID
```http
GET http://localhost:3000/appointments/{id}
Authorization: Bearer {TOKEN}
```

#### 5. Actualizar Cita (Solo ADMIN)
```http
PUT http://localhost:3000/appointments/{id}
Content-Type: application/json
Authorization: Bearer {TOKEN_ADMIN}

{
  "date": "2025-12-16",
  "time": "11:00",
  "status": "confirmed"
}
```

#### 6. Cancelar Cita (Solo ADMIN)
```http
DELETE http://localhost:3000/appointments/{id}
Authorization: Bearer {TOKEN_ADMIN}
```

---

## 🔒 Roles y Permisos

### ADMIN
- ✅ Crear, leer, actualizar y eliminar usuarios
- ✅ Acceso completo a pacientes (
