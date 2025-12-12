// src/appointments/appointment.schema.ts

import { Schema, Document } from 'mongoose';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export const AppointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    patientInfo: {
      type: Schema.Types.ObjectId,
      ref: 'Patients',
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
    },
    doctor: {
      type: String,
      required: false,
      trim: true,
    },
    notes: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Interfaz para el tipo Appointment
export interface Appointment extends Document {
  patient: string;
  patientInfo?: string;
  date: Date;
  time: string;
  reason: string;
  status: AppointmentStatus;
  doctor?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
