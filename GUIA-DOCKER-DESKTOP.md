# 🐳 Guía Completa: Docker Desktop para tu Proyecto

## 📋 Requisitos Previos

1. ✅ **Docker Desktop instalado** (ya lo tienes)
2. ✅ **Docker Desktop debe estar corriendo** (ícono de ballena en la barra de tareas)

---

## 🚀 Pasos para Levantar el Proyecto con Docker Desktop

### Paso 1: Verificar que Docker Desktop está corriendo

1. Busca el ícono de Docker (ballena) en tu barra de tareas de Windows
2. Si está en gris, haz clic derecho y selecciona "Start Docker Desktop"
3. Espera a que el ícono se ponga en color (significa que está corriendo)

### Paso 2: Abrir Docker Desktop (Opcional pero recomendado)

1. Abre la aplicación Docker Desktop
2. Verás una interfaz gráfica donde podrás:
   - Ver los contenedores corriendo
   - Ver las imágenes
   - Ver los volúmenes
   - Ver los logs en tiempo real

### Paso 3: Abrir Terminal en la Carpeta del Proyecto

1. Abre una terminal (PowerShell o CMD) en la carpeta del proyecto:
   ```
   c:/Users/David Nicola/Desktop/IDAT 2 Parte/Curso Jueves/backclinica-main
   ```

