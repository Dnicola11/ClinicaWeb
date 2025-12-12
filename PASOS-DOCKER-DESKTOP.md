# 📸 Guía Visual: Docker Desktop Paso a Paso

## 🎯 Objetivo
Levantar tu Sistema de Citas Médicas usando Docker Desktop

---

## 📋 Paso 1: Verificar Docker Desktop

### ¿Qué buscar?
1. Mira tu **barra de tareas** de Windows (abajo a la derecha)
2. Busca el ícono de la **ballena** 🐋

### Estados del ícono:
- **🐋 Gris/Blanco** = Docker NO está corriendo ❌
- **🐋 Azul/Color** = Docker SÍ está corriendo ✅

### Si está gris (NO corriendo):
1. Haz **clic derecho** en el ícono
2. Selecciona **"Start Docker Desktop"**
3. Espera 30-60 segundos
4. El ícono cambiará a color ✅

---

## 📋 Paso 2: Abrir Docker Desktop (Opcional)

### ¿Para qué?
Para ver visualmente lo que está pasando

### Cómo:
1. Haz **doble clic** en el ícono de Docker
2. Se abrirá la aplicación Docker Desktop
3. Verás varias pestañas:
   - **Containers** (Contenedores)
   - **Images** (Imágenes)
   - **Volumes** (Volúmenes)

### Lo que verás:
```
┌─────────────────────────────────────┐
│  Docker Desktop                      │
├─────────────────────────────────────┤
│  Containers  Images  Volumes  ...   │
├─────────────────────────────────────┤
│                                      │
│  (Aquí aparecerán tus contenedores) │
│                                      │
└─────────────────────────────────────┘
```

---

## 📋 Paso 3: Abrir Terminal en tu Proyecto

### Opción A: Desde el Explorador de Windows
1. Abre la carpeta del proyecto:
   ```
   C:\Users\David Nicola\Desktop\IDAT 2 Parte\Curso Jueves\backclinica-main
   ```
2. Haz **clic derecho** en un espacio vacío
3. Selecciona **"Abrir en Terminal"** o **"PowerShell aquí"**

### Opción B: Desde VSCode
1. Abre VSCode en la carpeta del proyecto
2. Presiona **Ctrl + Shift + `** (acento grave)
3. Se abrirá una terminal integrada

### Verificar que estás en la carpeta correcta:
```bash
# Ejecuta este comando:
dir

# Deberías ver estos archivos:
# - docker-compose.yml
# - start-docker.bat
# - package.json
# - frontend/
```

---

## 📋 Paso 4: Ejecutar el Comando Docker

### Opción A: Usando el Script (MÁS FÁCIL) ⭐
1. Haz **doble clic** en el archivo:
   ```
   start-docker.bat
   ```
2. Se abrirá una ventana negra (terminal)
3. Verás mensajes de progreso

### Opción B: Comando Manual
En la terminal, escribe:
```bash
docker-compose up --build
```

### ¿Qué verás?
```
Construyendo y levantando los servicios...
Esto puede tardar 2-5 minutos la primera vez

[+] Building 45.2s (23/23) FINISHED
[+] Running 3/3
 ✔ Container clinica-mongo     Started
 ✔ Container clinica-api        Started
 ✔ Container clinica-frontend   Started
