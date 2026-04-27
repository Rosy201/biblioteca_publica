package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Aluno;

public record AlunoResponse(
        Long id,
        String nome,
        String email,
        String matricula,
        String escola
) {
    public static AlunoResponse from(Aluno a) {
        String nomeEscola = a.getEscola() != null ? a.getEscola().getNome() : null;
        return new AlunoResponse(a.getId(), a.getNome(), a.getEmail(), a.getMatricula(), nomeEscola);
    }
}
