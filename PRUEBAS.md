# 🧪 Guía de Pruebas - Sistema de Citas Médicas

## 🚀 Iniciar el Sistema

### Con Docker (Recomendado)
```bash
docker-compose up --build
```

Espera a que veas estos mensajes:
```
clinica-frontend  | Server listening on port 80
clinica-api       | 🚀 Servidor corriendo en: http://localhost:2030
clinica-mongo     | Waiting for connections
```

### URLs de Acceso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:2030

---

## 🔐 Paso 1: Iniciar Sesión

1. Abre el navegador en http://localhost:3000
2. Deberías ver la página de login
3. Ingresa las credenciales:
   - **Email**: `admin@clinica.com`
   - **Password**: `admin123`
4. Click en "Iniciar Sesión"
5. Deberías ser redirigido al Dashboard

---

## 📊 Paso 2: Explorar el Dashboard

En el Dashboard deberías ver:
- ✅ Estadísticas (Total de citas, pacientes, usuarios)
- ✅ Tabla de citas recientes
- ✅ Menú de navegación en la parte superior

---

## 📅 Paso 3: Gestión de Citas

### Ver Citas
1. Click en "Citas" en el menú
2. Deberías ver la lista de citas (puede estar vacía al inicio)

### Crear una Cita
1. Click en "Nueva Cita"
2. Completa el formulario:
   - **Fecha**: Selecciona una fecha futura
   - **Hora**: Ejemplo: `10:00`
   - **Motivo**: Ejemplo: `Consulta general`
   - **Doctor**: Ejemplo: `Dr. Juan Pérez`
   - **Estado**: Selecciona `Pendiente`
3. Click en "Crear Cita"
4. Deberías ver un mensaje de éxito
5. La cita aparecerá en la lista

### Eliminar una Cita (Solo Admin)
1. Click en el botón rojo "Eliminar" de una cita
2. Confirma la eliminación
3. La cita desaparecerá de la lista

---

## 👥 Paso 4: Gestión de Pacientes (Solo Admin)

### Ver Pacientes
1. Click en "Pacientes" en el menú
2. Deberías ver la lista de pacientes

### Crear un Paciente
1. Click en "Nuevo Paciente"
2. Completa el formulario:
   - **Nombre**: Ejemplo: `María García`
   - **Email**: Ejemplo: `maria@email.com`
   - **Teléfono**: Ejemplo: `987654321`
   - **Fecha de Nacimiento**: Selecciona una fecha
   - **Dirección**: Ejemplo: `Av. Principal 123`
   - **Tipo de Sangre**: Ejemplo: `O+`
   - **Alergias**: Ejemplo: `Ninguna`
   - **Condiciones Médicas**: Ejemplo: `Ninguna`
3. Click en "Crear Paciente"
4. El paciente aparecerá en la lista

### Eliminar un Paciente
1. Click en el botón rojo "Eliminar"
2. Confirma la eliminación

---

## 👤 Paso 5: Gestión de Usuarios (Solo Admin)

### Ver Usuarios
1. Click en "Usuarios" en el menú
2. Deberías ver la lista de usuarios (al menos el admin)

### Crear un Usuario
1. Click en "Nuevo Usuario"
2. Completa el formulario:
   - **Nombre**: Ejemplo: `Carlos López`
   - **Email**: Ejemplo: `carlos@email.com`
   - **Password**: Ejemplo: `password123`
   - **Rol**: Selecciona `user` o `admin`
3. Click en "Crear Usuario"
4. El usuario aparecerá en la lista

### Probar con Usuario Normal
1. Cierra sesión (botón "Cerrar Sesión")
2. Inicia sesión con el nuevo usuario
3. Verifica que:
   - ✅ Puede ver el Dashboard
   - ✅ Puede ver y crear Citas
   - ❌ NO puede ver Pacientes
   - ❌ NO puede ver Usuarios

---

## 🔄 Paso 6: Cerrar Sesión

1. Click en "Cerrar Sesión" en el menú
2. Deberías ser redirigido a la página de login
3. El token JWT se elimina del localStorage

---

## 🧪 Pruebas de la API (Opcional)

### Usando cURL

#### Login
```bash
curl -X POST http://localhost:2030/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@clinica.com\",\"password\":\"admin123\"}"
```

