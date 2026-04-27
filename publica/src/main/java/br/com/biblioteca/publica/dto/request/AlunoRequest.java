package br.com.biblioteca.publica.dto.request;

public record AlunoRequest(
        String nome,
        String email,
        String senha,
        String matricula,
        Long escolaId
) {}
