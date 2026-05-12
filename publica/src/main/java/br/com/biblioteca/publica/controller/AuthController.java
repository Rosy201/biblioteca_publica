package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.response.UsuarioResumoResponse;
import br.com.biblioteca.publica.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");

        if (email == null || senha == null) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Email e senha são obrigatórios."));
        }

        return usuarioRepository.findByEmail(email)
                .filter(u -> u.getSenha().equals(senha))
                .map(u -> ResponseEntity.ok((Object) UsuarioResumoResponse.from(u)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("erro", "E-mail ou senha inválidos.")));
    }
}