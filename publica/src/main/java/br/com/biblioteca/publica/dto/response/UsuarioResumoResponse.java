package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Usuario;

public record UsuarioResumoResponse(
        Long id,
        String nome,
        String email,
        String perfil
) {
    public static UsuarioResumoResponse from(Usuario u) {
        return new UsuarioResumoResponse(
                u.getId(), u.getNome(), u.getEmail(),
                u.getPerfil().name()
        );
    }
}
