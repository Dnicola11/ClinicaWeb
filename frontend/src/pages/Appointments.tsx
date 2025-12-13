import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import type { Appointment, CreateAppointmentData, UpdateAppointmentData } from '../types';

export default function Appointments() {
  const { isAdmin, isDoctor, isPatient, user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState<CreateAppointmentData>({
    date: '',
    time: '',
    reason: '',
    doctor: '',
    specialty: '',
    patientName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusModal, setStatusModal] = useState<{
    open: boolean;
    appointment?: Appointment;
    status?: Appointment['status'];
    postponedDate?: string;
    postponedTime?: string;
    postponeReason?: string;
  }>({ open: false });

  const handleOpenStatusModal = (appointment: Appointment) => {
    const defaultStatus =
      (!isAdmin && !isDoctor && isPatient) ? 'postponed' : appointment.status;

    setStatusModal({
      open: true,
      appointment,
      status: defaultStatus as Appointment['status'],
      postponedDate: appointment.postponedDate?.slice(0, 10) || appointment.date.slice(0, 10),
      postponedTime: appointment.postponedTime || appointment.time,
      postponeReason: appointment.postponeReason,
    });
  };

  const handleStatusSubmit = async () => {
    if (!statusModal.appointment || !statusModal.status) return;

    const payload: UpdateAppointmentData = {
      status: statusModal.status,
    };

    if (statusModal.status === 'postponed') {
      if (!statusModal.postponedDate || !statusModal.postponedTime) {
        setError('Define fecha y hora de postergación');
        return;
      }
      payload.postponedDate = `${statusModal.postponedDate}T12:00:00.000Z`;
      payload.postponedTime = statusModal.postponedTime;
      payload.postponeReason = statusModal.postponeReason;
    }

    try {
      await appointmentService.update(statusModal.appointment._id, payload);
      setSuccess('Cita actualizada');
      setStatusModal({ open: false });
      loadAppointments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar la cita');
    }
  };

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

  const canCreate = isAdmin || isPatient;
  const canDelete = isAdmin || isPatient;

  useEffect(() => {
    loadAppointments();
    if (user?.role === 'patient' || user?.role === 'user') {
      setFormData((prev) => ({ ...prev, patientName: user.name }));
    }
  }, [user]);

  const loadAppointments = async () => {
    try {
      const data = await appointmentService.getAll({
        userId: user?._id || (user as any)?.id,
        role: user?.role,
        doctorName: user?.role === 'doctor' ? user?.name : undefined,
      });
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
      if (editingAppointment) {
        const payload: UpdateAppointmentData = {
          date: formData.date ? `${formData.date}T12:00:00.000Z` : undefined,
          time: formData.time,
        };
        // Solo admin puede modificar todo; paciente/doctor mantienen campos originales
        if (isAdmin) {
          payload.reason = formData.reason;
          payload.doctor = formData.doctor ? `${formData.doctor} (${formData.specialty || 'General'})` : '';
          payload.specialty = formData.specialty;
          payload.patientName = formData.patientName;
        }
        await appointmentService.update(editingAppointment._id, payload);
        setSuccess('Cita actualizada');
      } else {
        await appointmentService.create({
          ...formData,
          userId: user?._id || (user as any)?.id,
          date: formData.date ? `${formData.date}T12:00:00.000Z` : '',
          doctor: formData.doctor
            ? `${formData.doctor} (${formData.specialty || 'General'})`
            : '',
        });
        setSuccess('Cita creada exitosamente');
      }
      setShowModal(false);
      setEditingAppointment(null);
      setFormData({ date: '', time: '', reason: '', doctor: '', specialty: '', patientName: user?.name || '' });
      loadAppointments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar la cita');
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
      case 'attended':
        return 'bg-emerald-500/20 text-emerald-100';
      case 'postponed':
        return 'bg-amber-500/20 text-amber-100';
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
      case 'attended':
        return 'Atendida';
      case 'postponed':
        return 'Postergada';
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
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex sm:space-x-3 sm:items-center">
          {canCreate && (
            <button
              onClick={() => {
                setEditingAppointment(null);
                setFormData({
                  date: '',
                  time: '',
                  reason: '',
                  doctor: '',
                  specialty: '',
                  patientName: user?.name || '',
                });
                setShowModal(true);
              }}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-transparent"
            >
              Nueva Cita
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => navigate('/users')}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-transparent"
            >
              Crear usuario
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Modal estado */}
      {statusModal.open && statusModal.appointment && (
        <div className="mt-8">
          <div className="bg-white/10 border border-white/15 rounded-2xl shadow-xl shadow-indigo-900/30 backdrop-blur p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Estado de la cita</h3>
              <button
                type="button"
                onClick={() => setStatusModal({ open: false })}
                className="text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-slate-300 mt-1">
              {statusModal.appointment.patientName} — {statusModal.appointment.doctor}
            </p>

            <div className="mt-4 space-y-4 text-slate-900 bg-white rounded-xl p-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Estado</label>
                <select
                  value={statusModal.status}
                  onChange={(e) => setStatusModal((prev) => ({ ...prev, status: e.target.value as Appointment['status'] }))}
                  className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white"
                >
                  {isAdmin && (
                    <>
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmada</option>
                      <option value="attended">Atendida</option>
                      <option value="postponed">Postergar</option>
                      <option value="cancelled">Cancelar</option>
                      <option value="completed">Completada</option>
                    </>
                  )}
                  {isDoctor && !isAdmin && (
                    <>
                      <option value="pending">Pendiente</option>
                      <option value="attended">Atendida</option>
                      <option value="postponed">Postergar</option>
                      <option value="cancelled">Cancelar</option>
                    </>
                  )}
                  {isPatient && !isAdmin && !isDoctor && (
                    <>
                      <option value="postponed">Postergar</option>
                      <option value="cancelled">Cancelar</option>
                    </>
                  )}
                </select>
              </div>

              {statusModal.status === 'postponed' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Nueva fecha</label>
                    <input
                      type="date"
                      value={statusModal.postponedDate || ''}
                      onChange={(e) => setStatusModal((prev) => ({ ...prev, postponedDate: e.target.value }))}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Nueva hora</label>
                    <input
                      type="time"
                      value={statusModal.postponedTime || ''}
                      onChange={(e) => setStatusModal((prev) => ({ ...prev, postponedTime: e.target.value }))}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Motivo</label>
                    <textarea
                      value={statusModal.postponeReason || ''}
                      onChange={(e) => setStatusModal((prev) => ({ ...prev, postponeReason: e.target.value }))}
                      rows={3}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                      placeholder="Describe la razón de la postergación"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 sm:flex sm:flex-row-reverse gap-3">
              <button
                type="button"
                onClick={handleStatusSubmit}
                className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 sm:w-auto"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setStatusModal({ open: false })}
                className="mt-3 w-full inline-flex justify-center rounded-lg border border-white/30 shadow-sm px-4 py-2 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </div>
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
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Paciente</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Doctor</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Especialidad</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Motivo</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Estado</th>
                    {(isAdmin || isDoctor || isPatient) && (
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
                          {appointment.patientName || '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                          {appointment.doctor}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-200">
                          {appointment.specialty || '-'}
                        </td>
                        <td className="px-3 py-4 text-sm text-slate-200">
                          {appointment.reason}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                          {appointment.status === 'postponed' && appointment.postponedDate && (
                            <div className="text-[11px] text-amber-200 mt-1">
                              Nueva: {new Date(appointment.postponedDate).toLocaleDateString('es-ES')} {appointment.postponedTime}
                            </div>
                          )}
                        </td>
                        {(isAdmin || isDoctor || isPatient) && (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-200 space-x-3">
                            {(isAdmin || isPatient) && (
                              <button
                                onClick={() => {
                                  setEditingAppointment(appointment);
                                  const [nameOnly, specialtyOnly] = appointment.doctor?.split(' (') || ['',''];
                                  setFormData({
                                    date: appointment.date.slice(0, 10),
                                    time: appointment.time,
                                    reason: appointment.reason,
                                    doctor: nameOnly.trim(),
                                    specialty: specialtyOnly ? specialtyOnly.replace(')', '') : appointment.specialty || '',
                                    patientName: appointment.patientName,
                                  });
                                  setShowModal(true);
                                }}
                                className="text-indigo-200 hover:text-white font-semibold"
                              >
                                Editar
                              </button>
                            )}
                            {(isAdmin || isDoctor) && (
                              <button
                                onClick={() => handleOpenStatusModal(appointment)}
                                className="text-cyan-200 hover:text-white font-semibold"
                              >
                                Estado
                              </button>
                            )}
                            {canDelete && (
                              <button
                                onClick={() => handleDelete(appointment._id)}
                                className="text-rose-300 hover:text-rose-200 font-semibold"
                              >
                                Eliminar
                              </button>
                            )}
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
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-slate-900/70 backdrop-blur px-4 pt-24 pb-10 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">{editingAppointment ? 'Editar Cita' : 'Nueva Cita'}</h3>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Nombre del paciente</label>
                    <input
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      disabled={isPatient && editingAppointment !== null}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                      placeholder="Nombre y apellido del paciente"
                    />
                  </div>
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
                      disabled={isPatient && editingAppointment !== null}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white disabled:bg-slate-100 disabled:text-slate-500"
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
                      disabled={isPatient && editingAppointment !== null}
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                      placeholder="Consulta general"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 sm:w-auto"
                  disabled={!canCreate}
                >
                  {editingAppointment ? 'Guardar cambios' : 'Crear Cita'}
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
