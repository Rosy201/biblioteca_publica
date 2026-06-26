package br.com.biblioteca.publica.dto.response;

import java.util.List;

public record DashboardResponse(
        Long totalLivrosConcluidos,
        Long totalAlunosAtivos,
        List<CategoriaEngajamentoResponse> engajamentoPorCategoria
) {}