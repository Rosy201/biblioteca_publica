package br.com.biblioteca.publica.entity;

import br.com.biblioteca.publica.enums.CategoriaEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "livros")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    private String autor;

    @Column(name = "url_conteudo", length = 500)
    private String urlConteudo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoriaEnum categoria;
}
