package br.com.biblioteca.publica.dto.request;

public record AlunoUpdateRequest(
        String nome,
        String email,
        String senha,       // null = não alterar a senha
        Long escolaId
) {}
