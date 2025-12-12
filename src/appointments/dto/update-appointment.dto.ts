// src/appointments/dto/update-appointment.dto.ts

import { AppointmentStatus } from '../appointment.schema';

export class UpdateAppointmentDto {
  date?: Date;
  time?: string;
  reason?: string;
  status?: AppointmentStatus;
  doctor?: string;
  notes?: string;
}
