package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.request.EscolaRequest;
import br.com.biblioteca.publica.dto.response.EscolaResponse;
import br.com.biblioteca.publica.service.EscolaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escolas")
@RequiredArgsConstructor
public class EscolaController {

    private final EscolaService escolaService;

    @GetMapping
    public ResponseEntity<List<EscolaResponse>> listar() {
        return ResponseEntity.ok(escolaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EscolaResponse> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(escolaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<EscolaResponse> criar(@RequestBody EscolaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(escolaService.criar(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EscolaResponse> atualizar(@PathVariable Long id, @RequestBody EscolaRequest request) {
        return ResponseEntity.ok(escolaService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        escolaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
