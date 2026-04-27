package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.HistoricoLeitura;
import java.time.LocalDateTime;

public record HistoricoResponse(
        Long id,
        String tituloLivro,
        String nomeAluno,
        int progressoPagina,
        LocalDateTime dataAcesso,
        boolean concluido
) {
    public static HistoricoResponse from(HistoricoLeitura h) {
        return new HistoricoResponse(
                h.getId(), h.getLivro().getTitulo(), h.getAluno().getNome(),
                h.getProgressoPagina(), h.getDataAcesso(), h.isConcluido()
        );
    }
}
