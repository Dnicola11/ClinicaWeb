# 🚀 Inicio Rápido - Sistema de Citas Médicas

## ⚡ Opción 1: Docker (MÁS FÁCIL - RECOMENDADO)

### Requisitos
- Docker Desktop instalado
- Docker Compose instalado

### Pasos

1. **Abrir terminal en la carpeta del proyecto**

2. **Levantar todo el sistema con un comando:**
```bash
docker-compose up --build
```

3. **Esperar a que todos los servicios estén listos** (puede tomar 2-3 minutos la primera vez)

4. **Acceder a las aplicaciones:**
   - 🌐 **Frontend**: http://localhost:3000
   - 🔧 **Backend API**: http://localhost:2030
   - 🗄️ **MongoDB**: localhost:27017

5. **Iniciar sesión con:**
   - Email: `admin@clinica.com`
   - Password: `admin123`

### Detener el sistema
```bash
docker-compose down
```

---

## 💻 Opción 2: Desarrollo Local

### Requisitos
- Node.js 16+ instalado
- MongoDB instalado y corriendo
- npm o yarn

### Pasos

#### 1. Backend

```bash
# En la raíz del proyecto
npm install

# Crear archivo .env con:
MONGODB_URI=mongodb://localhost:27017/clinica
JWT_SECRET=tu_clave_secreta
PORT=2030

# Crear usuario admin
npm run create-admin

# Iniciar backend
npm run start:dev
```

Backend corriendo en: http://localhost:2030

#### 2. Frontend (en otra terminal)

```bash
# Ir a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env con:
VITE_API_URL=http://localhost:2030

# Iniciar frontend
npm run dev
```

Frontend corriendo en: http://localhost:5173

#### 3. Iniciar sesión
- Email: `admin@clinica.com`
- Password: `admin123`

---

## 🎯 Acceso Rápido

### Con Docker
```bash
# Iniciar todo
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener todo
docker-compose down
```

### Sin Docker (Windows)
```bash
# Ejecutar el script
start-project.bat
# Seleccionar opción 2
```

---

## 📱 Funcionalidades Disponibles

### Como Administrador
✅ Dashboard con estadísticas
✅ Gestión de citas
✅ Gestión de pacientes
✅ Gestión de usuarios

### Como Usuario
✅ Dashboard personal
✅ Ver mis citas
✅ Crear nuevas citas

---

## 🆘 Problemas Comunes

### Docker no inicia
```bash
# Verificar que Docker Desktop esté corriendo
docker --version

# Limpiar y reiniciar
docker-compose down -v
docker-compose up --build
```

### Puerto ocupado
```bash
# Cambiar puertos en docker-compose.yml
# Frontend: "3001:80" en lugar de "3000:80"
# Backend: "2031:2030" en lugar de "2030:2030"
```

### MongoDB no conecta
```bash
# Verificar que MongoDB esté corriendo
# Con Docker:
docker ps | grep mongo

# Sin Docker:
mongod --version
```

---

## 📚 Más Información

- Ver `README-COMPLETO.md` para documentación completa
- Ver `frontend/README.md` para detalles del frontend
- Ver `README.md` para detalles del backend

---

**¡Listo para usar! 🎉**
