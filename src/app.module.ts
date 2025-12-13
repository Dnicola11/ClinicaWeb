import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { mongooseConfig } from './config/mongoose.config';
import { AppInitializer } from './app.initializer';

@Module({
  imports: [
    MongooseModule.forRoot(mongooseConfig.uri),
    AuthModule,
    UsersModule,
    PatientsModule,
    AppointmentsModule,
  ],
  providers: [AppInitializer],
})
export class AppModule {}
