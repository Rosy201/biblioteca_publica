import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardAdmin = () => {
    const [dados, setDados] = useState({
        totalLivrosConcluidos: 0,
        totalAlunosAtivos: 0,
        engajamentoPorCategoria: []
    });

    useEffect(() => {
        const carregarDashboard = async () => {
            try {
                const response = await api.get('/relatorios/dashboard');
                setDados(response.data);
            } catch (error) {
                console.error("Erro ao carregar métricas do dashboard", error);
            }
        };
        carregarDashboard();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Visão Geral da Biblioteca</h1>

            {/* Cards Superiores (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm uppercase tracking-wider">Alunos Ativos (7 dias)</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{dados.totalAlunosAtivos}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm uppercase tracking-wider">Livros Concluídos</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{dados.totalLivrosConcluidos}</p>
                </div>
            </div>

            {/* Gráfico de Engajamento por Categoria */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-6">Leituras por Categoria</h3>
                <div style={{ width: '100%', height: 350 }}>
                    <ResponsiveContainer>
                        <BarChart data={dados.engajamentoPorCategoria}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="categoria" />
                            <YAxis allowDecimals={false} />
                            <Tooltip cursor={{ fill: '#f3f4f6' }} />
                            {/* A chave "totalLeituras" vem direto do DTO CategoriaEngajamentoResponse */}
                            <Bar dataKey="totalLeituras" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;