package br.com.biblioteca.publica.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "escolas")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Escola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String localizacao;

    @Column(name = "codigo_inep", unique = true, nullable = false)
    private String codigoINEP;

    @OneToMany(mappedBy = "escola", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Aluno> alunos = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "escola_livros",
        joinColumns = @JoinColumn(name = "escola_id"),
        inverseJoinColumns = @JoinColumn(name = "livro_id")
    )
    @Builder.Default
    private List<Livro> livros = new ArrayList<>();
}
