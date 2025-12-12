// src/patients/patients.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from './patients.schema';  // Actualizamos el nombre de la interfaz

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel('Patients') private readonly patientModel: Model<Patient>,  // Usamos 'Patient' aquí
  ) {}

  // Crear un nuevo paciente
  async create(patientData: Patient): Promise<Patient> {
    const patient = new this.patientModel(patientData);
    return patient.save();
  }

  // Obtener todos los pacientes
  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }

  // Obtener un paciente por ID
  async findById(id: string): Promise<Patient> {
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
    return patient;
  }

  // Actualizar un paciente
  async update(id: string, patientData: Partial<Patient>): Promise<Patient> {
    const patient = await this.patientModel.findByIdAndUpdate(id, patientData, { new: true });
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
    return patient;
  }

  // Eliminar un paciente
  async delete(id: string): Promise<void> {
    const result = await this.patientModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
  }
}
