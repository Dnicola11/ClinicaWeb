import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Role } from './common/enums/role.enum';

@Injectable()
export class AppInitializer implements OnModuleInit {
  private readonly logger = new Logger(AppInitializer.name);

  constructor(private readonly usersService: UsersService) {}

  async onModuleInit(): Promise<void> {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL ?? 'admin@clinica.com';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD ?? 'admin123';
    const adminName = process.env.DEFAULT_ADMIN_NAME ?? 'Administrador';

    const patientEmail = process.env.DEFAULT_PATIENT_EMAIL ?? 'paciente@clinica.com';
    const patientPassword = process.env.DEFAULT_PATIENT_PASSWORD ?? 'paciente123';
    const patientName = process.env.DEFAULT_PATIENT_NAME ?? 'Paciente Demo';

    const maybeCreate = async (email: string, password: string, name: string, role: Role) => {
      const existing = await this.usersService.findByEmail(email);
      if (existing) return;
      await this.usersService.create({ email, password, name, role });
      this.logger.log(`Usuario ${role} creado automáticamente: ${email}`);
    };

    await maybeCreate(adminEmail, adminPassword, adminName, Role.ADMIN);

    const defaultDoctors = [
      { email: 'carlos@clinica.com', password: 'doctor123', name: 'Carlos Mendoza' },
      { email: 'sofia@clinica.com', password: 'doctor123', name: 'Sofía Rivas' },
      { email: 'valentina@clinica.com', password: 'doctor123', name: 'Valentina Torres' },
      { email: 'alejandro@clinica.com', password: 'doctor123', name: 'Alejandro Ruiz' },
      { email: 'lucia@clinica.com', password: 'doctor123', name: 'Lucía Fernández' },
    ];
    for (const doc of defaultDoctors) {
      await maybeCreate(doc.email, doc.password, doc.name, Role.DOCTOR);
    }

    await maybeCreate(patientEmail, patientPassword, patientName, Role.PATIENT);
  }
}
