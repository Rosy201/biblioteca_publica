package br.com.biblioteca.publica.dto.request;

import br.com.biblioteca.publica.enums.CategoriaEnum;

public record LivroRequest(
        String titulo,
        String autor,
        String urlConteudo,
        CategoriaEnum categoria,
        Long escolaId
) {}
