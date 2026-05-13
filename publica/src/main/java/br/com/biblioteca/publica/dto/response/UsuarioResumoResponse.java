package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Usuario;

public record UsuarioResumoResponse(
        Long id,
        String nome,
        String email,
        String perfil,
        Long escolaId // Adicionado para identificar a escola do usuário
) {
    public static UsuarioResumoResponse from(Usuario u) {
        return new UsuarioResumoResponse(
                u.getId(),
                u.getNome(),
                u.getEmail(),
                u.getPerfil().name(),
                u.getEscola() != null ? u.getEscola().getId() : null
        );
    }
}