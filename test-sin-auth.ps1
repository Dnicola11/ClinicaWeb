# Script de prueba para endpoints sin autenticación
# PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PRUEBA DE ENDPOINTS SIN AUTENTICACIÓN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"

# Test 1: Listar usuarios
Write-Host "1. Probando GET /users..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users" -Method Get
    Write-Host "   ✅ Éxito - Usuarios encontrados: $($response.Count)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Listar pacientes
Write-Host "2. Probando GET /patients..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/patients" -Method Get
    Write-Host "   ✅ Éxito - Pacientes encontrados: $($response.Count)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Listar citas
Write-Host "3. Probando GET /appointments..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/appointments" -Method Get
    Write-Host "   ✅ Éxito - Citas encontradas: $($response.Count)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Login (debe seguir funcionando)
Write-Host "4. Probando POST /auth/login..." -ForegroundColor Yellow
try {
    $loginData = @{
        email = "admin@clinica.com"
        password = "admin123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginData -ContentType "application/json"
    Write-Host "   ✅ Éxito - Token generado (pero no es necesario usarlo)" -ForegroundColor Green
    Write-Host "   Usuario: $($response.user.name) - Rol: $($response.user.role)" -ForegroundColor Cyan
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 5: Crear un paciente de prueba
Write-Host "5. Probando POST /patients (crear paciente)..." -ForegroundColor Yellow
try {
    $patientData = @{
        name = "Paciente de Prueba"
        age = 35
        gender = "Masculino"
        medicalHistory = "Prueba sin autenticación"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/patients" -Method Post -Body $patientData -ContentType "application/json"
    Write-Host "   ✅ Éxito - Paciente creado con ID: $($response._id)" -ForegroundColor Green
    $patientId = $response._id
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 6: Crear una cita de prueba (si se creó el paciente)
if ($patientId) {
    Write-Host "6. Probando POST /appointments (crear cita)..." -ForegroundColor Yellow
    try {
        $appointmentData = @{
            userId = "693a5e89f37267b905ba3402"
            patientId = $patientId
            date = "2025-12-20"
            time = "14:00"
            reason = "Consulta de prueba sin autenticación"
            doctor = "Dr. Prueba"
            status = "pendiente"
        } | ConvertTo-Json

        $response = Invoke-RestMethod -Uri "$baseUrl/appointments" -Method Post -Body $appointmentData -ContentType "application/json"
        Write-Host "   ✅ Éxito - Cita creada con ID: $($response._id)" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ Error: $_" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PRUEBAS COMPLETADAS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Nota: Todos los endpoints están funcionando SIN autenticación" -ForegroundColor Yellow
Write-Host "⚠️  Recuerda que esto es solo para desarrollo/pruebas" -ForegroundColor Yellow
Write-Host ""
