// src/patients/patient.schema.ts

import { Schema, Document } from 'mongoose'; // Importamos los tipos de Mongoose

export const PatientsSchema = new Schema({
  name: { type: String, required: true }, // El nombre del paciente
  age: { type: Number, required: true }, // La edad del paciente
  gender: { type: String, required: true }, // El género del paciente
  medicalHistory: { type: String, required: true }, // El historial médico del paciente
});

// Interfaz para el tipo Patient
export interface Patient extends Document {
  name: string;
  age: number;
  gender: string;
  medicalHistory: string;
}
