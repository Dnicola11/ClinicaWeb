import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import { patientService } from '../services/patientService';
import { userService } from '../services/userService';
import type { Appointment } from '../types';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalPatients: 0,
    totalUsers: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const appointmentsData = await appointmentService.getAll();
      setAppointments(appointmentsData.slice(0, 5)); // Últimas 5 citas

      const pending = appointmentsData.filter(apt => apt.status === 'pending').length;

      if (isAdmin) {
        const patients = await patientService.getAll();
        const users = await userService.getAll();
        setStats({
          totalAppointments: appointmentsData.length,
          totalPatients: patients.length,
          totalUsers: users.length,
          pendingAppointments: pending,
        });
      } else {
        setStats({
          totalAppointments: appointmentsData.length,
          totalPatients: 0,
          totalUsers: 0,
          pendingAppointments: pending,
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-300">Bienvenido, {user?.name}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/5 border border-white/10 overflow-hidden shadow-xl shadow-indigo-900/30 rounded-2xl p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-300">Total Citas</p>
              <p className="text-3xl font-semibold text-white">{stats.totalAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 overflow-hidden shadow-xl shadow-indigo-900/30 rounded-2xl p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-400/20 text-amber-200 flex items-center justify-center">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-300">Pendientes</p>
              <p className="text-3xl font-semibold text-white">{stats.pendingAppointments}</p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <>
            <div className="bg-white/5 border border-white/10 overflow-hidden shadow-xl shadow-indigo-900/30 rounded-2xl p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-400/20 text-emerald-200 flex items-center justify-center">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-300">Pacientes</p>
                  <p className="text-3xl font-semibold text-white">{stats.totalPatients}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 overflow-hidden shadow-xl shadow-indigo-900/30 rounded-2xl p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-400/20 text-purple-200 flex items-center justify-center">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-300">Usuarios</p>
                  <p className="text-3xl font-semibold text-white">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent Appointments */}
      <div className="mt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-white">Citas recientes</h2>
            <p className="text-sm text-slate-300">Últimas 5 citas registradas</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to="/appointments"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-transparent"
            >
              Ver todas
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-3 py-4 text-sm text-slate-300 text-center">
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
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
