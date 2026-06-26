package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.MarcadorPagina;
import java.time.LocalDate;

public record MarcadorResponse(
        Long id,
        Integer posicao,
        LocalDate dataCriacao,
        Long historicoId
) {
    public static MarcadorResponse from(MarcadorPagina marcador) {
        return new MarcadorResponse(
                marcador.getId(),
                marcador.getPosicao(),
                marcador.getDataCriacao(),
                marcador.getHistorico().getId()
        );
    }
}