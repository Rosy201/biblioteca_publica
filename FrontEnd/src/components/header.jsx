import React from 'react';

export default function header() {
  return (
    <header className="w-full px-8 py-6 flex items-center justify-between z-10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-[#0088ff] to-[#eab308] p-2 rounded-xl text-white flex items-center justify-center w-10 h-10">
          {/* Trocamos o ícone por um emoji para testar */}
          📖
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">
          Biblioteca Pública
        </span>
      </div>

      {/* Navegação */}
      <div className="flex items-center gap-6">
        <button className="text-slate-800 font-medium hover:text-blue-600 transition-colors">
          Entrar
        </button>
        <button className="bg-gradient-to-r from-[#0066ff] via-[#3b82f6] to-[#d4d764] text-white px-7 py-2.5 rounded-md font-medium shadow-sm hover:opacity-90 transition-opacity">
          Cadastrar
        </button>
      </div>
    </header>
  );
}