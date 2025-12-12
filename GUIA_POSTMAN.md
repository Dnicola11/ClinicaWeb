# 📮 Guía Completa para Probar en Postman

## 🚀 Configuración Inicial

### 1. URL Base
```
http://localhost:3000
```

### 2. Headers (para todos los requests con body)
```
Content-Type: application/json
```

**NOTA IMPORTANTE:** Como la autenticación está deshabilitada, NO necesitas agregar el header `Authorization: Bearer {token}`

---

## 👥 ENDPOINTS DE USUARIOS

### 1. Listar Todos los Usuarios
- **Método:** `GET`
- **URL:** `http://localhost:3000/users`
- **Body:** Ninguno
- **Respuesta esperada:** Array con todos los usuarios

### 2. Obtener Usuario por ID
- **Método:** `GET`
- **URL:** `http://localhost:3000/users/693a5e0df37267b905ba33fd`
- **Body:** Ninguno
- **Respuesta esperada:** Datos del usuario específico

### 3. Crear Nuevo Usuario
- **Método:** `POST`
- **URL:** `http://localhost:3000/users`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "nuevo@test.com",
  "password": "password123",
  "name": "Nuevo Usuario",
  "role": "user"
}
```
- **Respuesta esperada:** Usuario creado con su ID

### 4. Actualizar Usuario
- **Método:** `PUT`
- **URL:** `http://localhost:3000/users/693a5e89f37267b905ba3402`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Usuario Actualizado",
  "email": "actualizado@test.com"
}
```
- **Respuesta esperada:** Usuario actualizado

### 5. Eliminar Usuario
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/users/{ID_DEL_USUARIO}`
- **Body:** Ninguno
- **Respuesta esperada:** Confirmación de eliminación

---

## 🏥 ENDPOINTS DE PACIENTES

### 1. Listar Todos los Pacientes
- **Método:** `GET`
- **URL:** `http://localhost:3000/patients`
- **Body:** Ninguno
- **Respuesta esperada:** Array con todos los pacientes

### 2. Obtener Paciente por ID
- **Método:** `GET`
- **URL:** `http://localhost:3000/patients/{ID_DEL_PACIENTE}`
- **Body:** Ninguno
- **Respuesta esperada:** Datos del paciente específico

### 3. Crear Nuevo Paciente
- **Método:** `POST`
- **URL:** `http://localhost:3000/patients`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Juan Pérez",
  "age": 35,
  "gender": "Masculino",
  "medicalHistory": "Hipertensión controlada"
}
```
- **Respuesta esperada:** Paciente creado con su ID

### 4. Actualizar Paciente
- **Método:** `PUT`
- **URL:** `http://localhost:3000/patients/{ID_DEL_PACIENTE}`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Juan Pérez Actualizado",
  "age": 36,
  "medicalHistory": "Hipertensión controlada, diabetes tipo 2"
}
```
- **Respuesta esperada:** Paciente actualizado

### 5. Eliminar Paciente
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/patients/{ID_DEL_PACIENTE}`
- **Body:** Ninguno
- **Respuesta esperada:** Confirmación de eliminación

---

## 📅 ENDPOINTS DE CITAS

### 1. Listar Todas las Citas
- **Método:** `GET`
- **URL:** `http://localhost:3000/appointments`
- **Body:** Ninguno
- **Query Params (opcionales):**
  - `userId`: ID del usuario (para filtrar)
  - `role`: admin o user
- **Respuesta esperada:** Array con todas las citas (con populate de usuario y paciente)

### 2. Listar Citas por Fecha
- **Método:** `GET`
- **URL:** `http://localhost:3000/appointments/by-date?date=2025-12-20`
- **Query Params:**
  - `date`: Fecha en formato YYYY-MM-DD (requerido)
  - `userId`: ID del usuario (opcional)
  - `role`: admin o user (opcional)
- **Respuesta esperada:** Array con citas de esa fecha

### 3. Obtener Cita por ID
- **Método:** `GET`
- **URL:** `http://localhost:3000/appointments/{ID_DE_LA_CITA}`
- **Query Params (opcionales):**
  - `userId`: ID del usuario
  - `role`: admin o user
- **Respuesta esperada:** Datos de la cita específica

### 4. Crear Nueva Cita
- **Método:** `POST`
- **URL:** `http://localhost:3000/appointments`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "userId": "693a5e89f37267b905ba3402",
  "patient": "693a5e89f37267b905ba3402",
  "patientInfo": "693a6438898b04fecd8ec2ae",
  "date": "2025-12-25",
  "time": "10:00",
  "reason": "Consulta de control",
  "doctor": "Dr. García",
  "status": "pending"
}
```
- **Campos:**
  - `userId`: ID del usuario que crea la cita (requerido)
  - `patient`: ID del usuario paciente (requerido)
  - `patientInfo`: ID del registro de paciente (opcional)
  - `date`: Fecha en formato YYYY-MM-DD (requerido)
  - `time`: Hora en formato HH:MM (requerido)
  - `reason`: Motivo de la cita (requerido)
  - `doctor`: Nombre del doctor (opcional)
  - `status`: pending, confirmed, cancelled, completed (opcional, default: pending)
- **Respuesta esperada:** Cita creada con su ID

### 5. Actualizar Cita
- **Método:** `PUT`
- **URL:** `http://localhost:3000/appointments/{ID_DE_LA_CITA}`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "date": "2025-12-26",
  "time": "15:00",
  "status": "confirmed",
  "notes": "Paciente confirmó asistencia"
}
```
- **Respuesta esperada:** Cita actualizada

### 6. Eliminar Cita
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/appointments/{ID_DE_LA_CITA}`
- **Body:** Ninguno
- **Respuesta esperada:** Mensaje de confirmación

