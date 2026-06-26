package br.com.biblioteca.publica.dto.response;

import br.com.biblioteca.publica.entity.HistoricoLeitura;
import java.time.LocalDateTime;

public record HistoricoResponse(
        Long id,
        Integer progressoPagina,
        LocalDateTime dataAcesso,
        Boolean concluido,
        Long alunoId,
        String alunoNome,
        Long livroId,
        String livroTitulo
) {
    public static HistoricoResponse from(HistoricoLeitura historico) {
        return new HistoricoResponse(
                historico.getId(),
                historico.getProgressoPagina(),
                historico.getDataAcesso(),
                historico.getConcluido(),
                historico.getAluno().getId(),
                historico.getAluno().getNome(), // Assumindo que a entidade Aluno tenha "getNome()"
                historico.getLivro().getId(),
                historico.getLivro().getTitulo()
        );
    }
}