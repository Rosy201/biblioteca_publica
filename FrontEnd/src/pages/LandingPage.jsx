import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom'; // Se estiver usando rotas

export default function Header() {
  return (
    <header className="relative z-10 w-full">
      <nav className="flex items-center justify-between px-12 py-6 max-w-7xl mx-auto">

        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-1.5 rounded-lg">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900">Biblioteca Pública</span>
        </div>
        
        {/* Actions Section */}
        <div className="flex items-center gap-8">
          <button className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
            Entrar
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:opacity-90 transition-opacity">
            Cadastrar
          </button>
        </div>
      </nav>
    </header>
  );
}