import React from 'react';

export default function landingPage() {
  return (
    <main className="flex-1 w-full flex items-center">
      <div className="max-w-7xl mx-auto px-8 w-full pb-20">
        <div className="max-w-3xl">
          {/* Tag / Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100/60 text-[#0066ff] px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="text-[#0066ff]">✨</span>
            <span>Explore o catálogo · entre para ler</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-6xl md:text-7xl font-bold text-[#1e293b] leading-[1.1] mb-6 tracking-tight">
            Sua biblioteca <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] via-[#4facfe] to-[#eab308]">infinita</span>
            <br /> começa aqui.
          </h1>

          {/* Subtítulo */}
          <p className="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
            Explore milhões de títulos, descubra novos autores e mergulhe em histórias que transformam.
          </p>

          {/* Barra de Busca */}
          <div className="flex items-center bg-white p-2 rounded-full shadow-lg max-w-2xl transition-all focus-within:ring-2 focus-within:ring-blue-200">
            <div className="flex-1 flex items-center pl-4 gap-2">
              <span className="text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar por título, autor ou tema..."
                className="w-full px-4 py-2 outline-none text-slate-700 bg-transparent placeholder-slate-400 text-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-[#0066ff] via-[#3b82f6] to-[#d4d764] text-white px-8 py-3 rounded-full font-medium shadow hover:opacity-90 transition-opacity whitespace-nowrap">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}