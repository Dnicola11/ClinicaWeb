import api from './api';
import type {
  Patient,
  CreatePatientData,
  UpdatePatientData,
} from '../types';

export const patientService = {
  getAll: async (): Promise<Patient[]> => {
    const response = await api.get<Patient[]>('/patients');
    return response.data;
  },

  getById: async (id: string): Promise<Patient> => {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  create: async (data: CreatePatientData): Promise<Patient> => {
    const response = await api.post<Patient>('/patients', data);
    return response.data;
  },

  update: async (id: string, data: UpdatePatientData): Promise<Patient> => {
    const response = await api.put<Patient>(`/patients/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/patients/${id}`);
  },
};
