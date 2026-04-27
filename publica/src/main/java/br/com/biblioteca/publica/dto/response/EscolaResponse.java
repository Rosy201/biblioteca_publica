package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.Escola;

public record EscolaResponse(
        Long id,
        String nome,
        String localizacao,
        String codigoINEP,
        int totalAlunos
) {
    public static EscolaResponse from(Escola e) {
        return new EscolaResponse(
                e.getId(), e.getNome(), e.getLocalizacao(),
                e.getCodigoINEP(), e.getAlunos().size()
        );
    }
}
