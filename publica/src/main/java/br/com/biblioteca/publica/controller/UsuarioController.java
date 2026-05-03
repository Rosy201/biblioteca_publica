package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.response.UsuarioResumoResponse;
import br.com.biblioteca.publica.enums.PerfilEnum;
import br.com.biblioteca.publica.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * GET /api/usuarios          → todos os usuários
     * GET /api/usuarios?perfil=ALUNO      → só alunos
     * GET /api/usuarios?perfil=SUPERVISOR → só supervisores
     * GET /api/usuarios?perfil=ADMINISTRADOR → só admins
     */
    @GetMapping
    public ResponseEntity<List<UsuarioResumoResponse>> listar(
            @RequestParam(required = false) PerfilEnum perfil) {
        if (perfil != null) {
            return ResponseEntity.ok(usuarioService.listarPorPerfil(perfil));
        }
        return ResponseEntity.ok(usuarioService.listarTodos());
    }
}