```

---

## 📋 Paso 5: Esperar a que Todo Esté Listo

### Tiempo estimado:
- **Primera vez:** 3-5 minutos ⏳
- **Siguientes veces:** 30-60 segundos ⚡

### Mensajes que verás:

#### 1. MongoDB iniciando:
```
mongo       | MongoDB starting...
mongo       | Waiting for connections on port 27017
```

#### 2. Backend iniciando:
```
api         | [Nest] Starting Nest application...
api         | Nest application successfully started
api         | 🚀 Servidor corriendo en: http://localhost:2030
```

#### 3. Frontend iniciando:
```
frontend    | Server running at http://localhost:3000
```

### ✅ Cuando veas estos 3 mensajes, ¡está listo!

---

## 📋 Paso 6: Ver en Docker Desktop

### Si abriste Docker Desktop:
1. Ve a la pestaña **"Containers"**
2. Verás un grupo llamado **"backclinica-main"**
3. Dentro verás 3 contenedores:

```
backclinica-main
├─ 🟢 clinica-frontend (Running)
├─ 🟢 clinica-api (Running)
└─ 🟢 clinica-mongo (Running)
```

### Para ver logs:
1. Haz **clic** en cualquier contenedor
2. Ve a la pestaña **"Logs"**
3. Verás los mensajes en tiempo real

---

## 📋 Paso 7: Acceder a la Aplicación

### Abre tu navegador:
1. Chrome, Firefox, Edge, etc.
2. Ve a: **http://localhost:3000**

### Deberías ver:
```
┌─────────────────────────────────────┐
│  🏥 Sistema de Citas Médicas        │
├─────────────────────────────────────┤
│                                      │
│  📧 Email:    [____________]        │
│  🔒 Password: [____________]        │
│                                      │
│         [ Iniciar Sesión ]          │
│                                      │
└─────────────────────────────────────┘
```

### Credenciales de prueba:
```
Email:    admin@clinica.com
Password: admin123
```

---

## 📋 Paso 8: Probar la Aplicación

### Después de hacer login:
1. Verás el **Dashboard** con estadísticas
2. Menú lateral con opciones:
   - 📊 Dashboard
   - 📅 Citas
   - 👥 Pacientes (solo Admin)
   - 👤 Usuarios (solo Admin)

### Prueba crear una cita:
1. Ve a **"Citas"**
2. Haz clic en **"Nueva Cita"**
3. Llena el formulario
4. Guarda

---

## 📋 Paso 9: Detener el Proyecto

### Cuando termines de trabajar:

#### Opción A: Desde la Terminal
1. En la terminal donde está corriendo Docker
2. Presiona **Ctrl + C**
3. Espera a que se detengan los contenedores
4. Ejecuta (opcional):
   ```bash
   docker-compose down
   ```

#### Opción B: Desde Docker Desktop
1. Ve a **"Containers"**
2. Haz clic en el botón **⏸️ Stop** junto a "backclinica-main"
3. Los 3 contenedores se detendrán

---

## 📋 Paso 10: Volver a Iniciar (Días Siguientes)

### Es MÁS RÁPIDO la segunda vez:

1. Asegúrate que Docker Desktop esté corriendo 🐋
2. Ejecuta:
   ```bash
   docker-compose up
   ```
   (Sin `--build` porque ya está construido)
3. Espera 30-60 segundos ⚡
4. Abre http://localhost:3000

---

## 🎯 Resumen Visual del Flujo

```
1. Docker Desktop corriendo 🐋
         ↓
2. Abrir terminal en proyecto 💻
         ↓
3. docker-compose up --build 🚀
         ↓
4. Esperar 3-5 minutos ⏳
         ↓
5. Ver contenedores en Docker Desktop 📊
         ↓
6. Abrir http://localhost:3000 🌐
         ↓
7. Login y usar la app ✨
         ↓
8. Ctrl+C para detener 🛑
```

---

## ⚠️ Solución de Problemas Visuales

### Problema: No veo el ícono de Docker
**Solución:**
1. Presiona **Windows + S**
2. Busca "Docker Desktop"
3. Ábrelo
4. Espera a que aparezca el ícono

### Problema: Error "port already in use"
**Solución:**
1. Abre Docker Desktop
2. Ve a "Containers"
3. Detén cualquier contenedor que esté usando los puertos
4. O cierra aplicaciones locales (backend/frontend local)

### Problema: Contenedores en rojo ❌
**Solución:**
1. Haz clic en el contenedor rojo
2. Ve a "Logs"
3. Lee el error
4. Común: MongoDB tardando en iniciar (espera 30 seg más)

---

## 📚 Archivos de Ayuda

- **DOCKER-INICIO-RAPIDO.md** - Comandos rápidos
- **GUIA-DOCKER-DESKTOP.md** - Guía completa
- **start-docker.bat** - Script automático

---

## ✅ Checklist Final

Antes de empezar, verifica:

- [ ] Docker Desktop instalado
- [ ] Ícono de Docker en color (corriendo)
- [ ] Terminal abierta en carpeta del proyecto
- [ ] Puertos 3000, 2030, 27017 libres
- [ ] Ejecutar: `docker-compose up --build`
- [ ] Esperar mensajes de éxito
- [ ] Abrir http://localhost:3000
- [ ] Login con admin@clinica.com

---

## 🎉 ¡Felicidades!

Si llegaste hasta aquí y todo funciona:
- ✅ Tu proyecto está corriendo en Docker
- ✅ Frontend, Backend y Base de datos funcionando
- ✅ Puedes desarrollar y probar tu aplicación
- ✅ Todo está aislado y organizado

**¡Disfruta tu Sistema de Citas Médicas!** 🏥
