import { useState, useEffect, useContext } from 'react';
import api from '../services/Api'; // CORRIGIDO: era '../services/api' (minúsculo — falha em Linux)
import { AuthContext } from '../contexts/AuthContext';

const CATEGORIAS = [
  'TODAS', 'FICCAO', 'NAO_FICCAO', 'CIENCIAS', 'HISTORIA',
  'MATEMATICA', 'LITERATURA', 'TECNOLOGIA', 'ARTE', 'OUTROS'
];

const categoriaLabel = (c) => ({
  FICCAO: 'Ficção', NAO_FICCAO: 'Não-ficção', CIENCIAS: 'Ciências',
  HISTORIA: 'História', MATEMATICA: 'Matemática', LITERATURA: 'Literatura',
  TECNOLOGIA: 'Tecnologia', ARTE: 'Arte', OUTROS: 'Outros'
}[c] || c);

const categoriaColor = (c) => ({
  FICCAO: 'bg-purple-50 text-purple-700',
  NAO_FICCAO: 'bg-slate-50 text-slate-600',
  CIENCIAS: 'bg-teal-50 text-teal-700',
  HISTORIA: 'bg-amber-50 text-amber-700',
  MATEMATICA: 'bg-blue-50 text-blue-700',
  LITERATURA: 'bg-pink-50 text-pink-700',
  TECNOLOGIA: 'bg-indigo-50 text-indigo-700',
  ARTE: 'bg-rose-50 text-rose-700',
  OUTROS: 'bg-gray-50 text-gray-600',
}[c] || 'bg-gray-50 text-gray-600');

// ----- Modal de Livro (Adicionar / Editar) -----
function LivroModal({ livro, escolaId, onClose, onSaved }) {
  const isEdicao = !!livro;
  const [form, setForm] = useState({
    titulo: livro?.titulo || '',
    autor: livro?.autor || '',
    categoria: livro?.categoria || 'LITERATURA',
    urlConteudo: livro?.urlConteudo || '',
    escolaId: livro?.escolaId || escolaId || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEdicao) {
        await api.put(`/api/livros/${livro.id}`, form);
      } else {
        await api.post('/api/livros', form);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.erro || 'Erro ao salvar livro.');
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
            {isEdicao ? 'Editar Livro' : 'Adicionar Novo Livro'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
            <input name="titulo" value={form.titulo} onChange={handleChange} required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Título do livro" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Autor *</label>
            <input name="autor" value={form.autor} onChange={handleChange} required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome do autor" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categoria *</label>
            <select name="categoria" value={form.categoria} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {CATEGORIAS.filter(c => c !== 'TODAS').map(c => (
                <option key={c} value={c}>{categoriaLabel(c)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL do arquivo (PDF)</label>
            <input name="urlConteudo" value={form.urlConteudo} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..." type="url" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-gradient-to-r from-[#0066ff] to-[#6366f1] text-white rounded-xl font-bold hover:shadow-md transition-all disabled:opacity-60">
              {loading ? 'Salvando...' : isEdicao ? 'Salvar alterações' : 'Adicionar livro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----- Página principal -----
export default function CollectionManagement() {
  const { user } = useContext(AuthContext);
  const isSupervisor = user?.perfil === 'SUPERVISOR';

  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('TODAS');
  const [modalAberto, setModalAberto] = useState(false);
  const [livroEditando, setLivroEditando] = useState(null);
  const [deletando, setDeletando] = useState(null);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/livros');
      setLivros(response.data);
    } catch {
      setError('Não foi possível carregar o acervo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBooks(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este livro?')) return;
    setDeletando(id);
    try {
      await api.delete(`/api/livros/${id}`);
      setLivros(prev => prev.filter(l => l.id !== id));
    } catch {
      alert('Erro ao remover livro.');
    } finally {
      setDeletando(null);
    }
  };

  const livrosFiltrados = livros.filter(l => {
    const matchBusca = busca === '' ||
      l.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
      l.autor?.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaFiltro === 'TODAS' || l.categoria === categoriaFiltro;
    return matchBusca && matchCategoria;
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <span className="text-sm">Carregando acervo...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={loadBooks} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Tentar novamente</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Acervo Digital</h2>
          <p className="text-slate-500 text-sm mt-1">{livros.length} livro{livros.length !== 1 ? 's' : ''} disponível{livros.length !== 1 ? 'is' : ''}</p>
        </div>
        {isSupervisor && (
          <button
            onClick={() => { setLivroEditando(null); setModalAberto(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0066ff] to-[#6366f1] text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Adicionar Livro
          </button>
        )}
      </div>

      {/* Barra de busca + filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por título ou autor..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-600"
        >
          {CATEGORIAS.map(c => (
            <option key={c} value={c}>{c === 'TODAS' ? 'Todas as categorias' : categoriaLabel(c)}</option>
          ))}
        </select>
      </div>

      {/* Grid de livros */}
      {livrosFiltrados.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p>{busca || categoriaFiltro !== 'TODAS' ? 'Nenhum livro encontrado para esse filtro.' : 'Nenhum livro no acervo ainda.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {livrosFiltrados.map((livro) => (
            <div key={livro.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              {/* Capa */}
              <div className="h-44 bg-gradient-to-br from-slate-50 to-slate-100 rounded-t-2xl flex flex-col items-center justify-center border-b border-slate-100 p-4">
                <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-slate-400 text-xs font-medium text-center leading-tight">{livro.titulo}</span>
              </div>

              {/* Conteúdo */}
              <div className="p-4 flex flex-col flex-1 gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">{livro.titulo}</h3>
                  <p className="text-slate-500 text-xs mt-1">{livro.autor}</p>
                </div>

                <span className={`text-[10px] w-fit font-bold px-2 py-1 rounded-full uppercase tracking-wide ${categoriaColor(livro.categoria)}`}>
                  {categoriaLabel(livro.categoria)}
                </span>

                {/* Botões */}
                <div className="flex gap-2 pt-1">
                  {livro.urlConteudo ? (
                    <button
                      onClick={() => window.open(livro.urlConteudo, '_blank')}
                      className="flex-1 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition-colors"
                    >
                      {isSupervisor ? 'Visualizar' : 'Ler Agora'}
                    </button>
                  ) : (
                    <button disabled
                      className="flex-1 py-2 bg-slate-100 text-slate-400 rounded-lg text-xs font-semibold cursor-not-allowed">
                      Indisponível
                    </button>
                  )}

                  {isSupervisor && (
                    <>
                      <button
                        onClick={() => { setLivroEditando(livro); setModalAberto(true); }}
                        className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(livro.id)}
                        disabled={deletando === livro.id}
                        className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-40"
                        title="Remover"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalAberto && (
        <LivroModal
          livro={livroEditando}
          escolaId={user?.escolaId}
          onClose={() => { setModalAberto(false); setLivroEditando(null); }}
          onSaved={loadBooks}
        />
      )}
    </div>
  );
}
