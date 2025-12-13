import api from './api';
import type {
  Appointment,
  CreateAppointmentData,
  UpdateAppointmentData,
} from '../types';

export const appointmentService = {
  getAll: async (params?: { userId?: string; role?: string; doctorName?: string }): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>('/appointments', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Appointment> => {
    const response = await api.get<Appointment>(`/appointments/${id}`);
    return response.data;
  },

  getByDate: async (date: string, params?: { userId?: string; role?: string; doctorName?: string }): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>('/appointments/by-date', {
      params: { date, ...params },
    });
    return response.data;
  },

  create: async (data: CreateAppointmentData): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments', data);
    return response.data;
  },

  update: async (id: string, data: UpdateAppointmentData): Promise<Appointment> => {
    const response = await api.put<Appointment>(`/appointments/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },
};
