import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS con configuración específica
  app.enableCors({
    origin: ['http://localhost:3000', 'http://frontend:80'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = process.env.PORT ?? 2030;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
  console.log(`📚 API Docs: http://localhost:${port}/auth/login`);
}
bootstrap();
