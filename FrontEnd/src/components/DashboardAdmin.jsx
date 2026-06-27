import React, { useEffect, useMemo, useState } from 'react';
import api from '../services/Api';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const DashboardAdmin = () => {
    const [dados, setDados] = useState({
        totalLivrosConcluidos: 0,
        totalAlunosAtivos: 0,
        engajamentoPorCategoria: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const carregarDashboard = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await api.get('/relatorios/dashboard');

            setDados({
                totalLivrosConcluidos: response.data?.totalLivrosConcluidos ?? 0,
                totalAlunosAtivos: response.data?.totalAlunosAtivos ?? 0,
                engajamentoPorCategoria: response.data?.engajamentoPorCategoria ?? []
            });
        } catch (err) {
            console.error('Erro ao carregar métricas do dashboard:', err);

            const message =
                err.response?.data?.message ||
                err.response?.data?.erro ||
                'Não foi possível carregar os dados do dashboard. Verifique se o backend está ativo.';

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDashboard();
    }, []);

    const dadosCategoria = useMemo(() => {
        return dados.engajamentoPorCategoria.map((item) => ({
            categoria: formatarCategoria(item.categoria),
            totalLeituras: Number(item.totalLeituras) || 0
        }));
    }, [dados.engajamentoPorCategoria]);

    const totalLeiturasRegistradas = useMemo(() => {
        return dadosCategoria.reduce((total, item) => total + item.totalLeituras, 0);
    }, [dadosCategoria]);

    const categoriaMaisLida = useMemo(() => {
        if (!dadosCategoria.length) return 'Sem dados';

        const maior = dadosCategoria.reduce((atual, proximo) => {
            return proximo.totalLeituras > atual.totalLeituras ? proximo : atual;
        }, dadosCategoria[0]);

        return maior?.categoria || 'Sem dados';
    }, [dadosCategoria]);

    const temEngajamento = dadosCategoria.length > 0 && totalLeiturasRegistradas > 0;

    if (loading) {
        return (
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Visão Geral da Biblioteca
                </h1>

                <p className="text-gray-500 mb-8">
                    Carregando indicadores administrativos...
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-pulse"
                        >
                            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                            <div className="h-8 bg-gray-200 rounded w-1/3" />
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-6" />
                    <div className="h-80 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Visão Geral da Biblioteca
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Acompanhe leitura, engajamento e atividade dos alunos.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={carregarDashboard}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                    Atualizar dados
                </button>
            </div>

            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <KpiCard
                    title="Alunos ativos"
                    value={dados.totalAlunosAtivos}
                    description="Alunos com leitura nos últimos 7 dias"
                    borderColor="border-blue-500"
                />

                <KpiCard
                    title="Livros concluídos"
                    value={dados.totalLivrosConcluidos}
                    description="Históricos marcados como concluídos"
                    borderColor="border-green-500"
                />

                <KpiCard
                    title="Leituras registradas"
                    value={totalLeiturasRegistradas}
                    description="Total de históricos por categoria"
                    borderColor="border-purple-500"
                />

                <KpiCard
                    title="Categoria destaque"
                    value={categoriaMaisLida}
                    description="Categoria com maior engajamento"
                    borderColor="border-yellow-500"
                    isText
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex flex-col gap-1 mb-6">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Leituras por Categoria
                        </h3>

                        <p className="text-sm text-gray-500">
                            Quantidade de históricos de leitura agrupados pela categoria dos livros.
                        </p>
                    </div>

                    {temEngajamento ? (
                        <div style={{ width: '100%', height: 350 }}>
                            <ResponsiveContainer>
                                <BarChart data={dadosCategoria}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="categoria" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Bar
                                        dataKey="totalLeituras"
                                        fill="#3b82f6"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <EmptyState message="Ainda não há leituras suficientes para gerar o gráfico por categoria." />
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex flex-col gap-1 mb-6">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Distribuição
                        </h3>

                        <p className="text-sm text-gray-500">
                            Participação relativa das categorias no engajamento.
                        </p>
                    </div>

                    {temEngajamento ? (
                        <div style={{ width: '100%', height: 350 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={dadosCategoria}
                                        dataKey="totalLeituras"
                                        nameKey="categoria"
                                        cx="50%"
                                        cy="45%"
                                        outerRadius={95}
                                        label
                                    >
                                        {dadosCategoria.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <EmptyState message="A distribuição será exibida quando houver leituras registradas." />
                    )}
                </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Resumo dos dados
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500">
                                <th className="py-3 pr-4 font-medium">Categoria</th>
                                <th className="py-3 pr-4 font-medium">Leituras</th>
                                <th className="py-3 pr-4 font-medium">Participação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {temEngajamento ? (
                                dadosCategoria.map((item) => {
                                    const percentual =
                                        totalLeiturasRegistradas > 0
                                            ? ((item.totalLeituras / totalLeiturasRegistradas) * 100).toFixed(1)
                                            : '0.0';

                                    return (
                                        <tr
                                            key={item.categoria}
                                            className="border-b border-gray-100 text-gray-700"
                                        >
                                            <td className="py-3 pr-4">{item.categoria}</td>
                                            <td className="py-3 pr-4">{item.totalLeituras}</td>
                                            <td className="py-3 pr-4">{percentual}%</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        Nenhum dado de engajamento encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const KpiCard = ({ title, value, description, borderColor, isText = false }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${borderColor}`}>
            <h3 className="text-gray-500 text-sm uppercase tracking-wider">
                {title}
            </h3>

            <p
                className={`font-bold text-gray-800 mt-2 ${
                    isText ? 'text-2xl' : 'text-4xl'
                }`}
            >
                {value ?? 0}
            </p>

            <p className="text-sm text-gray-500 mt-3">
                {description}
            </p>
        </div>
    );
};

const EmptyState = ({ message }) => {
    return (
        <div className="h-80 flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
            <p className="text-gray-500 text-sm text-center px-4">
                {message}
            </p>
        </div>
    );
};

const formatarCategoria = (categoria) => {
    if (!categoria) return 'Sem categoria';

    return String(categoria)
        .toLowerCase()
        .replaceAll('_', ' ')
        .replace(/\b\w/g, (letra) => letra.toUpperCase());
};

const COLORS = [
    '#3b82f6',
    '#22c55e',
    '#a855f7',
    '#f59e0b',
    '#ef4444',
    '#14b8a6',
    '#6366f1'
];

export default DashboardAdmin;