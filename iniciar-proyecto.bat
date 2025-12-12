@echo off
echo ========================================
echo   SISTEMA DE CITAS MEDICAS - DOCKER
echo ========================================
echo.
echo Iniciando el proyecto...
echo.
echo PASO 1: Deteniendo contenedores anteriores...
docker-compose down 2>nul

echo.
echo PASO 2: Construyendo imagenes (esto puede tardar 2-3 minutos)...
docker-compose build --no-cache

echo.
echo PASO 3: Iniciando contenedores...
docker-compose up -d

echo.
echo ========================================
echo   PROYECTO INICIADO
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:2030
echo MongoDB:  mongodb://localhost:27017
echo.
echo Credenciales de prueba:
echo   Email: admin@clinica.com
echo   Password: admin123
echo.
echo Para ver los logs:
echo   docker-compose logs -f
echo.
echo Para detener:
echo   docker-compose down
echo.
echo ========================================
pause
