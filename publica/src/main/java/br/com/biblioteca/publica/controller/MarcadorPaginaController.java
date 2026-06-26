package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.request.MarcadorRequest;
import br.com.biblioteca.publica.dto.response.MarcadorResponse;
import br.com.biblioteca.publica.service.MarcadorPaginaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/marcadores")
@RequiredArgsConstructor
public class MarcadorPaginaController {

    private final MarcadorPaginaService marcadorService;

    @PostMapping
    public ResponseEntity<MarcadorResponse> salvarMarcador(@RequestBody @Valid MarcadorRequest request) {
        return ResponseEntity.ok(marcadorService.salvarOuAtualizarMarcador(request));
    }

    @GetMapping("/historico/{historicoId}")
    public ResponseEntity<MarcadorResponse> buscarPorHistorico(@PathVariable Long historicoId) {
        return ResponseEntity.ok(marcadorService.buscarPorHistorico(historicoId));
    }
}