package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.entity.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    boolean existsByEmail(String email);
}
