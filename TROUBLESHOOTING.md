# 🔧 Guía de Solución de Problemas

## ❌ Error: No se puede conectar a MongoDB Atlas

### Problema
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster.
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

### Solución

#### Opción 1: Agregar tu IP a la Whitelist (Recomendado para desarrollo)

1. **Ir a MongoDB Atlas**
   - Visita: https://cloud.mongodb.com/
   - Inicia sesión con tu cuenta

2. **Navegar a Network Access**
   - En el menú lateral, haz clic en "Network Access"
   - O ve directamente a: https://cloud.mongodb.com/v2#/security/network/accessList

3. **Agregar IP Address**
   - Haz clic en el botón "ADD IP ADDRESS"
   - Selecciona una de estas opciones:
     
     **a) Agregar tu IP actual:**
     - Haz clic en "ADD CURRENT IP ADDRESS"
     - MongoDB detectará automáticamente tu IP
     
     **b) Permitir acceso desde cualquier lugar (solo para desarrollo):**
     - Ingresa: `0.0.0.0/0`
     - ⚠️ **ADVERTENCIA**: Esto permite conexiones desde cualquier IP
     - Solo usar en desarrollo, NUNCA en producción
     
     **c) Agregar IP específica:**
     - Ingresa tu IP pública manualmente
     - Puedes obtenerla en: https://www.whatismyip.com/

4. **Confirmar**
   - Haz clic en "Confirm"
   - Espera unos segundos a que se apliquen los cambios

5. **Reintentar**
   ```bash
   npm run create-admin
   ```

#### Opción 2: Verificar la URI de MongoDB

1. **Obtener la URI correcta**
   - Ve a MongoDB Atlas
   - Haz clic en "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia la URI de conexión

2. **Actualizar .env**
   ```env
   MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```
   
   Reemplaza:
   - `<usuario>`: Tu usuario de MongoDB
   - `<password>`: Tu contraseña (sin < >)
   - `<cluster>`: Tu cluster
   - `<database>`: Nombre de tu base de datos

3. **Reintentar**
   ```bash
   npm run create-admin
   ```

#### Opción 3: Usar MongoDB Local (Alternativa)

Si prefieres usar MongoDB localmente:

1. **Instalar MongoDB Community**
   - Descarga desde: https://www.mongodb.com/try/download/community
   - Instala siguiendo las instrucciones

2. **Iniciar MongoDB**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

3. **Actualizar .env**
   ```env
   MONGODB_URI=mongodb://localhost:27017/clinicaapp
   ```

4. **Reintentar**
   ```bash
   npm run create-admin
   ```

---

## 🔐 Crear Usuario Admin Manualmente

Si el script no funciona, puedes crear el admin manualmente:

### Opción A: Usando MongoDB Compass

1. **Descargar MongoDB Compass**
   - https://www.mongodb.com/try/download/compass

2. **Conectar a tu base de datos**
   - Pega tu URI de MongoDB

3. **Crear la colección "users"**
   - Selecciona tu base de datos
   - Crea una nueva colección llamada "users"

4. **Insertar documento**
   ```json
   {
     "email": "admin@clinica.com",
     "password": "$2b$10$YourHashedPasswordHere",
     "name": "Administrador",
     "role": "admin",
     "isActive": true,
     "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
     "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
   }
   ```

5. **Generar password hasheado**
   - Usa este script Node.js:
   ```javascript
   const bcrypt = require('bcrypt');
   bcrypt.hash('admin123', 10, (err, hash) => {
     console.log(hash);
   });
   ```

### Opción B: Temporalmente deshabilitar el Guard

1. **Editar auth.controller.ts**
   ```typescript
   // Comentar temporalmente el guard
   @Post('register')
   // @UseGuards(JwtAuthGuard, RolesGuard)
   // @Roles(Role.ADMIN)
   async register(@Body() registerDto: RegisterDto) {
     return this.authService.register(registerDto);
   }
   ```

2. **Iniciar el servidor**
   ```bash
   npm run start:dev
   ```

3. **Crear admin vía API**
   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@clinica.com",
       "password": "admin123",
       "name": "Administrador",
       "role": "admin"
     }'
   ```

4. **Reactivar el guard**
   - Descomenta las líneas en auth.controller.ts
   - Reinicia el servidor

---

## 🚀 Otros Problemas Comunes

### Error: "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Error: "JWT secret not defined"
```bash
# Verificar que .env tenga JWT_SECRET
echo $JWT_SECRET  # Mac/Linux
echo %JWT_SECRET%  # Windows
```

---

## 📞 Necesitas Más Ayuda?

1. **Revisa los logs del servidor**
   ```bash
   npm run start:dev
   ```

2. **Verifica las variables de entorno**
   ```bash
   # Crear .env si no existe
   cp .env.example .env
   ```

3. **Consulta la documentación**
   - README.md
   - API_DOCUMENTATION.md
   - IMPLEMENTATION_SUMMARY.md

---

## ✅ Checklist de Verificación

Antes de iniciar el servidor, verifica:

- [ ] MongoDB está accesible (Atlas o local)
- [ ] Tu IP está en la whitelist de MongoDB Atlas
- [ ] El archivo .env existe y tiene las variables correctas
- [ ] Las dependencias están instaladas (`npm install`)
- [ ] El usuario admin existe en la base de datos
- [ ] El puerto 3000 está disponible

---

**Última actualización**: Enero 2025
