// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { mongooseConfig } from './config/mongoose.config';

@Module({
  imports: [
    // Configuración de la conexión a MongoDB
    MongooseModule.forRoot(mongooseConfig.uri),
    // Módulos de la aplicación
    AuthModule,
    UsersModule,
    PatientsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
