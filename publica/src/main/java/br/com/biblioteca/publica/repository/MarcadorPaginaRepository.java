package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.entity.MarcadorPagina;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MarcadorPaginaRepository extends JpaRepository<MarcadorPagina, Long> {
    Optional<MarcadorPagina> findByHistoricoId(Long historicoId);
}