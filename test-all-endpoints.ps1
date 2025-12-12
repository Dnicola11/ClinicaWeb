# Script de prueba completa del sistema
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PRUEBA COMPLETA DEL SISTEMA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Variables globales
$baseUrl = "http://localhost:3000"
$adminToken = ""
$userToken = ""
$patientId = ""
$appointmentId = ""

# Función para hacer peticiones
function Invoke-ApiRequest {
    param(
        [string]$Method,
        [string]$Endpoint,
        [object]$Body = $null,
        [string]$Token = ""
    )
    
    $headers = @{
        "Content-Type" = "application/json"
    }
    
    if ($Token) {
        $headers["Authorization"] = "Bearer $Token"
    }
    
    try {
        if ($Body) {
            $jsonBody = $Body | ConvertTo-Json
            $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method $Method -Headers $headers -Body $jsonBody
        } else {
            $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method $Method -Headers $headers
        }
        return $response
    } catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# 1. LOGIN ADMIN
Write-Host "1. Probando Login Admin..." -ForegroundColor Yellow
$loginResponse = Invoke-ApiRequest -Method POST -Endpoint "/auth/login" -Body @{
    email = "admin@clinica.com"
    password = "admin123"
}

if ($loginResponse) {
    $adminToken = $loginResponse.access_token
    Write-Host "   Login exitoso!" -ForegroundColor Green
    Write-Host "   Usuario: $($loginResponse.user.name) ($($loginResponse.user.role))" -ForegroundColor White
} else {
    Write-Host "   Fallo en login" -ForegroundColor Red
    exit
}
Write-Host ""

# 2. CREAR USUARIO NORMAL
Write-Host "2. Creando Usuario Normal..." -ForegroundColor Yellow
$userResponse = Invoke-ApiRequest -Method POST -Endpoint "/auth/register" -Token $adminToken -Body @{
    email = "usuario@clinica.com"
    password = "user123"
    name = "Usuario Normal"
    role = "user"
}

if ($userResponse) {
    Write-Host "   Usuario creado: $($userResponse.name)" -ForegroundColor Green
} else {
    Write-Host "   Fallo al crear usuario" -ForegroundColor Red
}
Write-Host ""

# 3. LOGIN USUARIO NORMAL
Write-Host "3. Probando Login Usuario Normal..." -ForegroundColor Yellow
$userLoginResponse = Invoke-ApiRequest -Method POST -Endpoint "/auth/login" -Body @{
    email = "usuario@clinica.com"
    password = "user123"
}

if ($userLoginResponse) {
    $userToken = $userLoginResponse.access_token
    Write-Host "   Login exitoso!" -ForegroundColor Green
    Write-Host "   Usuario: $($userLoginResponse.user.name) ($($userLoginResponse.user.role))" -ForegroundColor White
} else {
    Write-Host "   Fallo en login" -ForegroundColor Red
}
Write-Host ""

# 4. CREAR PACIENTE
Write-Host "4. Creando Paciente..." -ForegroundColor Yellow
$patientResponse = Invoke-ApiRequest -Method POST -Endpoint "/patients" -Token $adminToken -Body @{
    name = "Juan Perez"
    age = 35
    gender = "Masculino"
    medicalHistory = "Sin antecedentes relevantes"
}

if ($patientResponse) {
    $patientId = $patientResponse._id
    Write-Host "   Paciente creado: $($patientResponse.name)" -ForegroundColor Green
    Write-Host "   ID: $patientId" -ForegroundColor White
} else {
    Write-Host "   Fallo al crear paciente" -ForegroundColor Red
}
Write-Host ""

# 5. LISTAR PACIENTES
Write-Host "5. Listando Pacientes..." -ForegroundColor Yellow
$patientsResponse = Invoke-ApiRequest -Method GET -Endpoint "/patients" -Token $adminToken

if ($patientsResponse) {
    Write-Host "   Total de pacientes: $($patientsResponse.Count)" -ForegroundColor Green
} else {
    Write-Host "   Fallo al listar pacientes" -ForegroundColor Red
}
Write-Host ""

# 6. CREAR CITA (Usuario Normal)
Write-Host "6. Creando Cita como Usuario Normal..." -ForegroundColor Yellow
$appointmentResponse = Invoke-ApiRequest -Method POST -Endpoint "/appointments" -Token $userToken -Body @{
    patientId = $patientId
    date = "2025-12-15"
    time = "10:00"
    reason = "Consulta general"
    doctor = "Dr. Garcia"
}

if ($appointmentResponse) {
    $appointmentId = $appointmentResponse._id
    Write-Host "   Cita creada exitosamente" -ForegroundColor Green
    Write-Host "   ID: $appointmentId" -ForegroundColor White
    Write-Host "   Fecha: $($appointmentResponse.date)" -ForegroundColor White
    Write-Host "   Hora: $($appointmentResponse.time)" -ForegroundColor White
} else {
    Write-Host "   Fallo al crear cita" -ForegroundColor Red
}
Write-Host ""

# 7. LISTAR CITAS (Usuario Normal - solo ve las suyas)
Write-Host "7. Listando Citas como Usuario Normal..." -ForegroundColor Yellow
$userAppointmentsResponse = Invoke-ApiRequest -Method GET -Endpoint "/appointments" -Token $userToken

if ($userAppointmentsResponse) {
    Write-Host "   Citas del usuario: $($userAppointmentsResponse.Count)" -ForegroundColor Green
} else {
    Write-Host "   Fallo al listar citas" -ForegroundColor Red
}
Write-Host ""

# 8. LISTAR CITAS (Admin - ve todas)
Write-Host "8. Listando Todas las Citas como Admin..." -ForegroundColor Yellow
$adminAppointmentsResponse = Invoke-ApiRequest -Method GET -Endpoint "/appointments" -Token $adminToken

if ($adminAppointmentsResponse) {
    Write-Host "   Total de citas en el sistema: $($adminAppointmentsResponse.Count)" -ForegroundColor Green
} else {
    Write-Host "   Fallo al listar citas" -ForegroundColor Red
}
Write-Host ""

# 9. VER PERFIL
Write-Host "9. Viendo Perfil de Usuario..." -ForegroundColor Yellow
$profileResponse = Invoke-ApiRequest -Method POST -Endpoint "/auth/profile" -Token $userToken

if ($profileResponse) {
    Write-Host "   Perfil obtenido:" -ForegroundColor Green
    Write-Host "   Nombre: $($profileResponse.name)" -ForegroundColor White
    Write-Host "   Email: $($profileResponse.email)" -ForegroundColor White
    Write-Host "   Rol: $($profileResponse.role)" -ForegroundColor White
} else {
    Write-Host "   Fallo al obtener perfil" -ForegroundColor Red
}
Write-Host ""

# 10. LISTAR USUARIOS (Solo Admin)
Write-Host "10. Listando Usuarios como Admin..." -ForegroundColor Yellow
$usersResponse = Invoke-ApiRequest -Method GET -Endpoint "/users" -Token $adminToken

if ($usersResponse) {
    Write-Host "   Total de usuarios: $($usersResponse.Count)" -ForegroundColor Green
    foreach ($user in $usersResponse) {
        Write-Host "   - $($user.name) ($($user.email)) - Rol: $($user.role)" -ForegroundColor White
    }
} else {
    Write-Host "   Fallo al listar usuarios" -ForegroundColor Red
}
Write-Host ""

# RESUMEN
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESUMEN DE PRUEBAS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Admin Token: $adminToken" -ForegroundColor Gray
Write-Host "User Token: $userToken" -ForegroundColor Gray
Write-Host "Patient ID: $patientId" -ForegroundColor Gray
Write-Host "Appointment ID: $appointmentId" -ForegroundColor Gray
Write-Host ""
Write-Host "Todas las pruebas completadas!" -ForegroundColor Green
