package br.com.biblioteca.publica.dto.request;

public record AdministradorRequest(
        String nome,
        String email,
        String senha
) {}
