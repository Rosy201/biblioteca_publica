package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.request.AlunoRequest;
import br.com.biblioteca.publica.dto.response.AlunoResponse;
import br.com.biblioteca.publica.service.AlunoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<AlunoResponse>> listar() {
        return ResponseEntity.ok(alunoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoResponse> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(alunoService.buscarPorId(id));
    }

    @GetMapping("/escola/{escolaId}")
    public ResponseEntity<List<AlunoResponse>> buscarPorEscola(@PathVariable Long escolaId) {
        return ResponseEntity.ok(alunoService.buscarPorEscola(escolaId));
    }

    @PostMapping
    public ResponseEntity<AlunoResponse> criar(@RequestBody AlunoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoService.criar(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        alunoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
