package br.com.biblioteca.publica.dto.request;

import jakarta.validation.constraints.NotNull;

public record HistoricoLeituraRequest(
        @NotNull Long alunoId,
        @NotNull Long livroId,
        @NotNull Integer paginaAtual
) {}