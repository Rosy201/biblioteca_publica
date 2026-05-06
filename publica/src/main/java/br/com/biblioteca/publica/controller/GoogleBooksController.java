package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.entity.Api.GoogleBooks.GoogleBooksResponse;
import br.com.biblioteca.publica.service.GoogleBooksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/google-books")
public class GoogleBooksController {

    private final GoogleBooksService googleBooksService;

    public GoogleBooksController(GoogleBooksService googleBooksService) {
        this.googleBooksService = googleBooksService;
    }

    @GetMapping("/buscar")
    public ResponseEntity<GoogleBooksResponse> buscarLivro(@RequestParam String titulo) {
        GoogleBooksResponse response = googleBooksService.buscarLivroNoGoogle(titulo);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/titulo")
    public ResponseEntity<GoogleBooksResponse> porTitulo(@RequestParam String nome) {
        return ResponseEntity.ok(googleBooksService.buscarPorTitulo(nome));
    }

    @GetMapping("/autor")
    public ResponseEntity<GoogleBooksResponse> porAutor(@RequestParam String nome) {
        return ResponseEntity.ok(googleBooksService.buscarPorAutor(nome));
    }

}
