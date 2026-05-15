import React from 'react';
import { Search, BookOpen } from 'lucide-react'; // Instale com: npm install lucide-react

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-sans">
      
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full bg-yellow-100/40 blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[60%] rounded-full bg-blue-100/40 blur-[100px]" />
      </div>


      {/* Conteúdo Principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-12 pt-24 pb-20">
        <div className="max-w-2xl text-left">
          
          {/* Tag Pequena */}
          <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-semibold mb-8">
            <span className="text-blue-400">✨</span> Explore o catálogo · entre para ler
          </div>

          {/* Título Principal */}
          <h1 className="text-[64px] font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Sua biblioteca <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-yellow-500">infinita</span>
            <br /> começa aqui.
          </h1>

          {/* Subtítulo */}
          <p className="text-lg text-slate-500 mb-12 max-w-lg leading-relaxed font-medium">
            Explore milhões de títulos, descubra novos autores e mergulhe em histórias que transformam.
          </p>

          {/* Barra de Busca (Exatamente como na imagem) */}
          <div className="relative max-w-xl group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por título, autor ou tema..."
              className="w-full pl-14 pr-32 py-5 bg-white border border-slate-100 rounded-full shadow-2xl shadow-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 transition-all text-sm"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-8 rounded-full font-bold text-sm shadow-md hover:brightness-105 transition-all">
              Buscar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}