import React, { useEffect, useRef, useState } from 'react';
import api from '../services/Api';

const BookReader = ({ alunoId, livro, paginaInicial }) => {
    const viewerRef = useRef(null);
    const viewerInstanceRef = useRef(null);

    const [viewerStatus, setViewerStatus] = useState('loading'); // loading | ready | error
    const [paginaAtual, setPaginaAtual] = useState(Number(paginaInicial) || 1);
    const [historicoId, setHistoricoId] = useState(null);

    const [savingProgress, setSavingProgress] = useState(false);
    const [savingMarker, setSavingMarker] = useState(false);

    const [feedback, setFeedback] = useState({
        type: '',
        message: ''
    });

    const extractVolumeId = (url) => {
        if (!url) return null;

        const match = url.match(/[?&]id=([^&]+)/);
        return match ? match[1] : null;
    };

    const googleVolumeId = extractVolumeId(livro?.urlConteudo);

    const showFeedback = (type, message) => {
        setFeedback({ type, message });

        window.setTimeout(() => {
            setFeedback({ type: '', message: '' });
        }, 5000);
    };

    const capturarPaginaDoGoogleUmaVez = () => {
        const viewer = viewerInstanceRef.current;

        if (viewer && typeof viewer.getPageNumber === 'function') {
            const page = Number(viewer.getPageNumber());

            if (!Number.isNaN(page) && page > 0) {
                setPaginaAtual(page);
            }
        }
    };

    const salvarProgresso = async ({ silent = false } = {}) => {
        const page = Number(paginaAtual) || 1;

        if (!alunoId || !livro?.id) {
            if (!silent) {
                showFeedback(
                    'error',
                    'Não foi possível identificar o aluno ou o livro para salvar o progresso.'
                );
            }

            return null;
        }

        const payload = {
            alunoId: Number(alunoId),
            livroId: Number(livro.id),
            paginaAtual: page
        };

        try {
            if (!silent) {
                setSavingProgress(true);
            }

            const response = await api.post('/historicos/progresso', payload);

            if (response.data?.id) {
                setHistoricoId(response.data.id);
            }

            if (!silent) {
                showFeedback('success', `Progresso salvo na página ${page}.`);
            }

            return response.data;
        } catch (error) {
            console.error('Erro ao salvar progresso de leitura:', error);

            if (!silent) {
                const message =
                    error.usuarioMessage ||
                    error.response?.data?.message ||
                    error.response?.data?.erro ||
                    'Não foi possível salvar o progresso. Verifique a conexão e tente novamente.';

                showFeedback('error', message);
            }

            return null;
        } finally {
            if (!silent) {
                setSavingProgress(false);
            }
        }
    };

    const salvarMarcador = async () => {
        const page = Number(paginaAtual) || 1;

        try {
            setSavingMarker(true);

            let idHistorico = historicoId;

            if (!idHistorico) {
                const historicoSalvo = await salvarProgresso({ silent: true });
                idHistorico = historicoSalvo?.id;

                if (idHistorico) {
                    setHistoricoId(idHistorico);
                }
            }

            if (!idHistorico) {
                showFeedback(
                    'error',
                    'Não foi possível salvar o marcador porque o histórico de leitura não foi encontrado.'
                );
                return;
            }

            await api.post('/marcadores', {
                historicoId: Number(idHistorico),
                posicao: page
            });

            showFeedback('success', `Marcador salvo na página ${page}.`);
        } catch (error) {
            console.error('Erro ao salvar marcador:', error);

            const message =
                error.usuarioMessage ||
                error.response?.data?.message ||
                error.response?.data?.erro ||
                'Não foi possível salvar o marcador. Tente novamente.';

            showFeedback('error', message);
        } finally {
            setSavingMarker(false);
        }
    };

    useEffect(() => {
        setPaginaAtual(Number(paginaInicial) || 1);
    }, [paginaInicial]);

    useEffect(() => {
        if (!googleVolumeId) {
            setViewerStatus('error');
            return;
        }

        const carregarGoogleBooks = () => {
            try {
                setViewerStatus('loading');

                const timeoutId = window.setTimeout(() => {
                    setViewerStatus('ready');
                }, 5000);

                const viewer = new window.google.books.DefaultViewer(viewerRef.current);
                viewerInstanceRef.current = viewer;

                viewer.load(
                    googleVolumeId,

                    () => {
                        window.clearTimeout(timeoutId);
                        setViewerStatus('error');

                        showFeedback(
                            'error',
                            'Este livro não está disponível para leitura integrada pelo Google Books.'
                        );
                    },

                    () => {
                        window.clearTimeout(timeoutId);

                        const initialPage = Number(paginaInicial) || 1;

                        if (initialPage > 1 && typeof viewer.goToPage === 'function') {
                            viewer.goToPage(initialPage);
                        }

                        setViewerStatus('ready');

                        window.setTimeout(() => {
                            capturarPaginaDoGoogleUmaVez();
                        }, 1000);
                    }
                );
            } catch (error) {
                console.error('Erro ao inicializar Google Books Viewer:', error);

                setViewerStatus('error');
                showFeedback(
                    'error',
                    'O leitor não pôde ser inicializado. Use o registro manual de página.'
                );
            }
        };

        if (window.google?.books) {
            carregarGoogleBooks();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.google.com/books/jsapi.js';

        script.onload = () => {
            window.google.books.load();
            window.google.books.setOnLoadCallback(carregarGoogleBooks);
        };

        script.onerror = () => {
            setViewerStatus('error');
            showFeedback(
                'error',
                'Não foi possível carregar o leitor do Google Books.'
            );
        };

        document.head.appendChild(script);
    }, [googleVolumeId, paginaInicial]);

    useEffect(() => {
        const salvarAntesDeSair = () => {
            salvarProgresso({ silent: true });
        };

        window.addEventListener('beforeunload', salvarAntesDeSair);

        return () => {
            window.removeEventListener('beforeunload', salvarAntesDeSair);
            salvarProgresso({ silent: true });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-white min-h-screen">
            <div className="w-full max-w-6xl">
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {livro?.titulo || 'Leitura'}
                    </h2>

                    {livro?.autor && (
                        <p className="text-sm text-gray-500 mt-1">
                            {livro.autor}
                        </p>
                    )}
                </div>

                <div className="w-full flex flex-col gap-3 mb-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Página atual
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={paginaAtual}
                            onChange={(event) => setPaginaAtual(event.target.value)}
                            className="w-40 border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <span className="text-xs text-gray-500">
                            O sistema salvará exatamente o valor informado aqui.
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => salvarProgresso()}
                            disabled={savingProgress}
                            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {savingProgress ? 'Salvando...' : 'Salvar progresso'}
                        </button>

                        <button
                            type="button"
                            onClick={salvarMarcador}
                            disabled={savingMarker || savingProgress}
                            className="px-4 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {savingMarker ? 'Salvando marcador...' : 'Adicionar marcador'}
                        </button>

                        {livro?.urlConteudo && (
                            <a
                                href={livro.urlConteudo}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 text-center"
                            >
                                Abrir no Google Books
                            </a>
                        )}
                    </div>
                </div>

                {feedback.message && (
                    <div
                        className={`w-full mb-4 rounded-md px-4 py-3 text-sm ${
                            feedback.type === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                    >
                        {feedback.message}
                    </div>
                )}

                <div className="w-full min-h-[600px] rounded-lg border border-gray-200 bg-gray-50 overflow-hidden relative">
                    {viewerStatus === 'loading' && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
                            <p className="text-gray-500 animate-pulse">
                                Carregando leitor...
                            </p>
                        </div>
                    )}

                    {viewerStatus === 'error' && (
                        <div className="h-[600px] flex items-center justify-center p-6">
                            <div className="max-w-xl rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-yellow-800">
                                <h3 className="text-lg font-semibold mb-2">
                                    Leitura integrada indisponível
                                </h3>

                                <p className="text-sm mb-4">
                                    Este livro não pôde ser carregado pelo Google Books ou não possui páginas compatíveis com o leitor integrado. Você ainda pode registrar seu progresso manualmente usando o campo de página atual.
                                </p>

                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => salvarProgresso()}
                                        disabled={savingProgress}
                                        className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                                    >
                                        {savingProgress ? 'Salvando...' : 'Salvar página manual'}
                                    </button>

                                    {livro?.urlConteudo && (
                                        <a
                                            href={livro.urlConteudo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-2 rounded-md bg-white border border-yellow-300 text-yellow-800 font-medium hover:bg-yellow-100 text-center"
                                        >
                                            Abrir fora do sistema
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        ref={viewerRef}
                        style={{
                            width: '100%',
                            height: viewerStatus === 'error' ? 0 : '600px',
                            overflow: 'hidden',
                            visibility: viewerStatus === 'error' ? 'hidden' : 'visible'
                        }}
                    />
                </div>
                <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                    A página registrada é uma referência de progresso. Se o Google Books não contar corretamente, informe a página manualmente antes de salvar.
                </div>   
            </div>         
        </div>
    );
};

export default BookReader;