package br.com.biblioteca.publica.entity;

import br.com.biblioteca.publica.enums.PerfilEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "usuarios")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PerfilEnum perfil;

    public boolean login(String email, String senha) {
        return this.email.equals(email) && this.senha.equals(senha);
    }

    public void recuperarSenha(String novaSenha) {
        this.senha = novaSenha;
    }
}
