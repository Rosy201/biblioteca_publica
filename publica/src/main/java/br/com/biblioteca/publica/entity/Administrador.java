package br.com.biblioteca.publica.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "administradores")
@PrimaryKeyJoinColumn(name = "usuario_id")
@Getter @Setter
@NoArgsConstructor
@SuperBuilder
public class Administrador extends Usuario {

}
