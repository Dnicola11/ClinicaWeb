# 🚀 Guía Rápida de Inicio

## ⚠️ IMPORTANTE: Activar IP en MongoDB Atlas

Veo que agregaste las IPs pero están **INACTIVAS**. Necesitas activarlas:

### Pasos para Activar:

1. **En MongoDB Atlas**, en la página de "IP Access List"
2. Haz clic en el botón **"EDIT"** junto a la IP `0.0.0.0/0`
3. Asegúrate de que esté **ACTIVA** (no "Inactive")
4. Haz clic en **"Confirm"**
5. Espera 1-2 minutos para que se apliquen los cambios

### Alternativa Rápida:

Si las IPs siguen inactivas:

1. **ELIMINA** ambas IPs (botón DELETE)
2. Haz clic en **"+ ADD IP ADDRESS"**
3. Selecciona **"ALLOW ACCESS FROM ANYWHERE"**
4. Esto agregará `0.0.0.0/0` automáticamente y **ACTIVA**
5. Haz clic en **"Confirm"**

---

## 📋 Una vez que la IP esté ACTIVA:

### 1. El servidor se conectará automáticamente

Verás en la terminal:
```
[Nest] LOG [InstanceLoader] MongooseModule dependencies initialized
[Nest] LOG [NestApplication] Nest application successfully started on port 3000
```

### 2. Crear el Usuario Administrador

**Opción A: Usando el script (Windows)**
```bash
create-admin-curl.bat
```

**Opción B: Usando curl directamente**
```bash
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{\"email\":\"admin@clinica.com\",\"password\":\"admin123\",\"name\":\"Administrador\",\"role\":\"admin\"}"
```

**Opción C: Usando Postman o Thunder Client**
- URL: `http://localhost:3000/auth/register`
- Método: POST
- Body (JSON):
```json
{
  "email": "admin@clinica.com",
  "password": "admin123",
  "name": "Administrador",
  "role": "admin"
}
```

### 3. Probar el Login

```bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@clinica.com\",\"password\":\"admin123\"}"
```

Deberías recibir un token JWT:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@clinica.com",
    "name": "Administrador",
    "role": "admin"
  }
}
```

### 4. Reactivar los Guards de Seguridad

⚠️ **MUY IMPORTANTE**: Después de crear el admin, edita `src/auth/auth.controller.ts`:

**Descomenta estas líneas:**
```typescript
@Post('register')
@UseGuards(JwtAuthGuard, RolesGuard)  // ← Descomentar
@Roles(Role.ADMIN)                     // ← Descomentar
async register(@Body() registerDto: RegisterDto) {
  return this.authService.register(registerDto);
}
```

El servidor se recargará automáticamente.

---

## 🧪 Testing Rápido

### 1. Login como Admin
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@clinica.com","password":"admin123"}'
```

Guarda el `access_token` que recibes.

### 2. Crear un Usuario Normal
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "email": "usuario@example.com",
    "password": "user123",
    "name": "Usuario Normal",
    "role": "user"
  }'
```

### 3. Crear un Paciente
```bash
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "name": "Juan Pérez",
    "age": 35,
    "gender": "Masculino",
    "medicalHistory": "Sin antecedentes"
  }'
```

### 4. Login como Usuario Normal
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"user123"}'
```

### 5. Crear una Cita (como usuario)
```bash
curl -X POST http://localhost:3000/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_DEL_USUARIO" \
  -d '{
    "patientInfo": "ID_DEL_PACIENTE",
    "date": "2024-02-15T00:00:00.000Z",
    "time": "10:00",
    "reason": "Consulta general",
    "doctor": "Dr. Juan Pérez"
  }'
```

### 6. Listar Citas
```bash
# Como admin (ve todas)
curl -X GET http://localhost:3000/appointments \
  -H "Authorization: Bearer TOKEN_ADMIN"

# Como usuario (solo las suyas)
curl -X GET http://localhost:3000/appointments \
  -H "Authorization: Bearer TOKEN_USUARIO"
```

---

## 📚 Documentación Completa

- **README.md** - Guía completa del proyecto
- **API_DOCUMENTATION.md** - Todos los endpoints con ejemplos
- **TROUBLESHOOTING.md** - Solución de problemas
- **IMPLEMENTATION_SUMMARY.md** - Resumen técnico

---

## ✅ Checklist Final

- [ ] IP activa en MongoDB Atlas
- [ ] Servidor conectado y corriendo
- [ ] Usuario admin creado
- [ ] Login exitoso con admin
- [ ] Guards reactivados en auth.controller.ts
- [ ] Usuario normal creado
- [ ] Cita creada y listada

---

## 🆘 ¿Problemas?

1. **Servidor no se conecta**: Verifica que la IP esté ACTIVA en MongoDB Atlas
2. **Error 401**: Verifica que el token JWT sea válido
3. **Error 403**: Verifica que tu usuario tenga el rol correcto
4. **Puerto ocupado**: Cambia el puerto en `.env` o cierra el proceso que usa el puerto 3000

---

**¡Listo para usar!** 🎉
