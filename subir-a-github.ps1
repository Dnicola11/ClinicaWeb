# Script para subir el proyecto a GitHub
# Ejecutar en PowerShell: .\subir-a-github.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUBIR PROYECTO A GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está instalado
Write-Host "Verificando Git..." -ForegroundColor Yellow
$gitVersion = git --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Git no está instalado." -ForegroundColor Red
    Write-Host "Descarga Git desde: https://git-scm.com/" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Git instalado: $gitVersion" -ForegroundColor Green
Write-Host ""

# Solicitar nombre de usuario de GitHub
Write-Host "Ingresa tu nombre de usuario de GitHub:" -ForegroundColor Yellow
$githubUser = Read-Host

# Solicitar nombre del repositorio
Write-Host "Ingresa el nombre del repositorio (por defecto: backclinica):" -ForegroundColor Yellow
$repoName = Read-Host
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "backclinica"
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuración:" -ForegroundColor Cyan
Write-Host "  Usuario: $githubUser" -ForegroundColor White
Write-Host "  Repositorio: $repoName" -ForegroundColor White
Write-Host "  URL: https://github.com/$githubUser/$repoName" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "¿Continuar? (S/N):" -ForegroundColor Yellow
$confirm = Read-Host
if ($confirm -ne "S" -and $confirm -ne "s") {
    Write-Host "Operación cancelada." -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "Paso 1: Inicializando repositorio Git..." -ForegroundColor Yellow
git init
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR al inicializar Git" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Repositorio inicializado" -ForegroundColor Green

Write-Host ""
Write-Host "Paso 2: Agregando archivos..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR al agregar archivos" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Archivos agregados" -ForegroundColor Green

Write-Host ""
Write-Host "Paso 3: Creando commit inicial..." -ForegroundColor Yellow
git commit -m "Initial commit: Sistema de Citas Médicas - Backend API"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR al crear commit" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Commit creado" -ForegroundColor Green

Write-Host ""
Write-Host "Paso 4: Configurando rama principal..." -ForegroundColor Yellow
git branch -M main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR al configurar rama" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Rama 'main' configurada" -ForegroundColor Green

Write-Host ""
Write-Host "Paso 5: Agregando repositorio remoto..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$githubUser/$repoName.git"
git remote add origin $remoteUrl
if ($LASTEXITCODE -ne 0) {
    Write-Host "ADVERTENCIA: El remoto ya existe, actualizando..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
}
Write-Host "✓ Repositorio remoto configurado" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "IMPORTANTE:" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Antes de continuar, debes crear el repositorio en GitHub:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Ve a: https://github.com/new" -ForegroundColor White
Write-Host "2. Nombre del repositorio: $repoName" -ForegroundColor White
Write-Host "3. NO marques 'Initialize with README'" -ForegroundColor White
Write-Host "4. Haz clic en 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "¿Ya creaste el repositorio en GitHub? (S/N):" -ForegroundColor Yellow
$created = Read-Host

if ($created -ne "S" -and $created -ne "s") {
    Write-Host ""
    Write-Host "Cuando hayas creado el repositorio, ejecuta:" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
    exit 0
}

Write-Host ""
Write-Host "Paso 6: Subiendo archivos a GitHub..." -ForegroundColor Yellow
Write-Host "Se te pedirá autenticación..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ¡ÉXITO!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu proyecto ha sido subido a GitHub" -ForegroundColor Green
    Write-Host "URL: https://github.com/$githubUser/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Comandos útiles para el futuro:" -ForegroundColor Yellow
    Write-Host "  git add .                    # Agregar cambios" -ForegroundColor White
    Write-Host "  git commit -m 'mensaje'      # Guardar cambios" -ForegroundColor White
    Write-Host "  git push                     # Subir a GitHub" -ForegroundColor White
    Write-Host "  git pull                     # Descargar cambios" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ERROR AL SUBIR" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Posibles soluciones:" -ForegroundColor Yellow
    Write-Host "1. Verifica que creaste el repositorio en GitHub" -ForegroundColor White
    Write-Host "2. Verifica tu autenticación (usa token en lugar de contraseña)" -ForegroundColor White
    Write-Host "3. Intenta manualmente: git push -u origin main" -ForegroundColor White
    Write-Host ""
    Write-Host "Para crear un token de acceso:" -ForegroundColor Yellow
    Write-Host "https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host ""
}
