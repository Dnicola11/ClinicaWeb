# 📤 Guía para Subir el Proyecto a GitHub

Esta guía te explicará paso a paso cómo subir tu proyecto de Backend de Clínica a GitHub.

## 📋 Requisitos Previos

1. **Tener Git instalado** en tu computadora
   - Verifica con: `git --version`
   - Si no lo tienes, descárgalo de: https://git-scm.com/

2. **Tener una cuenta de GitHub**
   - Si no tienes, créala en: https://github.com/

3. **Tener GitHub CLI (opcional pero recomendado)**
   - Descarga de: https://cli.github.com/

## 🚀 Método 1: Usando GitHub CLI (Recomendado)

### Paso 1: Verificar que estás en el directorio correcto
```bash
cd "c:/Users/David Nicola/Desktop/IDAT 2 Parte/Curso Jueves/backclinica-main"
```

### Paso 2: Inicializar Git (si no está inicializado)
```bash
git init
```

### Paso 3: Agregar todos los archivos al staging
```bash
git add .
```

### Paso 4: Hacer el primer commit
```bash
git commit -m "Initial commit: Sistema de Citas Médicas - Backend API"
```

### Paso 5: Crear el repositorio en GitHub y subirlo
```bash
gh repo create backclinica --public --source=. --remote=origin --push
```

O si prefieres que sea privado:
```bash
gh repo create backclinica --private --source=. --remote=origin --push
```

¡Listo! Tu proyecto ya está en GitHub.

---

## 🌐 Método 2: Usando GitHub Web (Manual)

### Paso 1: Crear el repositorio en GitHub

1. Ve a https://github.com/
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Completa los datos:
   - **Repository name:** `backclinica` (o el nombre que prefieras)
   - **Description:** "Sistema de Citas Médicas - Backend API con NestJS y MongoDB"
   - **Visibilidad:** Público o Privado (según prefieras)
   - **NO marques** "Initialize this repository with a README" (ya tienes uno)
5. Haz clic en **"Create repository"**

### Paso 2: Configurar Git en tu proyecto

Abre la terminal en el directorio del proyecto y ejecuta:

```bash
# Navegar al directorio del proyecto
cd "c:/Users/David Nicola/Desktop/IDAT 2 Parte/Curso Jueves/backclinica-main"

# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Sistema de Citas Médicas - Backend API"

# Renombrar la rama a 'main' (si es necesario)
git branch -M main

# Agregar el repositorio remoto (reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/backclinica.git

# Subir los archivos a GitHub
git push -u origin main
```

### Paso 3: Autenticación

Si es la primera vez que usas Git con GitHub, te pedirá autenticación:

**Opción A: Token de Acceso Personal (Recomendado)**
1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Genera un nuevo token con permisos de `repo`
3. Copia el token
4. Úsalo como contraseña cuando Git te lo pida

**Opción B: GitHub CLI**
```bash
gh auth login
```

---

## 📝 Comandos Git Útiles para el Futuro

### Después de hacer cambios en tu código:

```bash
# Ver qué archivos han cambiado
git status

# Agregar archivos específicos
git add nombre-del-archivo.ts

# O agregar todos los cambios
git add .

# Hacer commit con un mensaje descriptivo
git commit -m "Descripción de los cambios realizados"

# Subir los cambios a GitHub
git push
```

### Otros comandos útiles:

```bash
# Ver el historial de commits
git log

# Ver las diferencias de los cambios
git diff

# Descargar cambios del repositorio remoto
git pull

# Ver las ramas
git branch

# Crear una nueva rama
git checkout -b nombre-de-la-rama

# Cambiar de rama
git checkout nombre-de-la-rama
```

---

## ⚠️ IMPORTANTE: Archivos Sensibles

### Antes de subir, verifica que el archivo `.env` NO se suba

Tu archivo `.gitignore` ya está configurado para ignorar el archivo `.env`, pero verifica:

```bash
# Ver si .env está en el .gitignore
cat .gitignore | grep .env
```

### Crear un archivo .env.example

Es buena práctica crear un archivo `.env.example` con las variables pero sin valores reales:

```env
# .env.example
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
JWT_SECRET=tu_clave_secreta_aqui
PORT=3000
```

Luego agrégalo al repositorio:
```bash
git add .env.example
git commit -m "Add .env.example file"
git push
```

---

## 🔧 Solución de Problemas Comunes

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/backclinica.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --rebase
git push -u origin main
```

### Error: "Permission denied"
- Verifica tu autenticación con GitHub
- Usa un token de acceso personal en lugar de contraseña

### Cambiar la URL del repositorio remoto
```bash
git remote set-url origin https://github.com/TU_USUARIO/nuevo-nombre.git
```

---

## 📚 Recursos Adicionales

- **Documentación de Git:** https://git-scm.com/doc
- **Guías de GitHub:** https://guides.github.com/
- **GitHub CLI:** https://cli.github.com/manual/

---

## ✅ Checklist Final

Antes de subir tu proyecto, verifica:

- [ ] El archivo `.env` NO está incluido (está en .gitignore)
- [ ] Has creado un `.env.example` con variables de ejemplo
- [ ] El README.md está actualizado
- [ ] Has probado que el proyecto funciona localmente
- [ ] Has hecho commit de todos los cambios importantes
- [ ] Has configurado correctamente el repositorio remoto

---

## 🎉 ¡Felicidades!

Una vez que hayas subido tu proyecto, podrás:
- Compartir el enlace con otros desarrolladores
- Colaborar con tu equipo
- Tener un respaldo en la nube
- Mostrar tu trabajo en tu portafolio

**URL de tu repositorio será:**
`https://github.com/TU_USUARIO/backclinica`
