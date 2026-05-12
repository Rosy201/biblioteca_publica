package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Livro;
import br.com.biblioteca.publica.enums.CategoriaEnum;

public record LivroResponse(
        Long id,
        String titulo,
        String autor,
        CategoriaEnum categoria,
        String urlConteudo,
        Long escolaId
) {

    public static LivroResponse from(Livro livro) {
        return new LivroResponse(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getCategoria(),
                livro.getUrlConteudo(),
                livro.getEscola() != null ? livro.getEscola().getId() : null
        );
    }
}