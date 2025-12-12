// src/patients/patients.controller.ts

import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import type { Patient } from './patients.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('patients')
// @UseGuards(JwtAuthGuard, RolesGuard) // Temporalmente deshabilitado
// @Roles(Role.ADMIN) // Solo los administradores pueden acceder al CRUD de pacientes
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // Ruta para crear un paciente
  @Post()
  async create(@Body() patientData: Patient): Promise<Patient> {
    return this.patientsService.create(patientData);
  }

  // Ruta para obtener todos los pacientes
  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  // Ruta para obtener un paciente por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.findById(id);
  }

  // Ruta para actualizar un paciente por ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() patientData: Partial<Patient>,
  ): Promise<Patient> {
    return this.patientsService.update(id, patientData);
  }

  // Ruta para eliminar un paciente por ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.patientsService.delete(id);
  }
}
