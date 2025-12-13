import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition ${
      isActive ? 'bg-white/15 text-white shadow-sm shadow-indigo-500/30' : 'text-slate-200 hover:text-white hover:bg-white/10'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-white/10 backdrop-blur bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <div className="w-11 h-11 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">Clínica</p>
                <p className="text-xs text-slate-300">Gestión de citas médicas</p>
              </div>
              <div className="hidden sm:flex sm:items-center sm:space-x-1 ml-6">
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/appointments" className={navLinkClass}>
                  Citas
                </NavLink>
                {isAdmin && (
                  <>
                    <NavLink to="/patients" className={navLinkClass}>
                      Pacientes
                    </NavLink>
                    <NavLink to="/users" className={navLinkClass}>
                      Usuarios
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-slate-300 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-rose-500 to-red-600 shadow-lg shadow-red-500/30 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 focus:ring-offset-slate-900"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-indigo-900/30 backdrop-blur p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
