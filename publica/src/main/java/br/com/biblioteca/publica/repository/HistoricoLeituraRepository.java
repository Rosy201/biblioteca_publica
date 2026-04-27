package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.entity.HistoricoLeitura;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoricoLeituraRepository extends JpaRepository<HistoricoLeitura, Long> {
    List<HistoricoLeitura> findByAlunoId(Long alunoId);
    List<HistoricoLeitura> findByAlunoIdAndConcluidoTrue(Long alunoId);
    boolean existsByAlunoIdAndLivroId(Long alunoId, Long livroId);
}
