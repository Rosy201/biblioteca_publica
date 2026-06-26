package br.com.biblioteca.publica.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
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
    private Integer posicao;

    @CreationTimestamp // Deixa o ciclo de vida do JPA cuidar da data
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDate dataCriacao;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "historico_id", nullable = false, unique = true)
    private HistoricoLeitura historico;
}