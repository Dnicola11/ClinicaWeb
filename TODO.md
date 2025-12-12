# TODO - Correcciones Docker

## Pasos a Completar:

- [x] 1. Corregir docker-compose.yml
  - [x] Cambiar MONGO_URI a MONGODB_URI en el servicio API
  - [x] Actualizar VITE_API_URL del frontend para usar red interna de Docker

- [x] 2. Corregir src/main.ts
  - [x] Cambiar puerto por defecto de 3000 a 2030
  - [x] Mejorar configuración de CORS

- [x] 3. Corregir src/config/mongoose.config.ts
  - [x] Agregar soporte para ambas variables (MONGO_URI y MONGODB_URI)

- [ ] 4. Validación
  - [ ] Ejecutar docker-compose up --build
  - [ ] Verificar logs de contenedores
  - [ ] Probar conectividad entre servicios

## Estado: En Progreso
