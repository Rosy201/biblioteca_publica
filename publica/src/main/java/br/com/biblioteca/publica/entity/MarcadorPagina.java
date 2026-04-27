package br.com.biblioteca.publica.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "marcadores_pagina")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarcadorPagina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int posicao;

    @Column(name = "data_criacao")
    @Builder.Default
    private LocalDate dataCriacao = LocalDate.now();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "historico_id", nullable = false, unique = true)
    private HistoricoLeitura historico;
}
