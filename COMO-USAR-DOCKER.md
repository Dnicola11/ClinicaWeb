# 🐳 Cómo Usar Docker con Tu Proyecto

## ✅ Cambios Realizados

He actualizado ambos Dockerfiles para usar **Node.js 20** (la versión más reciente y compatible):

1. ✅ **Backend Dockerfile** - Actualizado a Node 20
2. ✅ **Frontend Dockerfile** - Actualizado a Node 20

---

## 🚀 Comandos Esenciales de Docker

### 1️⃣ Levantar Todo el Proyecto (Primera Vez)

```bash
docker-compose up --build
```

**Qué hace:**
- Construye las imágenes de Docker (frontend + backend)
- Descarga MongoDB (solo la primera vez)
- Inicia los 3 contenedores
- Muestra los logs en tiempo real

**Tiempo estimado:** 2-3 minutos la primera vez

---

### 2️⃣ Levantar el Proyecto (Siguientes Veces)

```bash
docker-compose up
```

**Qué hace:**
- Usa las imágenes ya construidas
- Inicia los 3 contenedores rápidamente

**Tiempo estimado:** 30-60 segundos

---

### 3️⃣ Detener el Proyecto

**Opción 1: En la terminal donde está corriendo**
```
Presiona: Ctrl + C
```

**Opción 2: Desde otra terminal**
```bash
docker-compose down
```

---

### 4️⃣ Ver el Estado de los Contenedores

```bash
docker-compose ps
```

**Deberías ver:**
```
NAME               STATUS    PORTS
clinica-frontend   Up        0.0.0.0:3000->80/tcp
clinica-api        Up        0.0.0.0:2030->2030/tcp
clinica-mongo      Up        0.0.0.0:27017->27017/tcp
```

---

### 5️⃣ Ver Logs en Tiempo Real

**Todos los servicios:**
```bash
docker-compose logs -f
```

**Solo un servicio:**
```bash
docker-compose logs -f frontend
docker-compose logs -f api
docker-compose logs -f mongo
```

---

### 6️⃣ Reconstruir Todo (Si Haces Cambios)

```bash
docker-compose up --build
```

O si quieres forzar una reconstrucción completa:
```bash
docker-compose build --no-cache
docker-compose up
```

---

### 7️⃣ Limpiar Todo y Empezar de Cero

```bash
# Detener y eliminar contenedores, redes
docker-compose down

# Eliminar también los volúmenes (BORRA LA BASE DE DATOS)
docker-compose down -v

# Eliminar imágenes construidas
docker-compose down --rmi all
```

---

## 🌐 Acceder a Tu Aplicación

Una vez que los contenedores estén corriendo:

### Frontend (Interfaz Web)
```
http://localhost:3000
```

**Credenciales de prueba:**
- Email: `admin@clinica.com`
- Password: `admin123`

### Backend API
```
http://localhost:2030
```

**Ejemplo de endpoint:**
```
http://localhost:2030/auth/login
```

### MongoDB
```
mongodb://localhost:27017/clinica
```

---

## 📊 Verificar que Todo Está Funcionando

### En Docker Desktop:
1. Abre Docker Desktop
2. Ve a "Containers"
3. Deberías ver "backclinica-main" con 3 contenedores:
   - 🟢 clinica-frontend (puerto 3000)
   - 🟢 clinica-api (puerto 2030)
   - 🟢 clinica-mongo (puerto 27017)

### En el Navegador:
1. Abre http://localhost:3000
2. Deberías ver la página de login
3. Inicia sesión con las credenciales de prueba

---

## 🔧 Solución de Problemas

### Error: "port is already allocated"
**Solución:** Otro servicio está usando el puerto
```bash
# Windows - Ver qué está usando el puerto 3000
netstat -ano | findstr :3000

# Detener el proceso (reemplaza PID con el número que viste)
taskkill /PID <PID> /F
```

### Error: "Cannot connect to MongoDB"
**Solución:** Espera unos segundos más, MongoDB tarda en iniciar
```bash
# Ver logs de MongoDB
docker-compose logs mongo
```

### Error: "Cannot find module"
**Solución:** Reconstruir las imágenes
```bash
docker-compose down
docker-compose up --build
```

### Los cambios en el código no se reflejan
**Solución:** Necesitas reconstruir
```bash
docker-compose up --build
```

---

## 💡 Consejos Útiles

### 1. Desarrollo Local vs Docker

**Para desarrollo activo (con hot-reload):**
```bash
# Terminal 1: Backend
npm run start:dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

**Para pruebas de producción:**
```bash
docker-compose up
```

### 2. Crear Usuario Admin

Si necesitas crear un usuario admin:

**Opción 1: Dentro del contenedor**
```bash
docker-compose exec api npm run create-admin
```

**Opción 2: Localmente**
```bash
npm run create-admin
```

### 3. Acceder a la Base de Datos

**Desde el contenedor:**
```bash
docker-compose exec mongo mongosh
```

**Desde tu máquina (si tienes MongoDB Compass):**
```
mongodb://localhost:27017/clinica
```

---

## 📝 Estructura de Puertos

| Servicio | Puerto Interno | Puerto Externo | URL |
|----------|---------------|----------------|-----|
| Frontend | 80 | 3000 | http://localhost:3000 |
| Backend | 2030 | 2030 | http://localhost:2030 |
| MongoDB | 27017 | 27017 | mongodb://localhost:27017 |

---

## 🎯 Próximos Pasos

1. ✅ Actualicé los Dockerfiles a Node 20
2. ✅ Detuve los contenedores anteriores
3. ⏳ **SIGUIENTE:** Ejecuta `docker-compose up --build`
4. ⏳ Espera 2-3 minutos
5. ⏳ Abre http://localhost:3000
6. ⏳ ¡Disfruta tu aplicación!

---

## 🆘 Ayuda Rápida

**¿El proyecto no inicia?**
```bash
docker-compose down
docker-compose up --build
```

**¿Quieres ver qué está pasando?**
```bash
docker-compose logs -f
```

**¿Necesitas empezar de cero?**
```bash
docker-compose down -v
docker-compose up --build
```

---

## 🎉 ¡Listo!

Tu proyecto ahora está configurado con:
- ✅ Node.js 20 (última versión estable)
- ✅ Docker Compose orquestando 3 servicios
- ✅ Frontend React + TypeScript
- ✅ Backend NestJS
- ✅ MongoDB

**Comando para iniciar:**
```bash
docker-compose up --build
```

**Luego abre:** http://localhost:3000
