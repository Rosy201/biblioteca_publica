package br.com.biblioteca.publica.entity;

import br.com.biblioteca.publica.enums.CategoriaEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "livro")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String autor;
    private String urlConteudo;

    @Enumerated(EnumType.STRING)
    private CategoriaEnum categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "escola_id", nullable = false)
    private Escola escola;
}
