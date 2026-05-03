package br.com.biblioteca.publica.dto.request;

public record SupervisorUpdateRequest(
        String nome,
        String email,
        String senha,
        String cargo,
        String departamento,
        Long escolaId
) {}
