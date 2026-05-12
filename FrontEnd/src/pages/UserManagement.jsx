import { useState, useEffect } from 'react';
import api from '../services/Api';

// ----- Modal de Aluno -----
function AlunoModal({ aluno, onClose, onSaved }) {
  const isEdicao = !!aluno;
  const [form, setForm] = useState({
    nome: aluno?.nome || '',
    email: aluno?.email || '',
    senha: '',
    matricula: aluno?.matricula || '',
    escolaId: aluno?.escolaId || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { ...form };
      if (isEdicao && !payload.senha) delete payload.senha; // não envia senha vazia em edição
      if (isEdicao) {
        await api.put(`/api/alunos/${aluno.id}`, payload);
      } else {
        await api.post('/api/alunos', payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.erro || 'Erro ao salvar aluno.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">
            {isEdicao ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo *</label>
              <input name="nome" value={form.nome} onChange={handleChange} required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Nome do aluno" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
              <input name="email" value={form.email} onChange={handleChange} required type="email"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="aluno@escola.edu.br" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {isEdicao ? 'Nova senha (opcional)' : 'Senha *'}
              </label>
              <input name="senha" value={form.senha} onChange={handleChange}
                required={!isEdicao} type="password"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder={isEdicao ? 'Deixe vazio para manter' : '••••••••'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Matrícula *</label>
              <input name="matricula" value={form.matricula} onChange={handleChange} required
                disabled={isEdicao}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-60"
                placeholder="2024001" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-gradient-to-r from-[#0066ff] to-[#6366f1] text-white rounded-xl font-bold hover:shadow-md transition-all disabled:opacity-60">
              {loading ? 'Salvando...' : isEdicao ? 'Salvar alterações' : 'Cadastrar aluno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----- Página principal -----
export default function UserManagement() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroPerfi, setFiltroPerfil] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState(null);
  const [deletando, setDeletando] = useState(null);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const url = filtroPerfi ? `/api/usuarios?perfil=${filtroPerfi}` : '/api/usuarios';
      const res = await api.get(url);
      setUsuarios(res.data);
    } catch {
      setError('Não foi possível carregar os usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsuarios(); }, [filtroPerfi]);

  const handleDelete = async (aluno) => {
    if (!window.confirm(`Remover o aluno "${aluno.nome}"? Esta ação é irreversível.`)) return;
    setDeletando(aluno.id);
    try {
      await api.delete(`/api/alunos/${aluno.id}`);
      setUsuarios(prev => prev.filter(u => u.id !== aluno.id));
    } catch {
      alert('Erro ao remover aluno.');
    } finally {
      setDeletando(null);
    }
  };

  const usuariosFiltrados = usuarios.filter(u =>
    busca === '' ||
    u.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    u.email?.toLowerCase().includes(busca.toLowerCase())
  );

  const perfilBadge = (p) => ({
    ALUNO: 'bg-blue-50 text-blue-700',
    SUPERVISOR: 'bg-purple-50 text-purple-700',
    ADMINISTRADOR: 'bg-amber-50 text-amber-700',
  }[p] || 'bg-slate-50 text-slate-600');

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestão de Usuários</h2>
          <p className="text-slate-500 text-sm mt-1">{usuariosFiltrados.length} usuário{usuariosFiltrados.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { setAlunoEditando(null); setModalAberto(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0066ff] to-[#6366f1] text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Novo Aluno
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filtroPerfi}
          onChange={e => setFiltroPerfil(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os perfis</option>
          <option value="ALUNO">Aluno</option>
          <option value="SUPERVISOR">Supervisor</option>
          <option value="ADMINISTRADOR">Administrador</option>
        </select>
      </div>

      {/* Tabela */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Carregando usuários...</div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-3">{error}</p>
          <button onClick={loadUsuarios} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Tentar novamente</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {usuariosFiltrados.length === 0 ? (
            <div className="text-center py-12 text-slate-400">Nenhum usuário encontrado.</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Usuário</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">E-mail</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Perfil</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {usuariosFiltrados.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {user.nome?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-800 text-sm">{user.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${perfilBadge(user.perfil)}`}>
                        {user.perfil}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.perfil === 'ALUNO' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setAlunoEditando(user); setModalAberto(true); }}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            disabled={deletando === user.id}
                            className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                          >
                            {deletando === user.id ? '...' : 'Remover'}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {modalAberto && (
        <AlunoModal
          aluno={alunoEditando}
          onClose={() => { setModalAberto(false); setAlunoEditando(null); }}
          onSaved={loadUsuarios}
        />
      )}
    </div>
  );
}
