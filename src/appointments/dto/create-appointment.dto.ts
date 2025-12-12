// src/appointments/dto/create-appointment.dto.ts

export class CreateAppointmentDto {
  patientInfo?: string; // ID del paciente (opcional, referencia a Patients)
  date: Date;
  time: string;
  reason: string;
  doctor?: string;
  notes?: string;
}
