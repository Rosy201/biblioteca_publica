import React, { useState } from 'react';
import axios from 'axios';

export default function LandingPage() {
  const [busca, setBusca] = useState("");
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Função que chama o seu Backend (que por sua vez chama o Google)
  const handleBuscar = async () => {
    if (!busca) return;
    setCarregando(true);
    try {
      // Usando o endpoint de busca que você criou no back
      const response = await axios.get(`http://localhost:8080/api/google-books/titulo?nome=${busca}`);
      setLivros(response.data.items || []);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  // Função para salvar o livro no seu banco de dados
  const handleImportar = async (titulo) => {
    try {
      await axios.post(`http://localhost:8080/api/livros/importar?titulo=${titulo}`);
      alert("Livro adicionado à sua biblioteca!");
    } catch (erro) {
      alert("Erro ao salvar o livro.");
    }
  };

  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-8 w-full pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-100/60 text-[#0066ff] px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="text-[#0066ff]">✨</span>
            <span>Explore o catálogo · entre para ler</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-[#1e293b] leading-[1.1] mb-6 tracking-tight">
            Sua biblioteca <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] via-[#4facfe] to-[#eab308]">infinita</span>
            <br /> começa aqui.
          </h1>

          <p className="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
            Explore milhões de títulos, descubra novos autores e mergulhe em histórias que transformam.
          </p>

          {/* Barra de Busca */}
          <div className="flex items-center bg-white p-2 rounded-full shadow-lg max-w-2xl transition-all focus-within:ring-2 focus-within:ring-blue-200">
            <div className="flex-1 flex items-center pl-4 gap-2">
              <span className="text-slate-400">🔍</span>
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                placeholder="Buscar por título, autor ou tema..."
                className="w-full px-4 py-2 outline-none text-slate-700 bg-transparent placeholder-slate-400 text-lg"
              />
            </div>
            <button 
              onClick={handleBuscar}
              disabled={carregando}
              className="bg-gradient-to-r from-[#0066ff] via-[#3b82f6] to-[#d4d764] text-white px-8 py-3 rounded-full font-medium shadow hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
            >
              {carregando ? "Buscando..." : "Buscar" }
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {livros.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
            
            {/* Área da Imagem */}
            <div className="w-full h-64 bg-slate-200 rounded-xl mb-4 overflow-hidden shadow-inner">
              {item.volumeInfo.imageLinks?.thumbnail ? (
                <img 
                  src={item.volumeInfo.imageLinks.thumbnail.replace("http://", "https://")} 
                  alt={item.volumeInfo.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Sem Capa
                </div>
              )}
            </div>

            {/* Conteúdo do Texto */}
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-800 line-clamp-2">{item.volumeInfo.title}</h3>
              <p className="text-blue-600 text-sm font-medium mb-3">
                {item.volumeInfo.authors?.join(', ') || "Autor desconhecido"}
              </p>
              <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                {item.volumeInfo.description || "Sem descrição disponível."}
              </p>
            </div>

            <button 
              onClick={() => handleImportar(item.volumeInfo.title)}
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              + Adicionar à Biblioteca
            </button>
          </div>
        ))}
        </div>
      </div>
    </main>
  );
}