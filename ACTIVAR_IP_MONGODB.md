# 🔧 Cómo Activar IP en MongoDB Atlas - Guía Paso a Paso

## ❌ Problema Actual
Las IPs están agregadas pero aparecen como "Inactive" (Inactivas), por lo que el servidor no puede conectarse.

## ✅ Solución: Método Más Fácil

### Opción 1: Eliminar y Volver a Agregar (RECOMENDADO)

1. **Eliminar las IPs inactivas:**
   - En la página "IP Access List"
   - Haz clic en el botón **"DELETE"** junto a cada IP
   - Confirma la eliminación

2. **Agregar nueva IP (permitir todo):**
   - Haz clic en el botón verde **"+ ADD IP ADDRESS"** (arriba a la derecha)
   - En el modal que aparece, selecciona **"ALLOW ACCESS FROM ANYWHERE"**
   - Esto agregará automáticamente `0.0.0.0/0` y estará **ACTIVA**
   - Haz clic en **"Confirm"**

3. **Verificar:**
   - Deberías ver `0.0.0.0/0` con estado **"Active"** (verde)
   - Espera 30-60 segundos para que se apliquen los cambios

### Opción 2: Editar la IP Existente

Si prefieres editar en lugar de eliminar:

1. **Editar la IP:**
   - Haz clic en **"EDIT"** junto a `0.0.0.0/0`
   
2. **En el formulario de edición:**
   - Asegúrate de que el campo "IP Address" tenga: `0.0.0.0/0`
   - **NO marques ninguna casilla de "Temporary"**
   - Deja el campo "Comment" vacío o con un comentario
   
3. **Guardar:**
   - Haz clic en **"Confirm"**
   - La IP debería cambiar a estado "Active"

### Opción 3: Agregar Solo Tu IP Actual

Si prefieres ser más específico:

1. **Agregar IP actual:**
   - Haz clic en **"+ ADD IP ADDRESS"**
   - Selecciona **"ADD CURRENT IP ADDRESS"**
   - MongoDB detectará automáticamente tu IP: `190.239.232.202`
   - Haz clic en **"Confirm"**

2. **Verificar:**
   - Deberías ver tu IP con estado **"Active"**

---

## 🔍 Verificar que Funciona

Una vez que la IP esté **ACTIVA**, verás en tu terminal:

```
[Nest] LOG [InstanceLoader] MongooseModule dependencies initialized +500ms
[Nest] LOG [InstanceLoader] AuthModule dependencies initialized +1ms
[Nest] LOG [InstanceLoader] UsersModule dependencies initialized +1ms
[Nest] LOG [InstanceLoader] PatientsModule dependencies initialized +0ms
[Nest] LOG [InstanceLoader] AppointmentsModule dependencies initialized +1ms
[Nest] LOG [RoutesResolver] AuthController {/auth} +10ms
[Nest] LOG [RouterExplorer] Mapped {/auth/register, POST} route +2ms
[Nest] LOG [RouterExplorer] Mapped {/auth/login, POST} route +1ms
[Nest] LOG [NestApplication] Nest application successfully started +3ms
```

---

## ⚠️ Posibles Problemas

### Si la IP sigue apareciendo como "Inactive":

1. **Refresca la página del navegador** (F5 o Ctrl+R)
2. **Cierra sesión y vuelve a iniciar sesión** en MongoDB Atlas
3. **Usa un navegador diferente** (Chrome, Firefox, Edge)
4. **Verifica que estés en el cluster correcto** (clinicaapp)

### Si después de activar sigue sin conectarse:

1. **Verifica la URI de MongoDB en .env:**
   ```env
   MONGODB_URI=mongodb+srv://obertynunezobi_db_user:OJTzY3sOGI15puyx@clinicaapp.o29zfin.mongodb.net/clinicaapp
   ```

2. **Verifica que el usuario y contraseña sean correctos:**
   - Ve a "Database Access" en MongoDB Atlas
   - Verifica que el usuario `obertynunezobi_db_user` exista y esté activo

3. **Reinicia el servidor:**
   - Presiona `Ctrl+C` en la terminal
   - Ejecuta: `npm run start:dev`

---

## 📸 Cómo Debería Verse

Cuando esté correctamente configurado, deberías ver:

```
IP Access List

IP Address                          Comment    Status
0.0.0.0/0 (includes your current   [vacío]    ● Active
IP address)
```

El punto verde (●) indica que está **ACTIVA**.

---

## 🆘 Si Nada Funciona

Como última opción, puedes usar MongoDB local:

1. **Instalar MongoDB Community:**
   - https://www.mongodb.com/try/download/community
   - Descarga e instala para Windows

2. **Actualizar .env:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/clinicaapp
   ```

3. **Reiniciar el servidor:**
   ```bash
   npm run start:dev
   ```

---

## ✅ Siguiente Paso

Una vez que veas el mensaje de "Nest application successfully started", ejecuta:

```bash
create-admin-curl.bat
```

O usa curl:
```bash
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{\"email\":\"admin@clinica.com\",\"password\":\"admin123\",\"name\":\"Administrador\",\"role\":\"admin\"}"
```

---

**¿Necesitas ayuda adicional?** Comparte una captura de pantalla de la página "IP Access List" después de intentar activar la IP.
