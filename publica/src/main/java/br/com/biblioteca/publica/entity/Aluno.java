package br.com.biblioteca.publica.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "alunos")
@PrimaryKeyJoinColumn(name = "usuario_id")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Aluno extends Usuario {

    @Column(unique = true, nullable = false, length = 50)
    private String matricula;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "escola_id")
    private Escola escola;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<HistoricoLeitura> historicos = new ArrayList<>();

    public void salvarProgresso(HistoricoLeitura historico, int pagina) {
        historico.atualizarProgresso(pagina);
    }
}
