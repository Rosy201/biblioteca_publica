package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Escola;
import br.com.biblioteca.publica.entity.Livro;
import br.com.biblioteca.publica.enums.CategoriaEnum;

public record LivroResponse(
    Long id,
    String titulo,
    String autor,
    CategoriaEnum categoria,
    String urlConteudo,
    Long escolaId // Útil para o Front saber a origem
) {
    public LivroResponse(Livro livro) {
        this(
            livro.getId(),
            livro.getTitulo(),
            livro.getAutor(),
            livro.getCategoria(),
            livro.getUrlConteudo(),
            livro.getEscola() != null ? livro.getEscola().getId() : null
        );
    }
}
