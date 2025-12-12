@echo off
REM Script para crear el usuario administrador usando curl en Windows
REM Ejecutar después de que el servidor esté corriendo

echo.
echo Creando usuario administrador...
echo.

curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{\"email\":\"admin@clinica.com\",\"password\":\"admin123\",\"name\":\"Administrador\",\"role\":\"admin\"}"

echo.
echo.
echo Si ves un objeto JSON con el usuario, el admin fue creado exitosamente!
echo.
echo Email: admin@clinica.com
echo Password: admin123
echo.
echo IMPORTANTE: Despues de crear el admin, descomenta los guards en src/auth/auth.controller.ts
echo.
pause