---

## 🔐 ENDPOINTS DE AUTENTICACIÓN

### 1. Login
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "admin@clinica.com",
  "password": "admin123"
}
```
- **Respuesta esperada:** Token JWT y datos del usuario
- **NOTA:** El token se genera pero NO es necesario usarlo

### 2. Registro de Usuario (Solo Admin)
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "nuevoregistro@test.com",
  "password": "password123",
  "name": "Usuario Registrado",
  "role": "user"
}
```
- **Respuesta esperada:** Usuario creado

### 3. Obtener Perfil
- **Método:** `GET`
- **URL:** `http://localhost:3000/auth/profile`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "userId": "693a5e0df37267b905ba33fd"
}
```
- **Respuesta esperada:** Datos del perfil del usuario

### 4. Cambiar Contraseña
- **Método:** `PUT`
- **URL:** `http://localhost:3000/auth/change-password`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "userId": "693a5e89f37267b905ba3402",
  "currentPassword": "user123",
  "newPassword": "nuevapassword123"
}
```
- **Respuesta esperada:** Confirmación de cambio

### 5. Solicitar Recuperación de Contraseña
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/forgot-password`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "usuario@clinica.com"
}
```
- **Respuesta esperada:** Mensaje con token de recuperación

### 6. Resetear Contraseña
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/reset-password`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "token": "TOKEN_RECIBIDO_EN_FORGOT_PASSWORD",
  "newPassword": "nuevapassword456"
}
```
- **Respuesta esperada:** Confirmación de reseteo

---

## 📊 IDs de Prueba Disponibles

### Usuarios:
- **Admin:** `693a5e0df37267b905ba33fd`
- **Usuario Normal:** `693a5e89f37267b905ba3402`

### Pacientes:
- **Paciente Prueba:** `693a6438898b04fecd8ec2ae`

### Citas:
- **Cita Prueba:** `693a6458898b04fecd8ec2b1`

---

## 🎯 Flujo de Prueba Recomendado en Postman

### 1. Crear una Colección
1. Abre Postman
2. Click en "New" → "Collection"
3. Nombra la colección: "Clínica API - Sin Auth"

### 2. Agregar Requests
Para cada endpoint:
1. Click en "Add request" en tu colección
2. Nombra el request (ej: "Listar Usuarios")
3. Selecciona el método (GET, POST, PUT, DELETE)
4. Ingresa la URL
5. Si es POST/PUT, ve a la pestaña "Body" → "raw" → selecciona "JSON"
6. Pega el JSON de ejemplo
7. Click en "Send"

### 3. Orden Sugerido de Pruebas

**Paso 1: Verificar que el servidor funciona**
```
GET http://localhost:3000/users
```

**Paso 2: Probar Login (opcional, solo para ver que funciona)**
```
POST http://localhost:3000/auth/login
Body: { "email": "admin@clinica.com", "password": "admin123" }
```

**Paso 3: Crear un paciente**
```
POST http://localhost:3000/patients
Body: { "name": "Test Paciente", "age": 30, "gender": "Masculino", "medicalHistory": "Ninguno" }
```
*Guarda el ID que te devuelve*

**Paso 4: Crear una cita**
```
POST http://localhost:3000/appointments
Body: {
  "userId": "693a5e89f37267b905ba3402",
  "patient": "693a5e89f37267b905ba3402",
  "patientInfo": "ID_DEL_PACIENTE_CREADO",
  "date": "2025-12-30",
  "time": "11:00",
  "reason": "Consulta de prueba",
  "doctor": "Dr. Test"
}
```

**Paso 5: Listar las citas**
```
GET http://localhost:3000/appointments
```

**Paso 6: Actualizar la cita**
```
PUT http://localhost:3000/appointments/ID_DE_LA_CITA
Body: { "status": "confirmed" }
```

---

## 💡 Tips para Postman

### 1. Variables de Entorno
Puedes crear variables para no escribir la URL base cada vez:
- Click en el ícono de ojo (👁️) arriba a la derecha
- Click en "Add" en Environments
- Crea una variable: `baseUrl` = `http://localhost:3000`
- Usa en tus requests: `{{baseUrl}}/users`

### 2. Guardar Respuestas
Después de crear un recurso (paciente, cita, etc.), copia el `_id` de la respuesta para usarlo en otros requests.

### 3. Tests Automáticos
Puedes agregar tests en la pestaña "Tests" de cada request:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
});
```

---

## ⚠️ Recordatorios Importantes

1. **No necesitas token de autenticación** - Los guards están deshabilitados
2. **Todos los endpoints son públicos** - Cualquiera puede acceder
3. **Esto es solo para desarrollo** - No usar en producción
4. **El servidor debe estar corriendo** - Verifica que esté en http://localhost:3000

---

## 🐛 Solución de Problemas

### Error: "Cannot GET /..."
- Verifica que el servidor esté corriendo
- Revisa que la URL esté correcta

### Error: "Internal server error"
- Revisa que los campos requeridos estén presentes
- Verifica que los IDs sean válidos (formato MongoDB ObjectId)

### Error: "Cannot POST /..."
- Asegúrate de seleccionar el método correcto (POST, no GET)
- Verifica que el header Content-Type esté en application/json

### No aparecen datos
- Puede que la base de datos esté vacía
- Crea algunos registros primero con POST

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que el servidor esté corriendo en la terminal
2. Revisa los logs del servidor para ver errores
3. Asegúrate de que MongoDB esté conectado
4. Verifica que los datos en el body sean válidos JSON

¡Listo para probar en Postman! 🚀
