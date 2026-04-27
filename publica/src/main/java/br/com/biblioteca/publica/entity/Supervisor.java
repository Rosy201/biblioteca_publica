package br.com.biblioteca.publica.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "supervisores")
@PrimaryKeyJoinColumn(name = "usuario_id")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Supervisor extends Usuario {

    @Column(length = 100)
    private String cargo;

    @Column(length = 100)
    private String departamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "escola_id")
    private Escola escola;
}
