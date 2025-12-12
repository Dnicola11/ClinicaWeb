@echo off
echo ========================================
echo Sistema de Citas Medicas - Full Stack
echo ========================================
echo.
echo Selecciona una opcion:
echo.
echo 1. Levantar con Docker (Recomendado)
echo 2. Desarrollo Local (Backend + Frontend)
echo 3. Solo Backend
echo 4. Solo Frontend
echo 5. Crear usuario Admin
echo 6. Detener Docker
echo 7. Salir
echo.
set /p option="Ingresa tu opcion (1-7): "

if "%option%"=="1" goto docker
if "%option%"=="2" goto local
if "%option%"=="3" goto backend
if "%option%"=="4" goto frontend
if "%option%"=="5" goto admin
if "%option%"=="6" goto stop
if "%option%"=="7" goto end

:docker
echo.
echo Levantando servicios con Docker...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:2030
echo.
docker-compose up --build
goto end

:local
echo.
echo Iniciando Backend y Frontend en modo desarrollo...
echo.
start cmd /k "npm run start:dev"
timeout /t 5
start cmd /k "cd frontend && npm run dev"
echo.
echo Backend: http://localhost:2030
echo Frontend: http://localhost:5173
echo.
goto end

:backend
echo.
echo Iniciando solo Backend...
npm run start:dev
goto end

:frontend
echo.
echo Iniciando solo Frontend...
cd frontend
npm run dev
goto end

:admin
echo.
echo Creando usuario administrador...
npm run create-admin
echo.
echo Credenciales:
echo Email: admin@clinica.com
echo Password: admin123
echo.
pause
goto end

:stop
echo.
echo Deteniendo servicios Docker...
docker-compose down
echo.
echo Servicios detenidos.
pause
goto end

:end
echo.
echo Gracias por usar el Sistema de Citas Medicas!
pause
