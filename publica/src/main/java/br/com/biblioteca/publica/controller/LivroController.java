package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.request.LivroRequest;
import br.com.biblioteca.publica.dto.response.LivroResponse;
import br.com.biblioteca.publica.enums.CategoriaEnum;
import br.com.biblioteca.publica.service.LivroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@RequiredArgsConstructor
public class LivroController {

    private final LivroService livroService;

    @GetMapping
    public ResponseEntity<List<LivroResponse>> listar() {
        return ResponseEntity.ok(livroService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroResponse> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(livroService.buscarPorId(id));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<LivroResponse>> buscarPorCategoria(@PathVariable CategoriaEnum categoria) {
        return ResponseEntity.ok(livroService.buscarPorCategoria(categoria));
    }

    @PostMapping
    public ResponseEntity<LivroResponse> criar(@RequestBody LivroRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(livroService.criar(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LivroResponse> atualizar(@PathVariable Long id, @RequestBody LivroRequest request) {
        return ResponseEntity.ok(livroService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        livroService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/importar")
    public ResponseEntity<LivroResponse> importar(@RequestParam String titulo) {
        return ResponseEntity.ok(livroService.importarLivroPeloTitulo(titulo));
    }
}
