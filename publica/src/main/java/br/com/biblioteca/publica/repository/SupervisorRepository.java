package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.entity.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SupervisorRepository extends JpaRepository<Supervisor, Long> {
    List<Supervisor> findByEscolaId(Long escolaId);
    boolean existsByEmail(String email);
}
