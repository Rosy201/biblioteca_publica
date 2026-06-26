package br.com.biblioteca.publica.repository;

import br.com.biblioteca.publica.entity.Livro;
import br.com.biblioteca.publica.enums.CategoriaEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByCategoria(CategoriaEnum categoria);
    List<Livro> findByAutorContainingIgnoreCase(String autor);
    List<Livro> findByTituloContainingIgnoreCase(String titulo);
    Optional<Livro> findByTituloIgnoreCase(String titulo);
}