#### Obtener Citas (con token)
```bash
curl -X GET http://localhost:2030/appointments \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

#### Crear Cita
```bash
curl -X POST http://localhost:2030/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d "{\"date\":\"2024-12-20\",\"time\":\"10:00\",\"reason\":\"Consulta\",\"doctor\":\"Dr. Pérez\",\"status\":\"Pendiente\"}"
```

### Usando Postman
1. Importa el archivo `Clinica-API-Sin-Auth.postman_collection.json`
2. Ejecuta las peticiones en orden

---

## ✅ Checklist de Pruebas

### Autenticación
- [ ] Login con credenciales correctas
- [ ] Login con credenciales incorrectas (debe fallar)
- [ ] Cerrar sesión
- [ ] Acceso a rutas protegidas sin token (debe redirigir a login)

### Dashboard
- [ ] Ver estadísticas
- [ ] Ver citas recientes
- [ ] Navegación funciona correctamente

### Citas
- [ ] Listar citas
- [ ] Crear nueva cita
- [ ] Validación de formulario
- [ ] Eliminar cita (solo admin)
- [ ] Filtrar por estado

### Pacientes (Admin)
- [ ] Listar pacientes
- [ ] Crear nuevo paciente
- [ ] Validación de formulario
- [ ] Eliminar paciente
- [ ] Usuario normal NO puede acceder

### Usuarios (Admin)
- [ ] Listar usuarios
- [ ] Crear nuevo usuario
- [ ] Asignar roles
- [ ] Eliminar usuario
- [ ] Usuario normal NO puede acceder

### Responsive Design
- [ ] Funciona en móvil
- [ ] Funciona en tablet
- [ ] Funciona en desktop

---

## 🐛 Problemas Comunes

### Frontend no carga
```bash
# Verificar que el contenedor esté corriendo
docker ps

# Ver logs del frontend
docker logs clinica-frontend

# Reiniciar el contenedor
docker-compose restart frontend
```

### Backend no responde
```bash
# Ver logs del backend
docker logs clinica-api

# Verificar conexión a MongoDB
docker logs clinica-mongo

# Reiniciar todo
docker-compose restart
```

### Error de CORS
- Verifica que el backend tenga CORS habilitado
- Verifica la URL de la API en `frontend/.env`

### No puedo crear el usuario admin
```bash
# Si usas Docker, ejecuta dentro del contenedor
docker exec -it clinica-api npm run create-admin

# O sin Docker
npm run create-admin
```

---

## 📊 Datos de Prueba

### Usuarios
```
Admin:
- Email: admin@clinica.com
- Password: admin123

Usuario Normal (crear manualmente):
- Email: usuario@email.com
- Password: user123
- Rol: user
```

### Pacientes de Ejemplo
```
Paciente 1:
- Nombre: María García
- Email: maria@email.com
- Teléfono: 987654321
- Tipo de Sangre: O+

Paciente 2:
- Nombre: Juan Pérez
- Email: juan@email.com
- Teléfono: 912345678
- Tipo de Sangre: A+
```

### Citas de Ejemplo
```
Cita 1:
- Fecha: 2024-12-20
- Hora: 10:00
- Motivo: Consulta general
- Doctor: Dr. Juan Pérez
- Estado: Pendiente

Cita 2:
- Fecha: 2024-12-21
- Hora: 15:00
- Motivo: Control
- Doctor: Dra. Ana López
- Estado: Confirmada
```

---

## 🎯 Escenarios de Prueba Avanzados

### Escenario 1: Flujo Completo de Admin
1. Login como admin
2. Crear 3 pacientes
3. Crear 5 citas
4. Crear 2 usuarios (1 admin, 1 user)
5. Eliminar 1 cita
6. Cerrar sesión

### Escenario 2: Flujo de Usuario Normal
1. Login como usuario normal
2. Ver dashboard (solo sus datos)
3. Crear 2 citas
4. Intentar acceder a Pacientes (debe fallar)
5. Intentar acceder a Usuarios (debe fallar)
6. Cerrar sesión

### Escenario 3: Validaciones
1. Intentar crear cita sin fecha
2. Intentar crear paciente sin email
3. Intentar crear usuario con email duplicado
4. Intentar login con credenciales incorrectas

---

## 📈 Métricas de Éxito

El sistema funciona correctamente si:
- ✅ Todos los endpoints responden
- ✅ La autenticación funciona
- ✅ Los roles se respetan
- ✅ Las validaciones funcionan
- ✅ El diseño es responsive
- ✅ No hay errores en consola
- ✅ Los datos persisten en MongoDB

---

**¡Buena suerte con las pruebas! 🚀**
