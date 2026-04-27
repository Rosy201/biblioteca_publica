package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.entity.Escola;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EscolaRepository extends JpaRepository<Escola, Long> {
    Optional<Escola> findByCodigoINEP(String codigoINEP);
    boolean existsByCodigoINEP(String codigoINEP);
}
