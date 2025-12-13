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

    const existingAdmin = await this.usersService.findByEmail(adminEmail);
    if (existingAdmin) {
      return;
    }

    await this.usersService.create({
      email: adminEmail,
      password: adminPassword,
      name: adminName,
      role: Role.ADMIN,
    });

    this.logger.log(`Usuario admin creado automáticamente: ${adminEmail}`);
  }
}
