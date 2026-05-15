import React, { useState } from 'react';
import { Search, BookOpen, Loader2, ExternalLink } from 'lucide-react';

export default function LandingPage() {
  const [busca, setBusca] = useState('');
  const [livros, setLivros] = useState([]); // Estado para armazenar os livros encontrados
  const [carregando, setCarregando] = useState(false);

  const handleBuscar = async () => {
    if (!busca.trim()) return;

    setCarregando(true);
    try {
      // Faz a chamada para o seu endpoint de importação
      const response = await fetch(`http://localhost:8080/api/livros/importar?titulo=${encodeURIComponent(busca)}`, {
        method: 'POST',
      });

      if (response.ok) {
        const novoLivro = await response.json();
        
        // Adicionamos o novo livro importado à nossa lista na tela
        // Usamos um Set ou verificação para não repetir o mesmo livro na lista visual
        setLivros(prev => [novoLivro, ...prev]);
        setBusca(''); 
      } else {
        alert("Livro não encontrado ou erro na importação.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o backend.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-sans">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full bg-yellow-100/40 blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[60%] rounded-full bg-blue-100/40 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-12 pt-20 pb-20">
        <div className="max-w-4xl text-left">
          
          <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-semibold mb-8">
            <span className="text-blue-400">✨</span> Explore o catálogo em tempo real
          </div>

          <h1 className="text-[56px] font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Sua biblioteca <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-yellow-500">infinita</span>
            <br /> começa aqui.
          </h1>

          {/* Barra de Busca */}
          <div className="relative max-w-xl group mb-16">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
              placeholder="Digite o título para buscar e importar..."
              className="w-full pl-14 pr-32 py-5 bg-white border border-slate-100 rounded-full shadow-2xl shadow-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
            <button 
              onClick={handleBuscar}
              disabled={carregando}
              className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-8 rounded-full font-bold text-sm shadow-md flex items-center gap-2"
            >
              {carregando ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buscar'}
            </button>
          </div>

          {/* Grid de Resultados (Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {livros.map((livro, index) => (
              <div 
                key={index} 
                className="bg-white/70 backdrop-blur-md border border-slate-100 p-5 rounded-3xl shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-all group"
              >
                <div className="h-40 w-full bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                   {/* Se o seu LivroResponse tiver a URL da imagem da capa, coloque aqui no src */}
                   <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                      <BookOpen size={48} />
                   </div>
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg line-clamp-1 mb-1">
                  {livro.titulo}
                </h3>
                <p className="text-slate-500 text-sm mb-4 font-medium">
                  {livro.autor}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    {livro.categoria || 'Geral'}
                  </span>
                  <a 
                    href={livro.urlConteudo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {livros.length === 0 && !carregando && (
            <p className="text-slate-400 italic text-sm">Pesquise um livro para começar a popular sua biblioteca.</p>
          )}
        </div>
      </main>
    </div>
  );
}