package br.com.biblioteca.publica.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "historicos_leitura")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoricoLeitura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "progresso_pagina", nullable = false)
    @Builder.Default
    private Integer progressoPagina = 0;

    @UpdateTimestamp // <-- O Hibernate gerencia automaticamente a cada inserção/atualização
    @Column(name = "data_acesso", nullable = false)
    private LocalDateTime dataAcesso;

    @Column(nullable = false)
    @Builder.Default
    private Boolean concluido = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livro_id", nullable = false)
    private Livro livro;

    @OneToOne(mappedBy = "historico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private MarcadorPagina marcador;

    // Regra de negócio encapsulada na entidade (Rich Domain Model)
    public void atualizarProgresso(int pagina) {
        this.progressoPagina = pagina;
        // Não precisa mais setar o LocalDateTime.now() manualmente aqui, o @UpdateTimestamp resolve!
    }
}