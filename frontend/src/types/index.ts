export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'doctor' | 'patient';
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  medicalHistory?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  _id: string;
  userId: string;
  patientId?: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  doctor: string;
  specialty?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'attended' | 'postponed';
  postponedDate?: string;
  postponedTime?: string;
  postponeReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user' | 'doctor' | 'patient';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface CreateAppointmentData {
  date: string;
  time: string;
  reason: string;
  doctor: string;
  specialty?: string;
  patientName: string;
  patientId?: string;
  userId?: string;
}

export interface UpdateAppointmentData {
  date?: string;
  time?: string;
  reason?: string;
  doctor?: string;
  specialty?: string;
  patientName?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'attended' | 'postponed';
  postponedDate?: string;
  postponedTime?: string;
  postponeReason?: string;
  notes?: string;
}

export interface CreatePatientData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  medicalHistory?: string;
}

export interface UpdatePatientData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  medicalHistory?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'doctor' | 'patient';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'admin' | 'user' | 'doctor' | 'patient';
}
