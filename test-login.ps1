Write-Host "Probando Login del Administrador..." -ForegroundColor Cyan
Write-Host ""

$loginBody = @{
    email = "admin@clinica.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "Login exitoso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usuario:" -ForegroundColor Yellow
    Write-Host "   Email: $($response.user.email)" -ForegroundColor White
    Write-Host "   Nombre: $($response.user.name)" -ForegroundColor White
    Write-Host "   Rol: $($response.user.role)" -ForegroundColor White
    Write-Host ""
    Write-Host "Token JWT:" -ForegroundColor Yellow
    Write-Host "   $($response.access_token)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Guarda este token para hacer peticiones autenticadas" -ForegroundColor Cyan
} catch {
    Write-Host "Error en el login:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
