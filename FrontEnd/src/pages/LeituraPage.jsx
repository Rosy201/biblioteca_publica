import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/Api';
import BookReader from '../components/BookReader'; // Ajuste o caminho se necessário

const LeituraPage = () => {
    // Pega o ID do livro direto da URL (ex: /leitura/10)
    const { livroId } = useParams(); 
    const navigate = useNavigate();
    
    const [livro, setLivro] = useState(null);
    const [paginaInicial, setPaginaInicial] = useState(0);
    const [loading, setLoading] = useState(true);

    // TODO: Em produção, este ID virá do seu AuthContext ou localStorage após o login.
    // Para testarmos agora, vamos deixar fixo o aluno 1 que criámos ontem.
    const alunoId = 1; 

    useEffect(() => {
        const carregarDadosLeitura = async () => {
            try {
                // 1. Busca os detalhes do livro pelo ID
                const livroResponse = await api.get(`/livros/${livroId}`);
                setLivro(livroResponse.data);

                // 2. Busca o histórico de leitura deste aluno
                const historicoResponse = await api.get(`/historicos/aluno/${alunoId}`);
                const historicos = historicoResponse.data;
                
                // 3. Verifica se ele já estava lendo ESTE livro específico
                const historicoAtual = historicos.find(h => h.livroId === parseInt(livroId));
                
                if (historicoAtual) {
                    setPaginaInicial(historicoAtual.progressoPagina); // Retoma de onde parou!
                }

            } catch (error) {
                console.error("Erro ao carregar dados da leitura", error);
                alert("Não foi possível carregar o livro. Verifique a conexão.");
            } finally {
                setLoading(false); // Desliga o spinner de carregamento
            }
        };

        carregarDadosLeitura();
    }, [livroId, alunoId]);

    // Um "loading" simples e elegante para melhorar a UX
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-xl text-gray-600 animate-pulse">Carregando o seu livro...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Botão para voltar à listagem de livros */}
            <div className="p-4 bg-white shadow-sm">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    &larr; Voltar para o Acervo
                </button>
            </div>

            {/* Chama o leitor do Google passando os dados do Spring Boot */}
            {livro && (
                <BookReader 
                    alunoId={alunoId} 
                    livro={livro} 
                    paginaInicial={paginaInicial} 
                />
            )}
        </div>
    );
};

export default LeituraPage;