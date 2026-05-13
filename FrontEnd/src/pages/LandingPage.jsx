import React from 'react';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl font-extrabold text-slate-800 mb-6">
        A leitura ao alcance de <br />
        <span className="bg-gradient-to-r from-[#0066ff] to-[#3b82f6] bg-clip-text text-transparent">todos os alunos.</span>
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mb-8">
        Gestão moderna e intuitiva para o acervo da sua escola. Organize livros, usuários e empréstimos em um só lugar.
      </p>
      <div className="flex gap-4">
        <button className="px-8 py-3 bg-gradient-to-r from-[#0066ff] to-[#3b82f6] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
          Explorar Acervo
        </button>
        <button className="px-8 py-3 border-2 border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50 transition-colors">
          Saiba Mais
        </button>
      </div>
    </main>
  );
}