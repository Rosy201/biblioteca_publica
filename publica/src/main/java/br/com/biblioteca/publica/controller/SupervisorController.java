package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.request.SupervisorRequest;
import br.com.biblioteca.publica.dto.request.SupervisorUpdateRequest;
import br.com.biblioteca.publica.dto.response.SupervisorResponse;
import br.com.biblioteca.publica.service.SupervisorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supervisores")
@RequiredArgsConstructor
public class SupervisorController {

    private final SupervisorService supervisorService;

    @GetMapping
    public ResponseEntity<List<SupervisorResponse>> listar() {
        return ResponseEntity.ok(supervisorService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupervisorResponse> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(supervisorService.buscarPorId(id));
    }

    @GetMapping("/escola/{escolaId}")
    public ResponseEntity<List<SupervisorResponse>> buscarPorEscola(@PathVariable Long escolaId) {
        return ResponseEntity.ok(supervisorService.buscarPorEscola(escolaId));
    }

    @PostMapping
    public ResponseEntity<SupervisorResponse> criar(@RequestBody SupervisorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(supervisorService.criar(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupervisorResponse> atualizar(
            @PathVariable Long id,
            @RequestBody SupervisorUpdateRequest request) {
        return ResponseEntity.ok(supervisorService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        supervisorService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
