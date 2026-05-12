package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.entity.Usuario;
import br.com.biblioteca.publica.enums.PerfilEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByLogin(String login);
    boolean existsByEmail(String email);
    List<Usuario> findByPerfil(PerfilEnum perfil);
}
