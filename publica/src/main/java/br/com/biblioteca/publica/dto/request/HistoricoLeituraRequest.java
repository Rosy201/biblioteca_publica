package br.com.biblioteca.publica.dto.request;

public record HistoricoLeituraRequest(
        Long alunoId,
        Long livroId
) {}
