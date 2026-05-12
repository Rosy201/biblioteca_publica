import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [perfil, setPerfil] = useState('ALUNO');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simula a estrutura que virá do seu UsuarioResumoResponse
    const userData = {
      nome: perfil === 'SUPERVISOR' ? 'Admin' : 'Estudante',
      perfil: perfil, // 'SUPERVISOR' ou 'ALUNO'
      isLoggedIn: true
    };
    onLogin(userData);
    navigate('/'); // Redireciona para a home
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Entrar no sistema</h2>
        <div className="space-y-4">
          <label className="block text-slate-600 font-medium">Selecione o perfil para teste:</label>
          <select 
            className="w-full p-3 border rounded-lg bg-slate-50"
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
          >
            <option value="ALUNO">Usuário Aluno</option>
            <option value="SUPERVISOR">Usuário Supervisor</option>
          </select>
          <button 
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-[#0066ff] to-[#3b82f6] text-white rounded-lg font-bold shadow-lg hover:scale-[1.02] transition-transform"
          >
            Acessar Sistema
          </button>
        </div>
      </div>
    </div>
  );
}