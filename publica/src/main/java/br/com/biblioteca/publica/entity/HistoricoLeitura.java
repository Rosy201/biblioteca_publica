package br.com.biblioteca.publica.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "historicos_leitura")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoricoLeitura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "progresso_pagina")
    @Builder.Default
    private int progressoPagina = 0;

    @Column(name = "data_acesso")
    @Builder.Default
    private LocalDateTime dataAcesso = LocalDateTime.now();

    @Builder.Default
    private boolean concluido = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livro_id", nullable = false)
    private Livro livro;

    @OneToOne(mappedBy = "historico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private MarcadorPagina marcador;

    public void atualizarProgresso(int pagina) {
        this.progressoPagina = pagina;
        this.dataAcesso = LocalDateTime.now();
    }
}
