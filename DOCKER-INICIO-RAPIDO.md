# 🐳 Docker Desktop - Inicio Rápido

## ⚡ 3 Pasos para Levantar tu Proyecto

### 1️⃣ Asegúrate que Docker Desktop esté corriendo
- Busca el ícono de la ballena 🐋 en tu barra de tareas
- Si está en **gris** → Haz clic derecho → "Start Docker Desktop"
- Espera a que esté en **color** ✅

### 2️⃣ Ejecuta el script
Haz doble clic en:
```
start-docker.bat
```

O desde la terminal:
```bash
docker-compose up --build
```

### 3️⃣ Accede a la aplicación
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:2030

**Credenciales:**
- Email: `admin@clinica.com`
- Password: `admin123`

---

## 🎯 Comandos Esenciales

### Levantar el proyecto
```bash
docker-compose up
```

### Levantar en segundo plano
```bash
docker-compose up -d
```

### Ver logs en tiempo real
```bash
docker-compose logs -f
```

### Detener el proyecto
```bash
docker-compose down
```

### Limpiar todo y empezar de nuevo
```bash
docker-compose down -v
docker-compose up --build
```

---

## 🖥️ Usando Docker Desktop (Interfaz Gráfica)

### Ver tus Contenedores
1. Abre Docker Desktop
2. Ve a "Containers"
3. Verás 3 contenedores:
   - ✅ `clinica-frontend` (Frontend)
   - ✅ `clinica-api` (Backend)
   - ✅ `clinica-mongo` (Base de datos)

### Ver Logs
1. Haz clic en cualquier contenedor
2. Ve a la pestaña "Logs"
3. Verás los logs en tiempo real

### Detener/Iniciar
- Usa los botones ⏸️ (pausa) y ▶️ (play)
- O haz clic derecho → Stop/Start

---

## ⚠️ Problemas Comunes

### "Docker daemon is not running"
**Solución:** Inicia Docker Desktop

### "Port already in use"
**Solución:** Detén los servicios locales:
```bash
# Detén el backend local si está corriendo
# Detén el frontend local si está corriendo
```

### Los cambios no se reflejan
**Solución:** Reconstruye:
```bash
docker-compose up --build
```

---

## 📊 Arquitectura del Proyecto

```
┌─────────────────────────────────────────┐
│         Docker Desktop                   │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐  ┌──────────────┐    │
│  │   Frontend   │  │   Backend    │    │
│  │   (React)    │→ │   (NestJS)   │    │
│  │  Port: 3000  │  │  Port: 2030  │    │
│  └──────────────┘  └──────┬───────┘    │
│                            │             │
│                     ┌──────▼───────┐    │
│                     │   MongoDB    │    │
│                     │  Port: 27017 │    │
│                     └──────────────┘    │
│                                          │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist Antes de Empezar

- [ ] Docker Desktop instalado
- [ ] Docker Desktop corriendo (ícono en color)
- [ ] Puertos 3000, 2030 y 27017 libres
- [ ] Terminal abierta en la carpeta del proyecto

---

## 🎉 ¡Listo!

Una vez que ejecutes `docker-compose up --build`:

1. ⏳ Espera 2-5 minutos (primera vez)
2. 🌐 Abre http://localhost:3000
3. 🔐 Login con admin@clinica.com / admin123
4. ✨ ¡Disfruta tu aplicación!

---

## 📚 Más Información

Para una guía completa, consulta: **GUIA-DOCKER-DESKTOP.md**
