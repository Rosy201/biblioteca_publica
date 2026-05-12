package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.response.UsuarioResumoResponse;
import br.com.biblioteca.publica.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String login = body.get("login");
        String senha = body.get("senha");

        return usuarioRepository.findByLogin(login)
                .filter(u -> u.getSenha().equals(senha))
                // AQUI ESTAVA O ERRO: Use o método .from(u) que já mapeia todos os campos
                .map(u -> ResponseEntity.ok(UsuarioResumoResponse.from(u)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}