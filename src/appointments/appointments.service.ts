// src/appointments/appointments.service.ts

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel('Appointment') private readonly appointmentModel: Model<Appointment>,
  ) {}

  // Crear una nueva cita
  async create(userId: string, createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = new this.appointmentModel({
      ...createAppointmentDto,
      patient: userId, // El usuario autenticado es el paciente
    });
    return appointment.save();
  }

  // Obtener todas las citas (ADMIN ve todas, USER solo las suyas)
  async findAll(userId: string, userRole: string): Promise<Appointment[]> {
    if (userRole === Role.ADMIN) {
      // Admin ve todas las citas
      return this.appointmentModel
        .find()
        .populate('patient', 'name email')
        .populate('patientInfo', 'name age gender')
        .sort({ date: -1 })
        .exec();
    } else {
      // Usuario normal solo ve sus propias citas
      return this.appointmentModel
        .find({ patient: userId })
        .populate('patientInfo', 'name age gender')
        .sort({ date: -1 })
        .exec();
    }
  }

  // Obtener una cita por ID
  async findById(id: string, userId: string, userRole: string): Promise<Appointment> {
    const appointment = await this.appointmentModel
      .findById(id)
      .populate('patient', 'name email')
      .populate('patientInfo', 'name age gender')
      .exec();

    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }

    // Verificar que el usuario tenga permiso para ver esta cita
    if (userRole !== Role.ADMIN && appointment.patient.toString() !== userId) {
      throw new ForbiddenException('No tienes permiso para ver esta cita');
    }

    return appointment;
  }

  // Actualizar una cita (solo ADMIN)
  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .populate('patient', 'name email')
      .populate('patientInfo', 'name age gender');

    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }

    return appointment;
  }

  // Cancelar una cita (solo ADMIN)
  async delete(id: string): Promise<void> {
    const result = await this.appointmentModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
  }

  // Obtener citas por fecha
  async findByDate(date: Date, userId: string, userRole: string): Promise<Appointment[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const query: any = {
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    // Si no es admin, solo mostrar sus propias citas
    if (userRole !== Role.ADMIN) {
      query.patient = userId;
    }

    return this.appointmentModel
      .find(query)
      .populate('patient', 'name email')
      .populate('patientInfo', 'name age gender')
      .sort({ time: 1 })
      .exec();
  }
}
