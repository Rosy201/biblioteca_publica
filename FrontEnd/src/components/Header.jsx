import { Link } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  return (
    <header className="flex justify-between items-center p-6 bg-white/10 backdrop-blur-md border-b border-white/20">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-[#0066ff] to-[#d4d764] bg-clip-text text-transparent">
        BiblioTech
      </Link>
      
      <nav className="flex items-center space-x-6 text-slate-600 font-medium">
        <Link to="/" className="hover:text-[#0066ff]">Início</Link>
        
        {/* Menu condicional */}
        {user && (
          <>
            <Link to="/acervo" className="hover:text-[#0066ff]">Acervo</Link>
            {user.perfil === 'SUPERVISOR' && (
              <Link to="/usuarios" className="hover:text-[#0066ff]">Usuários</Link>
            )}
          </>
        )}

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400">Olá, {user.nome}</span>
            <button onClick={onLogout} className="text-red-500 text-sm">Sair</button>
          </div>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-[#0066ff] text-white rounded-lg shadow-md hover:bg-[#0052cc]">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}