2. O desde VSCode, abre una nueva terminal (Ctrl + Shift + `)

### Paso 4: Construir y Levantar los Contenedores

Ejecuta este comando:

```bash
docker-compose up --build
```

**¿Qué hace este comando?**
- `docker-compose`: Usa Docker Compose para orquestar múltiples contenedores
- `up`: Levanta los servicios
- `--build`: Construye las imágenes antes de levantar (importante la primera vez)

### Paso 5: Esperar a que Todo Esté Listo

Verás en la terminal algo como:

```
✅ mongo       | MongoDB starting...
✅ api         | Nest application successfully started
✅ frontend    | Server running at http://localhost:3000
```

**Tiempo estimado:** 2-5 minutos la primera vez (descarga imágenes y construye)

### Paso 6: Acceder a la Aplicación

Una vez que todo esté corriendo:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:2030
- **MongoDB:** localhost:27017 (solo para conexiones internas)

---

## 🎯 Comandos Útiles de Docker

### Ver Contenedores Corriendo
```bash
docker ps
```

### Ver Todos los Contenedores (incluso detenidos)
```bash
docker ps -a
```

### Detener los Contenedores
```bash
docker-compose down
```

### Detener y Eliminar Volúmenes (limpieza completa)
```bash
docker-compose down -v
```

### Ver Logs de un Servicio Específico
```bash
# Ver logs del backend
docker-compose logs api

# Ver logs del frontend
docker-compose logs frontend

# Ver logs de MongoDB
docker-compose logs mongo

# Ver logs en tiempo real (seguir)
docker-compose logs -f api
```

### Reiniciar un Servicio Específico
```bash
docker-compose restart api
docker-compose restart frontend
```

### Reconstruir Solo un Servicio
```bash
docker-compose up --build api
docker-compose up --build frontend
```

---

## 🖥️ Usando Docker Desktop (Interfaz Gráfica)

### Ver Contenedores
1. Abre Docker Desktop
2. Ve a la pestaña "Containers"
3. Verás tu proyecto "backclinica-main" con 3 contenedores:
   - `clinica-api` (Backend)
   - `clinica-frontend` (Frontend)
   - `mongo` (Base de datos)

### Ver Logs en Docker Desktop
1. Haz clic en el nombre del contenedor
2. Ve a la pestaña "Logs"
3. Verás los logs en tiempo real

### Detener/Iniciar Contenedores
1. Haz clic en el botón de pausa/play junto al contenedor
2. O haz clic derecho y selecciona "Stop" o "Start"

### Abrir Terminal en un Contenedor
1. Haz clic en el contenedor
2. Ve a la pestaña "Terminal" o "Exec"
3. Podrás ejecutar comandos dentro del contenedor

---

## 🔧 Configuración Actual de Docker

### docker-compose.yml
Tu proyecto tiene 3 servicios configurados:

```yaml
services:
  frontend:
    - Puerto: 3000
    - Tecnología: React + Nginx
    
  api:
    - Puerto: 2030
    - Tecnología: NestJS
    - Depende de: MongoDB
    
  mongo:
    - Puerto: 27017
    - Base de datos MongoDB
    - Datos persistentes en volumen
```

---

## ⚠️ Solución de Problemas Comunes

### Error: "Docker daemon is not running"
**Solución:** Inicia Docker Desktop desde el menú de inicio

### Error: "Port already in use"
**Solución:** 
```bash
# Detén los servicios locales que usan esos puertos
# O cambia los puertos en docker-compose.yml
```

### Error: "Cannot connect to MongoDB"
**Solución:**
```bash
# Espera unos segundos más, MongoDB tarda en iniciar
# O verifica los logs:
docker-compose logs mongo
```

### Los cambios en el código no se reflejan
**Solución:**
```bash
# Reconstruye las imágenes:
docker-compose up --build
```

### Limpiar todo y empezar de nuevo
```bash
# Detener y eliminar todo
docker-compose down -v

# Eliminar imágenes antiguas
docker system prune -a

# Volver a construir
docker-compose up --build
```

---

## 📊 Monitoreo en Docker Desktop

### Ver Uso de Recursos
1. Ve a la pestaña "Containers"
2. Verás el uso de CPU y memoria de cada contenedor
3. Útil para detectar problemas de rendimiento

### Ver Volúmenes
1. Ve a la pestaña "Volumes"
2. Verás `mongo-data` (datos de MongoDB)
3. Puedes hacer backup o eliminar volúmenes desde aquí

### Ver Imágenes
1. Ve a la pestaña "Images"
2. Verás las imágenes construidas:
   - `backclinica-main-frontend`
   - `backclinica-main-api`
   - `mongo`

---

## 🎓 Flujo de Trabajo Recomendado

### Para Desarrollo Diario:

1. **Iniciar Docker Desktop** (si no está corriendo)

2. **Levantar el proyecto:**
   ```bash
   docker-compose up
   ```

3. **Trabajar en tu código** (los cambios se reflejan automáticamente en desarrollo)

4. **Ver logs si hay errores:**
   ```bash
   docker-compose logs -f
   ```

5. **Al terminar, detener:**
   ```bash
   docker-compose down
   ```

### Para Producción:

1. **Construir imágenes optimizadas:**
   ```bash
   docker-compose -f docker-compose.yml up --build -d
   ```

2. **Verificar que todo funciona:**
   ```bash
   docker-compose ps
   ```

3. **Monitorear logs:**
   ```bash
   docker-compose logs -f
   ```

---

## 🎯 Ventajas de Usar Docker

✅ **Consistencia:** Mismo entorno en desarrollo y producción
✅ **Aislamiento:** No afecta tu sistema local
✅ **Fácil de compartir:** Otros desarrolladores pueden levantar el proyecto fácilmente
✅ **Escalabilidad:** Fácil de escalar servicios
✅ **Limpieza:** Puedes eliminar todo sin dejar rastros

---

## 📝 Notas Importantes

1. **Primera vez:** La primera ejecución tarda más (descarga imágenes base)
2. **Volúmenes:** Los datos de MongoDB persisten entre reinicios
3. **Hot Reload:** En desarrollo, los cambios se reflejan automáticamente
4. **Puertos:** Asegúrate de que los puertos 3000, 2030 y 27017 estén libres

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:

1. Revisa los logs: `docker-compose logs`
2. Verifica que Docker Desktop esté corriendo
3. Asegúrate de estar en la carpeta correcta del proyecto
4. Intenta reconstruir: `docker-compose up --build`

---

## ✅ Checklist Rápido

Antes de levantar el proyecto con Docker:

- [ ] Docker Desktop instalado
- [ ] Docker Desktop corriendo (ícono en color)
- [ ] Terminal abierta en la carpeta del proyecto
- [ ] Puertos 3000, 2030 y 27017 libres
- [ ] Ejecutar: `docker-compose up --build`
- [ ] Esperar a que todo esté listo (2-5 minutos)
- [ ] Abrir http://localhost:3000

¡Listo! Tu aplicación está corriendo en Docker 🎉
