import React, { useEffect, useRef, useState } from 'react';
import api from '../services/Api';

const BookReader = ({ alunoId, livro, paginaInicial }) => {
    const viewerRef = useRef(null);
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

    const extractVolumeId = (url) => {
        if (!url) return null;
        const match = url.match(/[?&]id=([^&]+)/);
        return match ? match[1] : null;
    };

    const googleVolumeId = extractVolumeId(livro?.urlConteudo);

    // 1. Carrega o script globalmente uma única vez
    useEffect(() => {
        if (!window.google) {
            const script = document.createElement('script');
            script.src = "https://www.google.com/books/jsapi.js";
            script.onload = () => {
                window.google.books.load();
                window.google.books.setOnLoadCallback(() => setIsGoogleLoaded(true));
            };
            document.head.appendChild(script);
        } else {
            setIsGoogleLoaded(true);
        }
    }, []);

    // 2. Tenta carregar o livro APENAS quando o Google e a Ref estiverem prontos
    useEffect(() => {
        if (isGoogleLoaded && viewerRef.current && googleVolumeId) {
            const viewer = new window.google.books.DefaultViewer(viewerRef.current);
            viewer.load(googleVolumeId, null, () => {
                if (paginaInicial > 0) viewer.goToPage(paginaInicial);
            });
        }
    }, [isGoogleLoaded, googleVolumeId, paginaInicial]);

    return (
        <div className="flex flex-col items-center p-6 bg-white min-h-screen">
            <h2 className="text-2xl font-bold mb-4">{livro?.titulo}</h2>
            {/* O Google precisa que a div exista antes de chamar o load */}
            <div ref={viewerRef} style={{ width: '100%', height: '600px' }} />
        </div>
    );
};

export default BookReader;