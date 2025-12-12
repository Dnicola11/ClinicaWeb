// src/appointments/appointments.controller.ts

import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards,
  Request,
  Query
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('appointments')
// @UseGuards(JwtAuthGuard, RolesGuard) // Temporalmente deshabilitado
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // Crear una nueva cita (USER y ADMIN)
  @Post()
  // @Roles(Role.USER, Role.ADMIN) // Temporalmente deshabilitado
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto & { userId: string },
  ) {
    return this.appointmentsService.create(createAppointmentDto.userId, createAppointmentDto);
  }

  // Obtener todas las citas (ADMIN ve todas, USER solo las suyas)
  @Get()
  // @Roles(Role.USER, Role.ADMIN) // Temporalmente deshabilitado
  async findAll(@Query('userId') userId?: string, @Query('role') role?: string) {
    return this.appointmentsService.findAll(userId || '', role || 'admin');
  }

  // Obtener citas por fecha
  @Get('by-date')
  // @Roles(Role.USER, Role.ADMIN) // Temporalmente deshabilitado
  async findByDate(
    @Query('date') date: string,
    @Query('userId') userId?: string,
    @Query('role') role?: string,
  ) {
    const searchDate = new Date(date);
    return this.appointmentsService.findByDate(searchDate, userId || '', role || 'admin');
  }

  // Obtener una cita por ID
  @Get(':id')
  // @Roles(Role.USER, Role.ADMIN) // Temporalmente deshabilitado
  async findOne(
    @Param('id') id: string,
    @Query('userId') userId?: string,
    @Query('role') role?: string,
  ) {
    return this.appointmentsService.findById(id, userId || '', role || 'admin');
  }

  // Actualizar una cita (solo ADMIN)
  @Put(':id')
  // @Roles(Role.ADMIN) // Temporalmente deshabilitado
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  // Cancelar/Eliminar una cita (solo ADMIN)
  @Delete(':id')
  // @Roles(Role.ADMIN) // Temporalmente deshabilitado
  async delete(@Param('id') id: string) {
    await this.appointmentsService.delete(id);
    return { message: 'Cita eliminada exitosamente' };
  }
}
