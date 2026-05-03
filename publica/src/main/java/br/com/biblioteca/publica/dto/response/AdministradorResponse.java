package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Administrador;

public record AdministradorResponse(
        Long id,
        String nome,
        String email
) {
    public static AdministradorResponse from(Administrador a) {
        return new AdministradorResponse(a.getId(), a.getNome(), a.getEmail());
    }
}
