import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient'>('doctor');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored) as { role?: string };
        const isPatientRole = u.role === 'patient' || u.role === 'user';
        const matches =
          u.role === 'admin' || // el admin puede entrar aunque no haya botón dedicado
          (selectedRole === 'doctor' && u.role === 'doctor') ||
          (selectedRole === 'patient' && isPatientRole);
        if (!matches) throw new Error('Este usuario no pertenece al rol seleccionado');
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-6 py-10 text-slate-50">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl shadow-indigo-900/40 backdrop-blur">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-semibold">Clínica</p>
              <p className="text-sm text-slate-300">Gestión integral de citas médicas</p>
            </div>
          </div>

          <h1 className="mt-8 text-4xl font-bold leading-tight">Bienvenido de nuevo</h1>
          <p className="mt-2 text-slate-300">Accede al panel para gestionar o atender citas.</p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs uppercase tracking-wide text-slate-300">Citas</p>
              <p className="text-2xl font-semibold">Rápidas</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs uppercase tracking-wide text-slate-300">Pacientes</p>
              <p className="text-2xl font-semibold">Seguros</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs uppercase tracking-wide text-slate-300">Equipo</p>
              <p className="text-2xl font-semibold">Conectado</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-2xl shadow-indigo-900/20">
          <h2 className="text-2xl font-semibold text-slate-900">Inicia sesión</h2>
          <p className="text-sm text-slate-500 mt-1">Elige tu rol y usa tus credenciales.</p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Soy</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'doctor', label: 'Doctor' },
                  { value: 'patient', label: 'Paciente' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedRole(opt.value as any)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm font-semibold transition ${
                      selectedRole === opt.value
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg shadow-indigo-500/30 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Iniciando sesión...' : 'Ingresar'}
            </button>

            <div className="text-sm text-slate-500 text-center space-y-1">
              <p>Credenciales de prueba</p>
              <p className="font-mono text-xs text-slate-700">admin@clinica.com / admin123</p>
              <p className="font-mono text-xs text-slate-700">doctor@clinica.com / doctor123</p>
              <p className="font-mono text-xs text-slate-700">paciente@clinica.com / paciente123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
