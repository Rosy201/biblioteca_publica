package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.dto.response.CategoriaEngajamentoResponse;
import br.com.biblioteca.publica.entity.HistoricoLeitura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface HistoricoLeituraRepository extends JpaRepository<HistoricoLeitura, Long> {

    @Query("SELECT h FROM HistoricoLeitura h JOIN FETCH h.aluno JOIN FETCH h.livro WHERE h.aluno.id = :alunoId AND h.livro.id = :livroId")
    Optional<HistoricoLeitura> findByAlunoIdAndLivroId(@Param("alunoId") Long alunoId, @Param("livroId") Long livroId);

    @Query("SELECT h FROM HistoricoLeitura h JOIN FETCH h.aluno JOIN FETCH h.livro WHERE h.aluno.id = :alunoId")
    List<HistoricoLeitura> findByAlunoId(@Param("alunoId") Long alunoId);

    // 1. Total de livros concluídos na plataforma
    @Query("SELECT COUNT(h) FROM HistoricoLeitura h WHERE h.concluido = true")
    Long countLivrosConcluidos();

    // 2. Alunos ativos nos últimos X dias
    @Query("SELECT COUNT(DISTINCT h.aluno.id) FROM HistoricoLeitura h WHERE h.dataAcesso >= :dataCorte")
    Long countAlunosAtivos(@Param("dataCorte") java.time.LocalDateTime dataCorte);

    // 3. Engajamento por Categoria (quantos históricos de leitura existem por categoria de livro)
    @Query("SELECT new br.com.biblioteca.publica.dto.response.CategoriaEngajamentoResponse(l.categoria, COUNT(h)) " +
            "FROM HistoricoLeitura h JOIN h.livro l GROUP BY l.categoria")
    List<CategoriaEngajamentoResponse> countEngajamentoPorCategoria();
}