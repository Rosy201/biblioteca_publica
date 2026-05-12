import React from 'react';

export default function UserManagement() {
  // Mock de dados (será substituído pela chamada ao AlunoController)
  const users = [
    { id: 1, nome: "Ana Silva", email: "ana.silva@escola.pt", perfil: "ALUNO" },
    { id: 2, nome: "Carlos Souza", email: "carlos.s@escola.pt", perfil: "ALUNO" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Gestão de Usuários</h2>
        <button className="px-6 py-2 bg-gradient-to-r from-[#0066ff] to-[#d4d764] text-white rounded-lg font-bold shadow-md">
          Novo Aluno
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/20 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">E-mail</th>
              <th className="px-6 py-4">Perfil</th>
              <th className="px-6 py-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-white/50 transition-colors text-slate-700">
                <td className="px-6 py-4 font-medium">{user.nome}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-bold">
                    {user.perfil}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button className="text-slate-400 hover:text-[#0066ff]">Editar</button>
                  <button className="text-slate-400 hover:text-red-500">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}