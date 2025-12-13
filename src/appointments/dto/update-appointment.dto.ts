export class UpdateAppointmentDto {
  date?: Date;
  time?: string;
  reason?: string;
  doctor?: string;
  specialty?: string;
  patientName?: string;
  status?: string;
  postponedDate?: Date;
  postponedTime?: string;
  postponeReason?: string;
  notes?: string;
}
