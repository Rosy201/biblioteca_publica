package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    Optional<Aluno> findByMatricula(String matricula);
    List<Aluno> findByEscolaId(Long escolaId);
    boolean existsByMatricula(String matricula);
}
