package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Livro;
import br.com.biblioteca.publica.enums.CategoriaEnum;

public record LivroResponse(
        Long id,
        String titulo,
        String autor,
        String urlConteudo,
        CategoriaEnum categoria
) {
    public static LivroResponse from(Livro l) {
        return new LivroResponse(
                l.getId(), l.getTitulo(), l.getAutor(),
                l.getUrlConteudo(), l.getCategoria()
        );
    }
}
