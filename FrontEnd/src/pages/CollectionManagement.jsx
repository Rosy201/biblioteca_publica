import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

export default function CollectionManagement() {
  const { user } = useContext(AuthContext);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        // Chamada ao seu LivroController.java (endpoint @GetMapping)
        const response = await api.get('/livros');
        setLivros(response.data);
      } catch (err) {
        setError("Não foi possível carregar o acervo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  const handleReadBook = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert("Este livro ainda não possui um arquivo digital disponível.");
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-600">Carregando acervo...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Acervo Digital</h2>
        
        {user?.perfil === 'SUPERVISOR' && (
          <button className="px-6 py-2 bg-gradient-to-r from-[#0066ff] via-[#3b82f6] to-[#d4d764] text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all">
            Adicionar Novo Livro
          </button>
        )}
      </div>

      {livros.length === 0 ? (
        <p className="text-slate-500">Nenhum livro encontrado no banco de dados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {livros.map((livro) => (
            <div key={livro.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="h-48 bg-slate-50 rounded-lg mb-4 flex items-center justify-center border border-slate-100 overflow-hidden">
                  {/* Se tiver URL de capa no banco, use aqui. Se não, use um placeholder */}
                  <span className="text-slate-300 font-bold italic text-center px-4">{livro.titulo}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight">{livro.titulo}</h3>
                <p className="text-slate-500 text-sm mb-4">{livro.autor}</p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] w-fit font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded uppercase tracking-wider">
                  {livro.categoria}
                </span>
                
                <button 
                  onClick={() => handleReadBook(livro.urlArquivo)}
                  className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 transition-colors"
                >
                  {user?.perfil === 'SUPERVISOR' ? 'Gerenciar Arquivo' : 'Ler Agora'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}