import React, { useEffect, useRef, useState } from 'react';
import api from '../services/Api'; // Sua configuração do Axios

const BookReader = ({ alunoId, livro, paginaInicial }) => {
    const viewerRef = useRef(null);
    const [viewerInstance, setViewerInstance] = useState(null);

    // O LivroService salva a URL assim: "https://books.google.com.br/books?id=XXXXX"
    const googleVolumeId = livro?.urlConteudo?.split('id=')[1];

    useEffect(() => {
        if (!googleVolumeId) return;

        // Injeta o script do Google dinamicamente na página
        const script = document.createElement('script');
        script.src = "https://www.google.com/books/jsapi.js";
        script.async = true;

        script.onload = () => {
            window.google.books.load();
            window.google.books.setOnLoadCallback(() => {
                const viewer = new window.google.books.DefaultViewer(viewerRef.current);

                // Carrega o livro pelo ID
                viewer.load(googleVolumeId, null, () => {
                    // Assim que o livro carregar, pula para a página que estava salva no banco!
                    if (paginaInicial > 0) {
                        viewer.goToPage(paginaInicial);
                    }
                });

                setViewerInstance(viewer);
            });
        };

        document.body.appendChild(script);

        // Limpeza do DOM quando o aluno sair da página
        return () => {
            document.body.removeChild(script);
        };
    }, [googleVolumeId, paginaInicial]);

    // O pulo do gato: capturar a página do iframe do Google e mandar pro nosso Spring Boot
    const salvarProgresso = async () => {
        if (viewerInstance) {
            const currentPage = viewerInstance.getPageNumber();

            try {
                await api.post('/historicos/progresso', {
                    alunoId: alunoId,
                    livroId: livro.id,
                    paginaAtual: currentPage || 1
                });
                alert('Progresso salvo com sucesso! Você pode continuar de onde parou na próxima vez.');
            } catch (error) {
                console.error("Erro ao salvar o progresso", error);
                alert('Houve um erro ao salvar seu progresso.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{livro?.titulo}</h2>

            {/* Container onde o Google vai renderizar o iframe do livro */}
            <div
                ref={viewerRef}
                style={{ width: '100%', maxWidth: '800px', height: '600px' }}
                className="shadow-lg border rounded bg-white"
            ></div>

            <button
                onClick={salvarProgresso}
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-md transition-colors"
            >
                Salvar Progresso e Sair
            </button>
        </div>
    );
};

export default BookReader;