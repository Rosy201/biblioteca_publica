import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { signed, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-extrabold bg-gradient-to-r from-[#0066ff] to-[#6366f1] bg-clip-text text-transparent tracking-tight"
      >
        BiblioTech
      </Link>

      <nav className="flex items-center gap-6 text-slate-600 font-medium text-sm">
        <Link to="/" className="hover:text-[#0066ff] transition-colors">Início</Link>

        {signed && (
          <>
            <Link to="/acervo" className="hover:text-[#0066ff] transition-colors">Acervo</Link>
            {user?.perfil === 'SUPERVISOR' && (
              <Link to="/usuarios" className="hover:text-[#0066ff] transition-colors">Usuários</Link>
            )}
          </>
        )}

        {signed ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0066ff] to-[#6366f1] flex items-center justify-center text-white text-xs font-bold">
                {user?.nome?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-sm text-slate-600">{user?.nome}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full uppercase">
                {user?.perfil}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2 bg-gradient-to-r from-[#0066ff] to-[#6366f1] text-white rounded-full text-sm font-bold shadow-sm hover:shadow-md hover:scale-[1.03] transition-all"
          >
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}
