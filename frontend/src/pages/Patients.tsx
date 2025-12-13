import { useEffect, useState } from 'react';
import { patientService } from '../services/patientService';
import type { Patient, CreatePatientData } from '../types';

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<CreatePatientData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    medicalHistory: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await patientService.getAll();
      setPatients(data);
    } catch (error) {
      console.error('Error loading patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await patientService.create(formData);
      setSuccess('Paciente creado exitosamente');
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        medicalHistory: '',
      });
      loadPatients();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el paciente');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este paciente?')) return;

    try {
      await patientService.delete(id);
      setSuccess('Paciente eliminado exitosamente');
      loadPatients();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar el paciente');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-white">Pacientes</h1>
          <p className="mt-2 text-sm text-slate-300">Gestiona todos los pacientes del sistema</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-transparent"
          >
            Nuevo Paciente
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-white/10 bg-white/5 shadow-xl shadow-indigo-900/30 md:rounded-2xl backdrop-blur">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Nombre</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Teléfono</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Dirección</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Nacimiento</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {patients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-3 py-4 text-sm text-slate-300 text-center">
                        No hay pacientes registrados
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient) => (
                      <tr key={patient._id} className="hover:bg-white/5 transition">
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-white">
                          {patient.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-200">
                          {patient.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-200">
                          {patient.phone}
                        </td>
                        <td className="px-3 py-4 text-sm text-slate-200">
                          {patient.address}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-200">
                          {new Date(patient.dateOfBirth).toLocaleDateString('es-ES')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-200">
                          <button
                            onClick={() => handleDelete(patient._id)}
                            className="text-rose-300 hover:text-rose-200 font-semibold"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/70 px-4 py-8 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">Nuevo Paciente</h3>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Nombre</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Dirección</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Historia Médica (Opcional)</label>
                    <textarea
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 sm:w-auto"
                >
                  Crear Paciente
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-slate-300 shadow-sm px-4 py-2 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 sm:mt-0 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
