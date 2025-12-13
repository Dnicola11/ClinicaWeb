import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import type { Appointment, CreateAppointmentData } from '../types';

export default function Appointments() {
  const { isAdmin, user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<CreateAppointmentData>({
    date: '',
    time: '',
    reason: '',
    doctor: '',
    specialty: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const doctors = useMemo(
    () => [
      { name: 'Carlos Mendoza', specialty: 'Cardiología' },
      { name: 'Sofía Rivas', specialty: 'Pediatría' },
      { name: 'Valentina Torres', specialty: 'Dermatología' },
      { name: 'Alejandro Ruiz', specialty: 'Traumatología' },
      { name: 'Lucía Fernández', specialty: 'Ginecología' },
    ],
    [],
  );

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentService.getAll();
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await appointmentService.create({
        ...formData,
        userId: user?._id || (user as any)?.id,
        doctor: formData.doctor
          ? `${formData.doctor} (${formData.specialty || 'General'})`
          : '',
      });
      setSuccess('Cita creada exitosamente');
      setShowModal(false);
      setFormData({ date: '', time: '', reason: '', doctor: '', specialty: '' });
      loadAppointments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la cita');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar esta cita?')) return;

    try {
      await appointmentService.delete(id);
      setSuccess('Cita eliminada exitosamente');
      loadAppointments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar la cita');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-400/20 text-amber-100';
      case 'confirmed':
        return 'bg-emerald-400/20 text-emerald-100';
      case 'cancelled':
        return 'bg-rose-400/20 text-rose-100';
      case 'completed':
        return 'bg-indigo-400/20 text-indigo-100';
      default:
        return 'bg-white/10 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'confirmed':
        return 'Confirmada';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Completada';
      default:
        return status;
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
          <h1 className="text-3xl font-bold text-white">Citas médicas</h1>
          <p className="mt-2 text-sm text-slate-300">Gestiona todas las citas médicas del sistema</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-transparent"
          >
            Nueva Cita
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
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Fecha</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Hora</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Doctor</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Motivo</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Estado</th>
                    {isAdmin && (
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Acciones</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={isAdmin ? 6 : 5} className="px-3 py-4 text-sm text-slate-300 text-center">
                        No hay citas registradas
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-white/5 transition">
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                          {new Date(appointment.date).toLocaleDateString('es-ES')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                          {appointment.time}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                          {appointment.doctor}
                        </td>
                        <td className="px-3 py-4 text-sm text-slate-200">
                          {appointment.reason}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-200">
                            <button
                              onClick={() => handleDelete(appointment._id)}
                              className="text-rose-300 hover:text-rose-200 font-semibold"
                            >
                              Eliminar
                            </button>
                          </td>
                        )}
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
                  <h3 className="text-xl font-semibold text-slate-900">Nueva Cita</h3>
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
                    <label className="block text-sm font-medium text-slate-700">Fecha</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Hora</label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Doctor</label>
                    <select
                      required
                      value={formData.doctor}
                      onChange={(e) => {
                        const selected = doctors.find((d) => d.name === e.target.value);
                        setFormData({
                          ...formData,
                          doctor: selected?.name || '',
                          specialty: selected?.specialty || '',
                        });
                      }}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white"
                    >
                      <option value="">Selecciona un doctor</option>
                      {doctors.map((doc) => (
                        <option key={doc.name} value={doc.name}>
                          {doc.name} — {doc.specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Especialidad</label>
                    <input
                      type="text"
                      value={formData.specialty}
                      readOnly
                      placeholder="Selecciona un doctor"
                      className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 text-slate-600 shadow-sm sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Motivo</label>
                    <textarea
                      required
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                      placeholder="Consulta general"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 sm:w-auto"
                >
                  Crear Cita
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
