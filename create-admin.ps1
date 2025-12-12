$body = @{
    email = "admin@clinica.com"
    password = "admin123"
    name = "Administrador"
    role = "admin"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/auth/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ Usuario administrador creado exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📧 Email: admin@clinica.com" -ForegroundColor Cyan
    Write-Host "🔑 Password: admin123" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Respuesta del servidor:" -ForegroundColor Yellow
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ Error al crear usuario:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
