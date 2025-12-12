@echo off
echo ========================================
echo   Sistema de Citas Medicas - Docker
echo ========================================
echo.

REM Verificar si Docker esta corriendo
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Desktop no esta corriendo!
    echo.
    echo Por favor:
    echo 1. Abre Docker Desktop
    echo 2. Espera a que el icono de la ballena este en color
    echo 3. Vuelve a ejecutar este script
    echo.
    pause
    exit /b 1
)

echo [OK] Docker Desktop esta corriendo
echo.

echo Deteniendo contenedores anteriores (si existen)...
docker-compose down >nul 2>&1

echo.
echo Construyendo y levantando los servicios...
echo Esto puede tardar 2-5 minutos la primera vez
echo.

docker-compose up --build

REM Si el usuario presiona Ctrl+C, detener los contenedores
echo.
echo Deteniendo contenedores...
docker-compose down

echo.
echo Contenedores detenidos correctamente
pause
