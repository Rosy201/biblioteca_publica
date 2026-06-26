package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.enums.CategoriaEnum;

public record CategoriaEngajamentoResponse(
        CategoriaEnum categoria, // <-- Mude de String para CategoriaEnum
        Long totalLeituras
) {}