package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Supervisor;

public record SupervisorResponse(
        Long id,
        String nome,
        String email,
        String cargo,
        String departamento,
        String escola
) {
    public static SupervisorResponse from(Supervisor s) {
        String nomeEscola = s.getEscola() != null ? s.getEscola().getNome() : null;
        return new SupervisorResponse(
                s.getId(), s.getNome(), s.getEmail(),
                s.getCargo(), s.getDepartamento(), nomeEscola
        );
    }
}
